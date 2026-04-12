"use client";

import { useMemo, useState } from "react";
import { carnes } from "../lib/datos";
import type { CortesSeleccionadosState } from "../app/page";

interface Props {
  cortesSeleccionados: CortesSeleccionadosState;
  setCortesSeleccionados: React.Dispatch<
    React.SetStateAction<CortesSeleccionadosState>
  >;
}

export default function SelectorCarnes({
  cortesSeleccionados,
  setCortesSeleccionados,
}: Props) {
  const [vacuno, setVacuno] = useState(false);
  const [cerdo, setCerdo] = useState(false);
  const [pollo, setPollo] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const toggleCorte = (
    tipo: keyof CortesSeleccionadosState,
    corte: string
  ) => {
    const actuales = cortesSeleccionados[tipo];

    const nuevos = actuales.includes(corte)
      ? actuales.filter((item) => item !== corte)
      : [...actuales, corte];

    setCortesSeleccionados({
      ...cortesSeleccionados,
      [tipo]: nuevos,
    });
  };

  const toggleTipoCarne = (tipo: "vacuno" | "cerdo" | "pollo") => {
    if (tipo === "vacuno") {
      const nuevoValor = !vacuno;
      setVacuno(nuevoValor);

      if (!nuevoValor) {
        setCortesSeleccionados({
          ...cortesSeleccionados,
          vacuno: [],
        });
      }
    }

    if (tipo === "cerdo") {
      const nuevoValor = !cerdo;
      setCerdo(nuevoValor);

      if (!nuevoValor) {
        setCortesSeleccionados({
          ...cortesSeleccionados,
          cerdo: [],
        });
      }
    }

    if (tipo === "pollo") {
      const nuevoValor = !pollo;
      setPollo(nuevoValor);

      if (!nuevoValor) {
        setCortesSeleccionados({
          ...cortesSeleccionados,
          pollo: [],
        });
      }
    }
  };

  const filtrarCortes = (lista: { nombre: string; precio: number }[]) => {
    return [...lista]
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .filter((corte) =>
        corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
  };

  const vacunoFiltrado = useMemo(() => filtrarCortes(carnes.vacuno), [busqueda]);
  const cerdoFiltrado = useMemo(() => filtrarCortes(carnes.cerdo), [busqueda]);
  const polloFiltrado = useMemo(() => filtrarCortes(carnes.pollo), [busqueda]);

  const renderBloqueCortes = (
    tipo: keyof CortesSeleccionadosState,
    titulo: string,
    colorTitulo: string,
    lista: { nombre: string; precio: number }[]
  ) => {
    if (lista.length === 0) {
      return (
        <div className="ml-6 rounded-lg bg-zinc-800 p-4">
          <p className={`mb-2 font-semibold ${colorTitulo}`}>{titulo}</p>
          <p className="text-sm text-zinc-400">
            No hay cortes que coincidan con la búsqueda.
          </p>
        </div>
      );
    }

    return (
      <div className="ml-6 rounded-lg bg-zinc-800 p-4">
        <p className={`mb-4 font-semibold ${colorTitulo}`}>{titulo}</p>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {lista.map((corte) => (
            <label
              key={corte.nombre}
              className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
            >
              <input
                type="checkbox"
                checked={cortesSeleccionados[tipo].includes(corte.nombre)}
                onChange={() => toggleCorte(tipo, corte.nombre)}
                className="mt-1"
              />

              <div>
                <p className="font-medium text-white">{corte.nombre}</p>
                <p className="text-zinc-400">
                  ${corte.precio.toLocaleString()}/kg
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar corte..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
        />
      </div>

      <div className="space-y-4 text-white">
        <label className="flex items-center gap-3 text-lg font-medium">
          <input
            type="checkbox"
            checked={vacuno}
            onChange={() => toggleTipoCarne("vacuno")}
          />
          Vacuno
        </label>

        {vacuno &&
          renderBloqueCortes(
            "vacuno",
            "Cortes de vacuno",
            "text-red-300",
            vacunoFiltrado
          )}

        <label className="flex items-center gap-3 text-lg font-medium">
          <input
            type="checkbox"
            checked={cerdo}
            onChange={() => toggleTipoCarne("cerdo")}
          />
          Cerdo
        </label>

        {cerdo &&
          renderBloqueCortes(
            "cerdo",
            "Cortes de cerdo",
            "text-orange-300",
            cerdoFiltrado
          )}

        <label className="flex items-center gap-3 text-lg font-medium">
          <input
            type="checkbox"
            checked={pollo}
            onChange={() => toggleTipoCarne("pollo")}
          />
          Pollo
        </label>

        {pollo &&
          renderBloqueCortes(
            "pollo",
            "Cortes de pollo",
            "text-yellow-300",
            polloFiltrado
          )}

        <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
          <p className="font-semibold text-white">Cortes seleccionados:</p>

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
        </div>
      </div>
    </section>
  );
}
