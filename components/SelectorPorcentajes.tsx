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

      for (const corte of cortesActivos) {
        nuevoEstado[corte.nombre] = prev[corte.nombre] ?? 0;
      }

      return nuevoEstado;
    });
  }, [cortesSeleccionados, setPorcentajesCortes]);

  const actualizarPorcentaje = (corte: string, valor: number) => {
    setPorcentajesCortes((prev) => ({
      ...prev,
      [corte]: valor,
    }));
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
// "use client";

// import { useEffect } from "react";
// import type {
//   CortesSeleccionadosState,
//   PorcentajesCortesState,
// } from "../app/page";

// interface Props {
//   cortesSeleccionados: CortesSeleccionadosState;
//   porcentajesCortes: PorcentajesCortesState;
//   setPorcentajesCortes: React.Dispatch<
//     React.SetStateAction<PorcentajesCortesState>
//   >;
// }

// export default function SelectorPorcentajes({
//   cortesSeleccionados,
//   porcentajesCortes,
//   setPorcentajesCortes,
// }: Props) {
//   const cortesActivos = [
//     ...cortesSeleccionados.vacuno,
//     ...cortesSeleccionados.cerdo,
//     ...cortesSeleccionados.pollo,
//   ];

//   useEffect(() => {
//     setPorcentajesCortes((prev) => {
//       const nuevoEstado: PorcentajesCortesState = {};

//       for (const corte of cortesActivos) {
//         nuevoEstado[corte] = prev[corte] ?? 0;
//       }

//       return nuevoEstado;
//     });
//   }, [cortesActivos, setPorcentajesCortes]);

//   const actualizarPorcentaje = (corte: string, valor: number) => {
//     setPorcentajesCortes((prev) => ({
//       ...prev,
//       [corte]: valor,
//     }));
//   };

//   const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
//     return acc + (porcentajesCortes[corte] ?? 0);
//   }, 0);

//   if (cortesActivos.length === 0) {
//     return null;
//   }

//   return (
//     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
//       <h2 className="mb-6 text-2xl font-bold">Porcentaje por corte</h2>

//       <div className="space-y-6">
//         {cortesActivos.map((corte) => (
//           <div key={corte} className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="font-medium">{corte}</span>
//               <span className="text-yellow-400">
//                 {porcentajesCortes[corte] ?? 0}%
//               </span>
//             </div>

//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={porcentajesCortes[corte] ?? 0}
//               onChange={(e) =>
//                 actualizarPorcentaje(corte, Number(e.target.value))
//               }
//               className="w-full"
//             />
//           </div>
//         ))}

//         <div className="rounded-lg bg-zinc-800 p-4">
//           <p className="font-semibold">
//             Total porcentajes:{" "}
//             <span
//               className={
//                 totalPorcentajes === 100 ? "text-green-400" : "text-red-400"
//               }
//             >
//               {totalPorcentajes}%
//             </span>
//           </p>

//           {totalPorcentajes !== 100 && (
//             <p className="mt-2 text-sm text-red-400">
//               Debes ajustar los porcentajes hasta que la suma sea 100%.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }