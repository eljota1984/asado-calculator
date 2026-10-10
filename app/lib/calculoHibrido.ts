import type { ProductoAsado, TipoCarne } from "./datos";

/**
 * Motor híbrido v2 — Asado Inteligente
 *
 * Criterio principal:
 * - Los gramos por persona representan PESO CRUDO DE COMPRA (AP).
 * - No se infla la cantidad base por merma de cocción.
 * - `conHueso` es informativo: por sí solo NO modifica los kilos.
 * - `factorCompra` solo se aplica si existe una corrección explícita validada;
 *   por defecto vale 1.0.
 * - La distribución se hace primero por tipo de carne.
 * - Los productos vendidos por kg (incluidas bandejas de peso variable)
 *   se calculan directamente por gramos/kg.
 * - Packs usan `pesoFormatoKg` como peso fijo de cálculo.
 * - Unidades vendidas por kg pueden usar `pesoMinimo` / `pesoMaximo` como
 *   rango comercial real (por ejemplo, un pollo entero de 1,4 a 2,2 kg).
 * - Los formatos realmente fijos se redondean comercialmente y, cuando hay
 *   varios productos del mismo tipo, se optimizan en conjunto para reducir
 *   el sobrestock.
 *
 * La unidad del precio y el formato físico de compra son conceptos separados:
 * `unidadPrecio` define cómo se cobra; `formatoCompra`, cómo se compra.
 */

export const GRAMOS_POR_PERSONA = {
  alto: 550,
  normal: 420,
  bajo: 320,
  ninos: 220,
} as const;

export const PARTICIPACION_EMBUTIDOS_CON_CARNES = 0.2;

// Tolerancia comercial para formatos discretos (packs/unidades).
// Evita recomendar una unidad extra por diferencias irrelevantes de hasta 50 g.
export const TOLERANCIA_FORMATO_FIJO_KG = 0.05;

const TIPOS_PRINCIPALES: TipoCarne[] = ["vacuno", "cerdo", "pollo"];

export type GrupoAsado = {
  alto: number;
  normal: number;
  bajo: number;
  ninos: number;
};

export type ResultadoDemanda = {
  totalPersonas: number;
  totalAdultos: number;
  gramosTotales: number;
  kilosTotales: number;
};

export type ResultadoProductoHibrido = {
  id: string;
  nombre: string;
  tipo: TipoCarne;
  unidadPrecio: ProductoAsado["unidadPrecio"];
  formatoCompra: ProductoAsado["formatoCompra"];
  descripcionVenta?: string;
  unidadesPorPack?: number;

  participacionTipo: number;
  kilosIdeal: number;
  factorCompra: number;
  kilosObjetivoCompra: number;

  precioReferencia: number;
  precioKgEquivalente: number;
  costoTeorico: number;

  cantidadSugerida: number | null;
  kilosCompraAprox: number;
  costoSugerido: number;
  excesoCompraKg: number;
};

export type ResultadoCalculoHibrido = {
  items: ResultadoProductoHibrido[];
  kilosNecesarios: number;
  kilosCompraSugerida: number;
  costoTeoricoTotal: number;
  costoCompraTotal: number;
  excesoCompraTotalKg: number;
};

export function calcularDemandaBase(grupo: GrupoAsado): ResultadoDemanda {
  const totalPersonas = grupo.alto + grupo.normal + grupo.bajo + grupo.ninos;
  const totalAdultos = grupo.alto + grupo.normal + grupo.bajo;

  const gramosTotales =
    grupo.alto * GRAMOS_POR_PERSONA.alto +
    grupo.normal * GRAMOS_POR_PERSONA.normal +
    grupo.bajo * GRAMOS_POR_PERSONA.bajo +
    grupo.ninos * GRAMOS_POR_PERSONA.ninos;

  return {
    totalPersonas,
    totalAdultos,
    gramosTotales,
    kilosTotales: gramosTotales / 1000,
  };
}

function agruparPorTipo(productos: ProductoAsado[]) {
  const grupos = new Map<TipoCarne, ProductoAsado[]>();

  for (const producto of productos) {
    const existentes = grupos.get(producto.tipo) ?? [];
    existentes.push(producto);
    grupos.set(producto.tipo, existentes);
  }

  return grupos;
}

