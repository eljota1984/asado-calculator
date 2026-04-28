"use client";

import { useMemo, useState } from "react";
import {
  productosAsado,
  type ProductoAsado,
  type CategoriaCorte,
  type TipoVenta,
} from "../lib/datos";
import type { CortesSeleccionadosState } from "../app/page";

interface Props {
  cortesSeleccionados: CortesSeleccionadosState;
  setCortesSeleccionados: React.Dispatch<
    React.SetStateAction<CortesSeleccionadosState>
  >;
}

type FiltroCategoria = "todos" | CategoriaCorte;

export default function SelectorCarnes({
  cortesSeleccionados,
  setCortesSeleccionados,
}: Props) {
  const [vacunoAbierto, setVacunoAbierto] = useState(false);
  const [cerdoAbierto, setCerdoAbierto] = useState(false);
  const [polloAbierto, setPolloAbierto] = useState(false);
  const [embutidosAbierto, setEmbutidosAbierto] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [soloParrilla, setSoloParrilla] = useState(false);
  const [filtroCategoria, setFiltroCategoria] =
    useState<FiltroCategoria>("todos");

  const toggleCorte = (
    tipo: keyof CortesSeleccionadosState,
    nombreProducto: string
  ) => {
    const actuales = cortesSeleccionados[tipo];

    const nuevos = actuales.includes(nombreProducto)
      ? actuales.filter((item) => item !== nombreProducto)
      : [...actuales, nombreProducto];

    setCortesSeleccionados({
      ...cortesSeleccionados,
      [tipo]: nuevos,
    });
  };

  const toggleTipo = (
    tipo: "vacuno" | "cerdo" | "pollo" | "embutidos"
  ) => {
    if (tipo === "vacuno") setVacunoAbierto(!vacunoAbierto);
    if (tipo === "cerdo") setCerdoAbierto(!cerdoAbierto);
    if (tipo === "pollo") setPolloAbierto(!polloAbierto);
    if (tipo === "embutidos") setEmbutidosAbierto(!embutidosAbierto);
  };

  const limpiarTipo = (tipo: keyof CortesSeleccionadosState) => {
    setCortesSeleccionados({
      ...cortesSeleccionados,
      [tipo]: [],
    });
  };

  const filtrarProductos = (lista: ProductoAsado[]) => {
    return [...lista]
      .filter((producto) => (soloParrilla ? producto.parrilla : true))
      .filter((producto) =>
        filtroCategoria === "todos"
          ? true
          : producto.categoria === filtroCategoria
      )
      .filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  };

  const vacunoFiltrado = useMemo(
    () => filtrarProductos(productosAsado.vacuno),
    [busqueda, soloParrilla, filtroCategoria]
  );

  const cerdoFiltrado = useMemo(
    () => filtrarProductos(productosAsado.cerdo),
    [busqueda, soloParrilla, filtroCategoria]
  );

  const polloFiltrado = useMemo(
    () => filtrarProductos(productosAsado.pollo),
    [busqueda, soloParrilla, filtroCategoria]
  );

  const embutidosFiltrado = useMemo(
    () => filtrarProductos(productosAsado.embutidos),
    [busqueda, soloParrilla, filtroCategoria]
  );

  const colorContador = (cantidad: number) =>
    cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

  const getCategoriaBadge = (categoria: CategoriaCorte) => {
    if (categoria === "economico") {
      return {
        texto: "💰 Económico",
        className: "bg-green-900 text-green-300",
      };
    }

    if (categoria === "mixto") {
      return {
        texto: "⚖️ Mixto",
        className: "bg-yellow-900 text-yellow-300",
      };
    }

    return {
      texto: "🥩 Premium",
      className: "bg-red-900 text-red-300",
    };
  };

  const getTipoVentaBadge = (tipoVenta: TipoVenta) => {
    if (tipoVenta === "pack") {
      return {
        texto: "📦 Pack",
        className: "bg-blue-900 text-blue-300",
      };
    }

    if (tipoVenta === "bandeja") {
      return {
        texto: "🧺 Bandeja",
        className: "bg-purple-900 text-purple-300",
      };
    }

    if (tipoVenta === "unidad") {
      return {
        texto: "🧩 Unidad",
        className: "bg-cyan-900 text-cyan-300",
      };
    }

    return {
      texto: "⚖️ Peso variable",
      className: "bg-zinc-700 text-zinc-200",
    };
  };

  const renderInfoVenta = (producto: ProductoAsado) => {
    const partes: string[] = [];

    if (producto.pesoPromedio) {
      partes.push(`Promedio: ${producto.pesoPromedio.toFixed(2)} kg`);
    }

    if (producto.pesoMinimo && producto.pesoMaximo) {
      partes.push(
        `Rango: ${producto.pesoMinimo.toFixed(2)}–${producto.pesoMaximo.toFixed(
          2
        )} kg`
      );
    }

    if (producto.unidadesPorPack) {
      partes.push(`${producto.unidadesPorPack} unidades`);
    }

    if (producto.descripcionVenta) {
      partes.push(producto.descripcionVenta);
    }

    return partes;
  };

  const renderBloque = (
    tipo: keyof CortesSeleccionadosState,
    titulo: string,
    colorTitulo: string,
    lista: ProductoAsado[]
  ) => {
    if (lista.length === 0) {
      return (
        <div className="ml-6 rounded-lg bg-zinc-800 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

            {cortesSeleccionados[tipo].length > 0 && (
              <button
                onClick={() => limpiarTipo(tipo)}
                className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
              >
                Limpiar
              </button>
            )}
          </div>

          <p className="text-sm text-zinc-400">
            No hay productos que coincidan con el filtro actual.
          </p>
        </div>
      );
    }

    return (
      <div className="ml-6 rounded-lg bg-zinc-800 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

          {cortesSeleccionados[tipo].length > 0 && (
            <button
              onClick={() => limpiarTipo(tipo)}
              className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {lista.map((producto) => {
            const badgeCategoria = getCategoriaBadge(producto.categoria);
            const badgeVenta = getTipoVentaBadge(producto.tipoVenta);
            const infoVenta = renderInfoVenta(producto);

            return (
              <label
                key={producto.nombre}
                className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
              >
                <input
                  type="checkbox"
                  checked={cortesSeleccionados[tipo].includes(producto.nombre)}
                  onChange={() => toggleCorte(tipo, producto.nombre)}
                  className="mt-1"
                />

                <div className="space-y-1">
                  <p className="font-medium text-white">{producto.nombre}</p>

                  <p className="text-zinc-400">
                    ${producto.precio.toLocaleString()}
                    {producto.tipoVenta === "pack" ? " / pack" : " / kg"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {producto.parrilla && (
                      <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-green-400">
                        🔥 Parrilla
                      </span>
                    )}

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${badgeCategoria.className}`}
                    >
                      {badgeCategoria.texto}
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${badgeVenta.className}`}
                    >
                      {badgeVenta.texto}
                    </span>
                  </div>

                  {infoVenta.length > 0 && (
                    <div className="pt-1 text-xs text-zinc-400">
                      {infoVenta.map((linea) => (
                        <p key={linea}>{linea}</p>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full max-w-5xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Productos para el asado
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto o corte..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
        />
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
          <input
            type="checkbox"
            checked={soloParrilla}
            onChange={() => setSoloParrilla(!soloParrilla)}
          />
          <span>Mostrar solo productos de parrilla 🔥</span>
        </div>

        <div className="rounded-xl bg-zinc-800 p-4 text-white">
          <p className="mb-3 font-semibold">Filtrar por categoría</p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroCategoria("todos")}
              className={`rounded-lg px-3 py-2 text-sm ${
                filtroCategoria === "todos"
                  ? "bg-zinc-600 text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setFiltroCategoria("economico")}
              className={`rounded-lg px-3 py-2 text-sm ${
                filtroCategoria === "economico"
                  ? "bg-green-700 text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              💰 Económicos
            </button>

            <button
              onClick={() => setFiltroCategoria("mixto")}
              className={`rounded-lg px-3 py-2 text-sm ${
                filtroCategoria === "mixto"
                  ? "bg-yellow-600 text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              ⚖️ Mixtos
            </button>

            <button
              onClick={() => setFiltroCategoria("premium")}
              className={`rounded-lg px-3 py-2 text-sm ${
                filtroCategoria === "premium"
                  ? "bg-red-700 text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              🥩 Premium
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-white">
        <button
          onClick={() => toggleTipo("vacuno")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
        >
          <span>
            Vacuno{" "}
            <span className={colorContador(cortesSeleccionados.vacuno.length)}>
              ({cortesSeleccionados.vacuno.length})
            </span>
          </span>
          <span className="text-2xl">{vacunoAbierto ? "−" : "+"}</span>
        </button>

        {vacunoAbierto &&
          renderBloque(
            "vacuno",
            "Productos de vacuno",
            "text-red-300",
            vacunoFiltrado
          )}

        <button
          onClick={() => toggleTipo("cerdo")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
        >
          <span>
            Cerdo{" "}
            <span className={colorContador(cortesSeleccionados.cerdo.length)}>
              ({cortesSeleccionados.cerdo.length})
            </span>
          </span>
          <span className="text-2xl">{cerdoAbierto ? "−" : "+"}</span>
        </button>

        {cerdoAbierto &&
          renderBloque(
            "cerdo",
            "Productos de cerdo",
            "text-orange-300",
            cerdoFiltrado
          )}

        <button
          onClick={() => toggleTipo("pollo")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
        >
          <span>
            Pollo{" "}
            <span className={colorContador(cortesSeleccionados.pollo.length)}>
              ({cortesSeleccionados.pollo.length})
            </span>
          </span>
          <span className="text-2xl">{polloAbierto ? "−" : "+"}</span>
        </button>

        {polloAbierto &&
          renderBloque(
            "pollo",
            "Productos de pollo",
            "text-yellow-300",
            polloFiltrado
          )}

        <button
          onClick={() => toggleTipo("embutidos")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
        >
          <span>
            Embutidos{" "}
            <span
              className={colorContador(cortesSeleccionados.embutidos.length)}
            >
              ({cortesSeleccionados.embutidos.length})
            </span>
          </span>
          <span className="text-2xl">{embutidosAbierto ? "−" : "+"}</span>
        </button>

        {embutidosAbierto &&
          renderBloque(
            "embutidos",
            "Productos de embutidos",
            "text-pink-300",
            embutidosFiltrado
          )}

        <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
          <p className="font-semibold text-white">Seleccionados:</p>

          <p className="mt-2 text-zinc-300">
            Vacuno:{" "}
            {cortesSeleccionados.vacuno.length > 0
              ? cortesSeleccionados.vacuno.join(", ")
              : "Ninguno"}
          </p>

          <p className="text-zinc-300">
            Cerdo:{" "}
            {cortesSeleccionados.cerdo.length > 0
              ? cortesSeleccionados.cerdo.join(", ")
              : "Ninguno"}
          </p>

          <p className="text-zinc-300">
            Pollo:{" "}
            {cortesSeleccionados.pollo.length > 0
              ? cortesSeleccionados.pollo.join(", ")
              : "Ninguno"}
          </p>

          <p className="text-zinc-300">
            Embutidos:{" "}
            {cortesSeleccionados.embutidos.length > 0
              ? cortesSeleccionados.embutidos.join(", ")
              : "Ninguno"}
          </p>
        </div>
      </div>
    </section>
  );
}

