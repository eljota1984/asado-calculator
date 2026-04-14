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

interface CorteActivo {
  nombre: string;
  tipo: "Vacuno" | "Cerdo" | "Pollo";
}

const coloresBarra = [
  "accent-red-500",
  "accent-orange-500",
  "accent-yellow-500",
  "accent-green-500",
  "accent-blue-500",
  "accent-purple-500",
  "accent-pink-500",
  "accent-teal-500",
  "accent-rose-500",
  "accent-lime-500",
];

const coloresBadge = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-rose-500",
  "bg-lime-500",
];

export default function SelectorPorcentajes({
  cortesSeleccionados,
  porcentajesCortes,
  setPorcentajesCortes,
}: Props) {
  const cortesActivos: CorteActivo[] = [
    ...cortesSeleccionados.vacuno.map((nombre) => ({
      nombre,
      tipo: "Vacuno" as const,
    })),
    ...cortesSeleccionados.cerdo.map((nombre) => ({
      nombre,
      tipo: "Cerdo" as const,
    })),
    ...cortesSeleccionados.pollo.map((nombre) => ({
      nombre,
      tipo: "Pollo" as const,
    })),
  ];

  useEffect(() => {
    setPorcentajesCortes((prev) => {
      const nuevoEstado: PorcentajesCortesState = {};

      if (cortesActivos.length === 0) {
        return {};
      }

      if (cortesActivos.length === 1) {
        nuevoEstado[cortesActivos[0].nombre] = 100;
        return nuevoEstado;
      }

      const existentes = cortesActivos.filter(
        (corte) => prev[corte.nombre] !== undefined
      );

      if (existentes.length === 0) {
        const base = Math.floor(100 / cortesActivos.length / 10) * 10;
        let acumulado = 0;

        cortesActivos.forEach((corte, index) => {
          if (index === cortesActivos.length - 1) {
            nuevoEstado[corte.nombre] = 100 - acumulado;
          } else {
            nuevoEstado[corte.nombre] = base;
            acumulado += base;
          }
        });

        return nuevoEstado;
      }

      for (const corte of cortesActivos) {
        nuevoEstado[corte.nombre] = prev[corte.nombre] ?? 0;
      }

      return nuevoEstado;
    });
  }, [cortesSeleccionados, setPorcentajesCortes]);

  const actualizarPorcentaje = (corteModificado: string, nuevoValor: number) => {
    const valorAjustado = Math.round(nuevoValor / 10) * 10;

    setPorcentajesCortes((prev) => {
      const nombres = cortesActivos.map((corte) => corte.nombre);

      if (nombres.length === 1) {
        return { [corteModificado]: 100 };
      }

      const otrosCortes = nombres.filter((nombre) => nombre !== corteModificado);
      const totalDisponible = 100 - valorAjustado;

      const sumaActualOtros = otrosCortes.reduce(
        (acc, nombre) => acc + (prev[nombre] ?? 0),
        0
      );

      const nuevoEstado: PorcentajesCortesState = {
        ...prev,
        [corteModificado]: valorAjustado,
      };

      if (otrosCortes.length === 0) {
        return nuevoEstado;
      }

      if (sumaActualOtros === 0) {
        const base = Math.floor(totalDisponible / otrosCortes.length / 10) * 10;
        let acumulado = 0;

        otrosCortes.forEach((nombre, index) => {
          if (index === otrosCortes.length - 1) {
            nuevoEstado[nombre] = totalDisponible - acumulado;
          } else {
            nuevoEstado[nombre] = base;
            acumulado += base;
          }
        });

        return nuevoEstado;
      }

      let acumulado = 0;

      otrosCortes.forEach((nombre, index) => {
        if (index === otrosCortes.length - 1) {
          nuevoEstado[nombre] = totalDisponible - acumulado;
        } else {
          const proporcion = (prev[nombre] ?? 0) / sumaActualOtros;
          const valorRecalculado =
            Math.round((totalDisponible * proporcion) / 10) * 10;

          nuevoEstado[nombre] = valorRecalculado;
          acumulado += valorRecalculado;
        }
      });

      return nuevoEstado;
    });
  };

  const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
    return acc + (porcentajesCortes[corte.nombre] ?? 0);
  }, 0);

  const getColorTipo = (tipo: CorteActivo["tipo"]) => {
    if (tipo === "Vacuno") return "text-red-300";
    if (tipo === "Cerdo") return "text-orange-300";
    return "text-yellow-300";
  };

  if (cortesActivos.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
      <h2 className="mb-6 text-2xl font-bold">Porcentaje por corte</h2>

      <div className="space-y-5">
        {cortesActivos.map((corte, index) => (
          <div key={corte.nombre} className="rounded-xl bg-zinc-800 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{corte.nombre}</p>
                <p className={`text-sm ${getColorTipo(corte.tipo)}`}>
                  {corte.tipo}
                </p>
              </div>

              <div
                className={`rounded-lg px-3 py-1 text-lg font-bold text-white ${
                  coloresBadge[index % coloresBadge.length]
                }`}
              >
                {porcentajesCortes[corte.nombre] ?? 0}%
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={porcentajesCortes[corte.nombre] ?? 0}
              onChange={(e) =>
                actualizarPorcentaje(corte.nombre, Number(e.target.value))
              }
              className={`w-full ${coloresBarra[index % coloresBarra.length]}`}
            />
          </div>
        ))}

        <div className="rounded-xl bg-zinc-800 p-4">
          <p className="text-lg font-semibold">
            Total porcentajes:{" "}
            <span
              className={
                totalPorcentajes === 100 ? "text-green-400" : "text-red-400"
              }
            >
              {totalPorcentajes}%
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}