function calcularParticipaciones(productos: ProductoAsado[]) {
  const grupos = agruparPorTipo(productos);
  const participaciones = new Map<TipoCarne, number>();

  const tiposPrincipalesActivos = TIPOS_PRINCIPALES.filter(
    (tipo) => (grupos.get(tipo)?.length ?? 0) > 0,
  );

  const tieneEmbutidos = (grupos.get("embutidos")?.length ?? 0) > 0;

  if (tiposPrincipalesActivos.length === 0 && tieneEmbutidos) {
    participaciones.set("embutidos", 1);
    return participaciones;
  }

  if (tiposPrincipalesActivos.length === 0) {
    return participaciones;
  }

  const participacionEmbutidos = tieneEmbutidos
    ? PARTICIPACION_EMBUTIDOS_CON_CARNES
    : 0;

  const participacionCarnes = 1 - participacionEmbutidos;
  const participacionPorTipoPrincipal =
    participacionCarnes / tiposPrincipalesActivos.length;

  for (const tipo of tiposPrincipalesActivos) {
    participaciones.set(tipo, participacionPorTipoPrincipal);
  }

  if (tieneEmbutidos) {
    participaciones.set("embutidos", participacionEmbutidos);
  }

  return participaciones;
}

function esUnidadDePesoVariable(producto: ProductoAsado) {
  return (
    producto.formatoCompra === "unidad" &&
    producto.unidadPrecio === "kg" &&
    typeof producto.pesoMinimo === "number" &&
    typeof producto.pesoMaximo === "number" &&
    producto.pesoMinimo > 0 &&
    producto.pesoMaximo >= producto.pesoMinimo
  );
}

function esFormatoFijo(producto: ProductoAsado) {
  if (producto.formatoCompra === "pack") return true;

  if (producto.formatoCompra === "unidad") {
    return !esUnidadDePesoVariable(producto);
  }

  return false;
}

function obtenerFactorCompra(producto: ProductoAsado): number {
  const factor = producto.factorCompra ?? 1;

  if (!Number.isFinite(factor) || factor <= 0) {
    throw new Error(
      `El producto ${producto.id} tiene un factorCompra inválido: ${factor}.`,
    );
  }

  return factor;
}

function obtenerPesoFormatoFijo(producto: ProductoAsado): number {
  const peso = producto.pesoFormatoKg ?? 0;

  if (peso <= 0) {
    throw new Error(
      `El producto ${producto.id} requiere un pesoFormatoKg mayor que 0.`,
    );
  }

  return peso;
}

function precioPorKgEquivalente(producto: ProductoAsado): number {
  if (producto.unidadPrecio === "kg") {
    return producto.precio;
  }

  const pesoFormato = obtenerPesoFormatoFijo(producto);
  return producto.precio / pesoFormato;
}

function costoPorKilos(producto: ProductoAsado, kilos: number): number {
  return kilos * precioPorKgEquivalente(producto);
}

function costoFormatoFijo(producto: ProductoAsado, cantidad: number): number {
  const pesoFormato = obtenerPesoFormatoFijo(producto);

  if (producto.unidadPrecio === "kg") {
    return cantidad * pesoFormato * producto.precio;
  }

  return cantidad * producto.precio;
}

/**
 * Calcula una compra por unidades cuyo peso real puede variar dentro de un
 * rango conocido. Ejemplo: pollo entero vendido por kg, con unidades entre
 * 1,4 y 2,2 kg.
 *
 * Se busca la menor cantidad de unidades que cubra el objetivo dentro de la
 * tolerancia comercial. El peso estimado se ajusta al rango posible de esa
 * cantidad de unidades, en vez de multiplicar siempre por un peso promedio.
 */
function calcularUnidadDePesoVariable(
  producto: ProductoAsado,
  kilosObjetivoCompra: number,
) {
  const pesoMinimo = producto.pesoMinimo ?? 0;
  const pesoMaximo = producto.pesoMaximo ?? 0;

  if (pesoMinimo <= 0 || pesoMaximo < pesoMinimo) {
    throw new Error(
      `El producto ${producto.id} requiere un rango de peso válido para compra por unidad.`,
    );
  }

  const objetivoConTolerancia = Math.max(
    0,
    kilosObjetivoCompra - TOLERANCIA_FORMATO_FIJO_KG,
  );

  const cantidadSugerida = Math.max(
    1,
    Math.ceil(objetivoConTolerancia / pesoMaximo),
  );

  const minimoTotal = cantidadSugerida * pesoMinimo;
  const maximoTotal = cantidadSugerida * pesoMaximo;

  // Si el objetivo cae dentro del rango posible, estimamos comprar exactamente
  // ese peso. Si queda fuera, usamos el extremo comercial alcanzable.
  const kilosCompraAprox = Math.min(
    maximoTotal,
    Math.max(minimoTotal, kilosObjetivoCompra),
  );

  return {
    cantidadSugerida,
    kilosCompraAprox,
  };
}

