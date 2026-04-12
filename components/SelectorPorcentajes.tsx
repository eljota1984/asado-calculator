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

      const existentes = cortesActivos.filter((corte) => prev[corte.nombre] !== undefined);

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
        {cortesActivos.map((corte) => (
          <div key={corte.nombre} className="rounded-xl bg-zinc-800 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{corte.nombre}</p>
                <p className={`text-sm ${getColorTipo(corte.tipo)}`}>
                  {corte.tipo}
                </p>
              </div>

              <div className="rounded-lg bg-zinc-900 px-3 py-1 text-lg font-bold text-yellow-400">
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
              className="w-full accent-yellow-500"
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
// "use client";

// import { useEffect } from "react";
// import type {
//     CortesSeleccionadosState,
//     PorcentajesCortesState,
// } from "../app/page";

// interface Props {
//     cortesSeleccionados: CortesSeleccionadosState;
//     porcentajesCortes: PorcentajesCortesState;
//     setPorcentajesCortes: React.Dispatch<
//         React.SetStateAction<PorcentajesCortesState>
//     >;
// }

// interface CorteActivo {
//     nombre: string;
//     tipo: "Vacuno" | "Cerdo" | "Pollo";
// }

// export default function SelectorPorcentajes({
//     cortesSeleccionados,
//     porcentajesCortes,
//     setPorcentajesCortes,
// }: Props) {
//     const cortesActivos: CorteActivo[] = [
//         ...cortesSeleccionados.vacuno.map((nombre) => ({
//             nombre,
//             tipo: "Vacuno" as const,
//         })),
//         ...cortesSeleccionados.cerdo.map((nombre) => ({
//             nombre,
//             tipo: "Cerdo" as const,
//         })),
//         ...cortesSeleccionados.pollo.map((nombre) => ({
//             nombre,
//             tipo: "Pollo" as const,
//         })),
//     ];

//     useEffect(() => {
//         setPorcentajesCortes((prev) => {
//             const nuevoEstado: PorcentajesCortesState = {};

//             for (const corte of cortesActivos) {
//                 nuevoEstado[corte.nombre] = prev[corte.nombre] ?? 0;
//             }

//             return nuevoEstado;
//         });
//     }, [cortesSeleccionados, setPorcentajesCortes]);

//     const actualizarPorcentaje = (corte: string, valor: number) => {
//         setPorcentajesCortes((prev) => ({
//             ...prev,
//             [corte]: valor,
//         }));
//     };

//     const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
//         return acc + (porcentajesCortes[corte.nombre] ?? 0);
//     }, 0);

//     const getColorTipo = (tipo: CorteActivo["tipo"]) => {
//         if (tipo === "Vacuno") return "text-red-300";
//         if (tipo === "Cerdo") return "text-orange-300";
//         return "text-yellow-300";
//     };

//     if (cortesActivos.length === 0) {
//         return null;
//     }

//     return (
//         <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
//             <h2 className="mb-6 text-2xl font-bold">Porcentaje por corte</h2>

//             <div className="space-y-5">
//                 {cortesActivos.map((corte) => (
//                     <div key={corte.nombre} className="rounded-xl bg-zinc-800 p-4">
//                         <div className="mb-3 flex items-center justify-between gap-4">
//                             <div>
//                                 <p className="font-semibold text-white">{corte.nombre}</p>
//                                 <p className={`text-sm ${getColorTipo(corte.tipo)}`}>
//                                     {corte.tipo}
//                                 </p>
//                             </div>

//                             <div className="rounded-lg bg-zinc-900 px-3 py-1 text-lg font-bold text-yellow-400">
//                                 {porcentajesCortes[corte.nombre] ?? 0}%
//                             </div>
//                         </div>

//                         <input
//                             type="range"
//                             min="0"
//                             max="100"
//                             step="10"
//                             value={porcentajesCortes[corte.nombre] ?? 0}
//                             onChange={(e) =>
//                                 actualizarPorcentaje(
//                                     corte.nombre,
//                                     Math.round(Number(e.target.value) / 10) * 10
//                                 )
//                             }
//                             className="w-full accent-yellow-500"
//                         />
//                     </div>
//                 ))}

//                 <div className="rounded-xl bg-zinc-800 p-4">
//                     <p className="text-lg font-semibold">
//                         Total porcentajes:{" "}
//                         <span
//                             className={
//                                 totalPorcentajes === 100 ? "text-green-400" : "text-red-400"
//                             }
//                         >
//                             {totalPorcentajes}%
//                         </span>
//                     </p>

//                     {totalPorcentajes !== 100 && (
//                         <p className="mt-2 text-sm text-red-400">
//                             Debes ajustar los porcentajes hasta que la suma sea 100%.
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }
