"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  buscarProductoPorReferencia,
  type ProductoAsado,
} from "../lib/datos";
import {
  calcularCompraHibrida,
  calcularDemandaBase,
  PARTICIPACION_EMBUTIDOS_CON_CARNES,
} from "../lib/calculoHibrido";
import type { AdultosState, CortesSeleccionadosState } from "../lib/types";

function formatoPrecio(valor: number) {
  return `$${Math.round(valor).toLocaleString("es-CL")}`;
}

function descripcionFormato(
  formatoCompra: ProductoAsado["formatoCompra"],
  cantidad: number | null,
) {
  if (cantidad === null) return null;

  if (formatoCompra === "pack") return `${cantidad} ${cantidad === 1 ? "pack" : "packs"}`;
  if (formatoCompra === "unidad") return `${cantidad} ${cantidad === 1 ? "unidad" : "unidades"}`;
  if (formatoCompra === "bandeja") return `${cantidad} ${cantidad === 1 ? "bandeja" : "bandejas"}`;

  return `${cantidad} ${cantidad === 1 ? "pieza" : "piezas"}`;
}

export default function ResumenPage() {
  const router = useRouter();

  const [adultos, setAdultos] = useState<AdultosState>({
    alto: 0,
    normal: 0,
    bajo: 0,
    ninos: 0,
  });

  const [cortesSeleccionados, setCortesSeleccionados] =
    useState<CortesSeleccionadosState>({
      vacuno: [],
      cerdo: [],
      pollo: [],
      embutidos: [],
    });

  const [mostrarDisclaimer, setMostrarDisclaimer] = useState(true);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const adultosGuardados = localStorage.getItem("adultos");
    const cortesGuardados = localStorage.getItem("cortesSeleccionados");

    if (adultosGuardados) {
      setAdultos(JSON.parse(adultosGuardados));
    }

    if (cortesGuardados) {
      setCortesSeleccionados(JSON.parse(cortesGuardados));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarDisclaimer(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const demanda = useMemo(() => calcularDemandaBase(adultos), [adultos]);

  const seleccionados = useMemo(() => {
    const referencias = [
      ...cortesSeleccionados.vacuno,
      ...cortesSeleccionados.cerdo,
      ...cortesSeleccionados.pollo,
      ...cortesSeleccionados.embutidos,
    ];

    const vistos = new Set<string>();
    const productos: ProductoAsado[] = [];

    for (const referencia of referencias) {
      const producto = buscarProductoPorReferencia(referencia);

      if (!producto || vistos.has(producto.id)) continue;

      vistos.add(producto.id);
      productos.push(producto);
    }

    return productos;
  }, [cortesSeleccionados]);

  const resultado = useMemo(
    () =>
      calcularCompraHibrida({
        productosSeleccionados: seleccionados,
        kilosNecesarios: demanda.kilosTotales,
      }),
    [demanda.kilosTotales, seleccionados],
  );

  const cantidadSeleccionados = seleccionados.length;
  const costoPorAdulto =
    demanda.totalAdultos > 0
      ? resultado.costoCompraTotal / demanda.totalAdultos
      : 0;

  const resumenPorTipo = [
    { nombre: "Vacuno", cantidad: cortesSeleccionados.vacuno.length },
    { nombre: "Cerdo", cantidad: cortesSeleccionados.cerdo.length },
    { nombre: "Pollo", cantidad: cortesSeleccionados.pollo.length },
    { nombre: "Embutidos", cantidad: cortesSeleccionados.embutidos.length },
  ];

  const reiniciarCalculo = () => {
    localStorage.removeItem("adultos");
    localStorage.removeItem("cortesSeleccionados");
    router.push("/calculadora");
  };

  const volverAEditar = () => {
    router.push("/calculadora");
  };

  const textoCompartir = useMemo(() => {
    const lineasCompra = resultado.items.map((item) => {
      const formato = descripcionFormato(item.formatoCompra, item.cantidadSugerida);

      const compra = formato
        ? `${formato} · ${item.kilosCompraAprox.toFixed(2)} kg aprox.`
        : `${item.kilosCompraAprox.toFixed(2)} kg aprox.`;

      return `• ${item.nombre}: ${compra} · ${formatoPrecio(item.costoSugerido)}`;
    });

    return [
      "🔥 Mi asado — Asado Inteligente",
      "",
      `👥 Personas: ${demanda.totalPersonas} (${demanda.totalAdultos} adultos + ${adultos.ninos} niños)`,
      `🥩 Carne base calculada: ${demanda.kilosTotales.toFixed(2)} kg`,
      `🛒 Compra sugerida: ${resultado.kilosCompraSugerida.toFixed(2)} kg`,
      `💰 Valor estimado de compra: ${formatoPrecio(resultado.costoCompraTotal)}`,
      demanda.totalAdultos > 0
        ? `💵 Costo por adulto: ${formatoPrecio(costoPorAdulto)}`
        : "💵 Costo por adulto: no aplica",
      "",
      "Compra sugerida:",
      ...(lineasCompra.length > 0
        ? lineasCompra
        : ["• No hay productos seleccionados."]),
      "",
      "🔥 Calcula tu próximo asado en:",
      "https://calculadoradeasados.cl/calculadora",
      "",
      "* Cantidades y costos aproximados.",
    ].join("\n");
  }, [adultos.ninos, costoPorAdulto, demanda, resultado]);

  const copiarResultados = async () => {
    try {
      await navigator.clipboard.writeText(textoCompartir);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textoCompartir;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 2200);
  };

  const compartirWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(textoCompartir)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const compartirCorreo = () => {
    const asunto = "Resumen de mi asado — Asado Inteligente";
    const url = `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(textoCompartir)}`;
    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_35%),linear-gradient(to_bottom,rgba(24,24,27,0.25),transparent)]" />

      {mostrarDisclaimer && (
        <div className="fixed inset-x-4 top-4 z-50 mx-auto max-w-full rounded-3xl border border-red-500/40 bg-zinc-950/95 p-5 shadow-2xl shadow-red-950/40 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-black text-red-400">
                Cómo se calcula tu compra
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Primero calculamos los gramos de carne cruda que necesita comprar
                el grupo. Luego distribuimos esa cantidad por tipo de carne y, al
                final, respetamos el formato comercial de cada producto.
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Cuando combinas carnes principales con embutidos, estos representan
                inicialmente un {Math.round(PARTICIPACION_EMBUTIDOS_CON_CARNES * 100)}%
                del total. Las carnes y bandejas con precio por kilo se calculan por
                peso; packs y unidades se redondean de forma conjunta para reducir
                compras innecesarias.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMostrarDisclaimer(false)}
              className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-bold text-zinc-300 ring-1 ring-zinc-700 hover:bg-zinc-800"
              aria-label="Cerrar aviso"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-red-950/20 md:p-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Resumen del Asado
            </h1>

            <img
              src="/logo_final.png"
              alt="Calculadora de Asados"
              className="h-40 w-auto md:h-56"
            />

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Revisa la cantidad base de carne, la compra comercial sugerida y el
              costo aproximado de tu asado.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl shadow-red-950/10 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                Resultados
              </p>
              <h2 className="text-2xl font-black text-white">
                Cálculo híbrido
              </h2>
            </div>

            <div className="hidden rounded-2xl bg-red-600/10 px-4 py-2 text-sm font-semibold text-red-300 ring-1 ring-red-500/30 md:block">
              Necesidad → compra → costo
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <p className="text-sm text-zinc-400">Personas</p>
              <p className="mt-2 text-3xl font-black">{demanda.totalPersonas}</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <p className="text-sm text-zinc-400">Carne base</p>
              <p className="mt-2 text-3xl font-black">
                {demanda.kilosTotales.toFixed(2)} kg
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <p className="text-sm text-zinc-400">Productos elegidos</p>
              <p className="mt-2 text-3xl font-black">{cantidadSeleccionados}</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <p className="text-sm text-zinc-400">Costo teórico</p>
              <p className="mt-2 text-3xl font-black">
                {formatoPrecio(resultado.costoTeoricoTotal)}
              </p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Sin redondear packs, bandejas o unidades.
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
              <p className="text-sm text-red-200">Compra sugerida</p>
              <p className="mt-2 text-3xl font-black text-red-300">
                {resultado.kilosCompraSugerida.toFixed(2)} kg
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
              <p className="text-sm text-red-200">Valor de compra</p>
              <p className="mt-2 text-3xl font-black text-red-300">
                {formatoPrecio(resultado.costoCompraTotal)}
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
              <p className="text-sm text-red-200">Adultos que pagan</p>
              <p className="mt-2 text-3xl font-black text-red-300">
                {demanda.totalAdultos}
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
              <p className="text-sm text-red-200">Costo por adulto</p>
              <p className="mt-2 text-3xl font-black text-red-300">
                {demanda.totalAdultos > 0 ? formatoPrecio(costoPorAdulto) : "—"}
              </p>
            </div>
          </div>

          {resultado.excesoCompraTotalKg > 0.01 && (
            <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm leading-6 text-yellow-100/80">
              La compra comercial agrega aproximadamente{" "}
              <strong>{resultado.excesoCompraTotalKg.toFixed(2)} kg</strong> sobre
              la cantidad ajustada, principalmente por el redondeo de packs,
              bandejas o unidades completas.
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
            <p className="mb-3 font-bold text-white">Selección actual</p>

            <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-4">
              {resumenPorTipo.map((item) => (
                <div
                  key={item.nombre}
                  className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800"
                >
                  <p className="text-zinc-500">{item.nombre}</p>
                  <p className="mt-1 text-xl font-black text-white">
                    {item.cantidad}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
            <div className="mb-4">
              <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                Sugerencia de compra
              </p>
              <h3 className="text-xl font-black text-white">
                Qué comprar realmente
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                La cantidad base ya representa peso crudo de compra. Solo se
                redondea cuando el producto se vende en packs o unidades completas.
              </p>
            </div>

            {resultado.items.length === 0 ? (
              <p className="text-sm text-zinc-400">
                No hay productos seleccionados.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {resultado.items.map((item) => {
                  const formato = descripcionFormato(
                    item.formatoCompra,
                    item.cantidadSugerida,
                  );

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-bold text-white">{item.nombre}</p>
                        <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-400 ring-1 ring-zinc-800">
                          {item.tipo}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-zinc-400">
                        <p>
                          Porción asignada: {item.kilosIdeal.toFixed(2)} kg
                        </p>
                        <p>
                          Objetivo de compra: {item.kilosObjetivoCompra.toFixed(2)} kg
                        </p>

                        {formato ? (
                          <p className="font-semibold text-zinc-300">
                            Formato de compra: {formato}
                          </p>
                        ) : (
                          <p className="font-semibold text-zinc-300">
                            {item.formatoCompra === "bandeja"
                              ? "Compra por peso · bandeja variable"
                              : "Compra por peso"}
                          </p>
                        )}

                        <p>
                          Compra aprox.: {item.kilosCompraAprox.toFixed(2)} kg
                        </p>

                        {item.formatoCompra === "pack" && (
                          <p>
                            Precio equivalente: {formatoPrecio(item.precioKgEquivalente)}/kg
                          </p>
                        )}

                        {item.unidadesPorPack && (
                          <p>Unidades por pack: {item.unidadesPorPack}</p>
                        )}

                        {item.descripcionVenta && (
                          <p className="text-zinc-500">{item.descripcionVenta}</p>
                        )}
                      </div>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-xl bg-zinc-900 px-3 py-2 ring-1 ring-zinc-800">
                          <p className="text-xs text-zinc-500">Costo teórico</p>
                          <p className="mt-1 font-black text-zinc-200">
                            {formatoPrecio(item.costoTeorico)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-red-600/10 px-3 py-2 ring-1 ring-red-500/30">
                          <p className="text-xs text-red-200/70">Costo de compra</p>
                          <p className="mt-1 font-black text-red-300">
                            {formatoPrecio(item.costoSugerido)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-red-950/40 via-zinc-950 to-black p-5 shadow-2xl shadow-red-950/20 md:p-6">
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
              Compartir resultados
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">
              Lleva tu resumen al grupo del asado
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Copia el resultado o envíalo directamente por WhatsApp o correo.
              El mensaje utiliza el valor de compra real estimado.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={copiarResultados}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              {copiado ? "✓ Resultados copiados" : "📋 Copiar resultados"}
            </button>

            <button
              type="button"
              onClick={compartirWhatsApp}
              className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4 text-base font-black text-emerald-300 transition hover:-translate-y-0.5 hover:bg-emerald-500/20"
            >
              💬 Compartir por WhatsApp
            </button>

            <button
              type="button"
              onClick={compartirCorreo}
              className="w-full rounded-2xl border border-red-500/40 bg-red-600 px-4 py-4 text-base font-black text-white shadow-xl shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-500"
            >
              ✉️ Enviar por correo
            </button>
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={volverAEditar}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-lg font-bold text-white hover:bg-zinc-800"
          >
            Volver a editar
          </button>

          <button
            type="button"
            onClick={reiniciarCalculo}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-lg font-bold text-red-300 hover:bg-zinc-800"
          >
            Reiniciar
          </button>
        </div>
      </div>

      <footer className="mt-8 bg-zinc-900 px-4 py-4 text-center text-xs leading-5 text-zinc-500">
        <p>
          * Los cálculos son aproximados. El modelo estima necesidad de carne,
          aprovechamiento de cada producto y redondeo por formato comercial. Los
          precios son referenciales y pueden variar según tienda, marca, peso real,
          corte y disponibilidad.
        </p>
      </footer>
    </main>
  );
}