type OpcionFija = {
  producto: ProductoAsado;
  kilosObjetivoCompra: number;
  pesoFormato: number;
};

/**
 * Optimiza conjuntamente packs/unidades del mismo tipo.
 * Prioridad:
 * 1) cubrir la cantidad objetivo dentro de una tolerancia comercial de 50 g;
 * 2) minimizar la diferencia absoluta respecto del objetivo;
 * 3) mantener una mezcla razonablemente cercana al reparto ideal;
 * 4) usar menor costo como desempate.
 */
function optimizarFormatosFijos(opciones: OpcionFija[]) {
  const resultado = new Map<string, number>();

  if (opciones.length === 0) return resultado;

  const objetivoTotal = opciones.reduce(
    (acc, item) => acc + item.kilosObjetivoCompra,
    0,
  );
  const pesoMaximo = Math.max(...opciones.map((item) => item.pesoFormato));

  let mejorConteo: number[] | null = null;
  let mejorScore = Number.POSITIVE_INFINITY;

  const limites = opciones.map((item) => {
    const minimo = item.kilosObjetivoCompra > 0 ? 1 : 0;
    const maximoNecesario = Math.ceil(
      (objetivoTotal + pesoMaximo) / Math.max(item.pesoFormato, 0.001),
    );

    return {
      min: minimo,
      max: Math.max(minimo, Math.min(12, maximoNecesario + 1)),
    };
  });

  const conteos = new Array(opciones.length).fill(0);

  function evaluar() {
    let kilos = 0;
    let desbalance = 0;
    let costo = 0;

    for (let i = 0; i < opciones.length; i += 1) {
      const opcion = opciones[i];
      const cantidad = conteos[i];
      const kilosProducto = cantidad * opcion.pesoFormato;

      kilos += kilosProducto;
      desbalance += Math.abs(kilosProducto - opcion.kilosObjetivoCompra);
      costo += costoFormatoFijo(opcion.producto, cantidad);
    }

    // Para packs/unidades aceptamos quedar hasta 50 g bajo el objetivo total.
    // Esto evita, por ejemplo, recomendar 2 packs de 750 g cuando el objetivo
    // es 756 g: 1 pack queda solo 6 g por debajo y es comercialmente suficiente.
    if (kilos + TOLERANCIA_FORMATO_FIJO_KG + 1e-9 < objetivoTotal) return;

    const desviacionObjetivo = Math.abs(kilos - objetivoTotal);

    // La cercanía al objetivo manda por amplio margen; después balance y costo.
    const score =
      desviacionObjetivo * 1_000_000 + desbalance * 1_000 + costo / 100_000;

    if (score < mejorScore) {
      mejorScore = score;
      mejorConteo = [...conteos];
    }
  }

  function recorrer(indice: number) {
    if (indice === opciones.length) {
      evaluar();
      return;
    }

    const { min, max } = limites[indice];

    for (let cantidad = min; cantidad <= max; cantidad += 1) {
      conteos[indice] = cantidad;
      recorrer(indice + 1);
    }
  }

  recorrer(0);

  const conteoFinal = mejorConteo ?? opciones.map(() => 1);

  opciones.forEach((opcion, indice) => {
    resultado.set(opcion.producto.id, conteoFinal[indice]);
  });

  return resultado;
}

