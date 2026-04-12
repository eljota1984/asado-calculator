"use client";

import { useEffect } from "react";
import type {
  CortesSeleccionadosState,
  PorcentajesCortesState,
} from "../app/page";

interface Props {
  cortesSeleccionados: CortesSeleccionadosState;
  porcentajesCortes: PorcentajesCortesState;
  setPorcentajesCortes: React.Dispatch<
    React.SetStateAction<PorcentajesCortesState>
  >;
}

export default function SelectorPorcentajes({
  cortesSeleccionados,
  porcentajesCortes,
  setPorcentajesCortes,
}: Props) {
  const cortesActivos = [
    ...cortesSeleccionados.vacuno,
    ...cortesSeleccionados.cerdo,
    ...cortesSeleccionados.pollo,
  ];

  useEffect(() => {
    setPorcentajesCortes((prev) => {
      const nuevoEstado: PorcentajesCortesState = {};

      for (const corte of cortesActivos) {
        nuevoEstado[corte] = prev[corte] ?? 0;
      }

      return nuevoEstado;
    });
  }, [cortesActivos, setPorcentajesCortes]);

  const actualizarPorcentaje = (corte: string, valor: number) => {
    setPorcentajesCortes((prev) => ({
      ...prev,
      [corte]: valor,
    }));
  };

  const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
    return acc + (porcentajesCortes[corte] ?? 0);
  }, 0);

  if (cortesActivos.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
      <h2 className="mb-6 text-2xl font-bold">Porcentaje por corte</h2>

      <div className="space-y-6">
        {cortesActivos.map((corte) => (
          <div key={corte} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{corte}</span>
              <span className="text-yellow-400">
                {porcentajesCortes[corte] ?? 0}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={porcentajesCortes[corte] ?? 0}
              onChange={(e) =>
                actualizarPorcentaje(corte, Number(e.target.value))
              }
              className="w-full"
            />
          </div>
        ))}

        <div className="rounded-lg bg-zinc-800 p-4">
          <p className="font-semibold">
            Total porcentajes:{" "}
            <span
              className={
                totalPorcentajes === 100 ? "text-green-400" : "text-red-400"
              }
            >
              {totalPorcentajes}%
            </span>
          </p>

          {totalPorcentajes !== 100 && (
            <p className="mt-2 text-sm text-red-400">
              Debes ajustar los porcentajes hasta que la suma sea 100%.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}