export function calcularCompraHibrida({
  productosSeleccionados,
  kilosNecesarios,
}: {
  productosSeleccionados: ProductoAsado[];
  kilosNecesarios: number;
}): ResultadoCalculoHibrido {
  if (productosSeleccionados.length === 0 || kilosNecesarios <= 0) {
    return {
      items: [],
      kilosNecesarios,
      kilosCompraSugerida: 0,
      costoTeoricoTotal: 0,
      costoCompraTotal: 0,
      excesoCompraTotalKg: 0,
    };
  }

  const grupos = agruparPorTipo(productosSeleccionados);
  const participaciones = calcularParticipaciones(productosSeleccionados);
  const conteosFijos = new Map<string, number>();

  // Optimizamos formatos fijos por tipo de carne.
  for (const [tipo, productosDelTipo] of grupos.entries()) {
    const participacionTipo = participaciones.get(tipo) ?? 0;
    const kilosDelTipo = kilosNecesarios * participacionTipo;
    const kilosIdealProducto =
      productosDelTipo.length > 0 ? kilosDelTipo / productosDelTipo.length : 0;

    const fijos: OpcionFija[] = productosDelTipo
      .filter(esFormatoFijo)
      .map((producto) => ({
        producto,
        kilosObjetivoCompra:
          kilosIdealProducto * obtenerFactorCompra(producto),
        pesoFormato: obtenerPesoFormatoFijo(producto),
      }));

    const optimizados = optimizarFormatosFijos(fijos);
    optimizados.forEach((cantidad, idProducto) => {
      conteosFijos.set(idProducto, cantidad);
    });
  }

  const items = productosSeleccionados.map((producto) => {
    const productosDelTipo = grupos.get(producto.tipo) ?? [];
    const participacionTipo = participaciones.get(producto.tipo) ?? 0;

    const kilosDelTipo = kilosNecesarios * participacionTipo;
    const kilosIdeal =
      productosDelTipo.length > 0 ? kilosDelTipo / productosDelTipo.length : 0;

    // La base ya representa peso crudo de compra. `factorCompra` queda en 1.0
    // salvo que exista una corrección comercial explícitamente validada.
    const factorCompra = obtenerFactorCompra(producto);
    const kilosObjetivoCompra = kilosIdeal * factorCompra;
    const precioKgEquivalente = precioPorKgEquivalente(producto);
    const costoTeorico = kilosObjetivoCompra * precioKgEquivalente;

    let cantidadSugerida: number | null = null;
    let kilosCompraAprox = kilosObjetivoCompra;
    let costoSugerido = costoPorKilos(producto, kilosObjetivoCompra);

    if (esUnidadDePesoVariable(producto)) {
      const compraUnidad = calcularUnidadDePesoVariable(
        producto,
        kilosObjetivoCompra,
      );

      cantidadSugerida = compraUnidad.cantidadSugerida;
      kilosCompraAprox = compraUnidad.kilosCompraAprox;
      costoSugerido = kilosCompraAprox * producto.precio;
    } else if (esFormatoFijo(producto)) {
      const pesoFormato = obtenerPesoFormatoFijo(producto);
      cantidadSugerida = conteosFijos.get(producto.id) ?? 1;
      kilosCompraAprox = cantidadSugerida * pesoFormato;
      costoSugerido = costoFormatoFijo(producto, cantidadSugerida);
    }

    // Bandeja se trata como peso variable cuando su precio está expresado $/kg.
    if (producto.formatoCompra === "bandeja") {
      cantidadSugerida = null;
      kilosCompraAprox = kilosObjetivoCompra;
      costoSugerido = costoPorKilos(producto, kilosCompraAprox);
    }

    return {
      id: producto.id,
      nombre: producto.nombre,
      tipo: producto.tipo,
      unidadPrecio: producto.unidadPrecio,
      formatoCompra: producto.formatoCompra,
      descripcionVenta: producto.descripcionVenta,
      unidadesPorPack: producto.unidadesPorPack,
      participacionTipo,
      kilosIdeal,
      factorCompra,
      kilosObjetivoCompra,
      precioReferencia: producto.precio,
      precioKgEquivalente,
      costoTeorico,
      cantidadSugerida,
      kilosCompraAprox,
      costoSugerido,
      excesoCompraKg: Math.max(0, kilosCompraAprox - kilosObjetivoCompra),
    } satisfies ResultadoProductoHibrido;
  });

  return {
    items,
    kilosNecesarios,
    kilosCompraSugerida: items.reduce(
      (total, item) => total + item.kilosCompraAprox,
      0,
    ),
    costoTeoricoTotal: items.reduce(
      (total, item) => total + item.costoTeorico,
      0,
    ),
    costoCompraTotal: items.reduce(
      (total, item) => total + item.costoSugerido,
      0,
    ),
    excesoCompraTotalKg: items.reduce(
      (total, item) => total + item.excesoCompraKg,
      0,
    ),
  };
}
