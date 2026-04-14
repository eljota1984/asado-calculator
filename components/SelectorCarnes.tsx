"use client";

import { useMemo, useState } from "react";
import { carnes, type Corte } from "../lib/datos";
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
  const [vacunoAbierto, setVacunoAbierto] = useState(false);
  const [cerdoAbierto, setCerdoAbierto] = useState(false);
  const [polloAbierto, setPolloAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [soloParrilla, setSoloParrilla] = useState(false);

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
      setVacunoAbierto(!vacunoAbierto);
    }

    if (tipo === "cerdo") {
      setCerdoAbierto(!cerdoAbierto);
    }

    if (tipo === "pollo") {
      setPolloAbierto(!polloAbierto);
    }
  };

  const limpiarTipoCarne = (tipo: keyof CortesSeleccionadosState) => {
    setCortesSeleccionados({
      ...cortesSeleccionados,
      [tipo]: [],
    });
  };

  const filtrarCortes = (lista: Corte[]) => {
    return [...lista]
      .filter((corte) => (soloParrilla ? corte.parrilla : true))
      .filter((corte) =>
        corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  };

  const vacunoFiltrado = useMemo(
    () => filtrarCortes(carnes.vacuno),
    [busqueda, soloParrilla]
  );

  const cerdoFiltrado = useMemo(
    () => filtrarCortes(carnes.cerdo),
    [busqueda, soloParrilla]
  );

  const polloFiltrado = useMemo(
    () => filtrarCortes(carnes.pollo),
    [busqueda, soloParrilla]
  );

  const colorContador = (cantidad: number) =>
    cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

  const renderBloqueCortes = (
    tipo: keyof CortesSeleccionadosState,
    titulo: string,
    colorTitulo: string,
    lista: Corte[]
  ) => {
    if (lista.length === 0) {
      return (
        <div className="ml-6 rounded-lg bg-zinc-800 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

            {cortesSeleccionados[tipo].length > 0 && (
              <button
                onClick={() => limpiarTipoCarne(tipo)}
                className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
              >
                Limpiar
              </button>
            )}
          </div>

          <p className="text-sm text-zinc-400">
            No hay cortes que coincidan con el filtro actual.
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
              onClick={() => limpiarTipoCarne(tipo)}
              className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
            >
              Limpiar
            </button>
          )}
        </div>

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

                {corte.parrilla && (
                  <span className="text-xs text-green-400">
                    🔥 Parrilla
                  </span>
                )}
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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar corte..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
        />
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
        <input
          type="checkbox"
          checked={soloParrilla}
          onChange={() => setSoloParrilla(!soloParrilla)}
        />
        <span>Mostrar solo cortes de parrilla 🔥</span>
      </div>

      <div className="space-y-4 text-white">
        {/* VACUNO */}
        <button
          onClick={() => toggleTipoCarne("vacuno")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium text-white hover:bg-zinc-700"
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
          renderBloqueCortes(
            "vacuno",
            "Cortes de vacuno",
            "text-red-300",
            vacunoFiltrado
          )}

        {/* CERDO */}
        <button
          onClick={() => toggleTipoCarne("cerdo")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium text-white hover:bg-zinc-700"
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
          renderBloqueCortes(
            "cerdo",
            "Cortes de cerdo",
            "text-orange-300",
            cerdoFiltrado
          )}

        {/* POLLO */}
        <button
          onClick={() => toggleTipoCarne("pollo")}
          className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium text-white hover:bg-zinc-700"
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
// "use client";

// import { useMemo, useState } from "react";
// import { carnes, type Corte } from "../lib/datos";
// import type { CortesSeleccionadosState } from "../app/page";

// interface Props {
//   cortesSeleccionados: CortesSeleccionadosState;
//   setCortesSeleccionados: React.Dispatch<
//     React.SetStateAction<CortesSeleccionadosState>
//   >;
// }

// export default function SelectorCarnes({
//   cortesSeleccionados,
//   setCortesSeleccionados,
// }: Props) {
//   const [vacunoAbierto, setVacunoAbierto] = useState(false);
//   const [cerdoAbierto, setCerdoAbierto] = useState(false);
//   const [polloAbierto, setPolloAbierto] = useState(false);
//   const [busqueda, setBusqueda] = useState("");

//   // 🔥 NUEVO ESTADO
//   const [soloParrilla, setSoloParrilla] = useState(false);

//   const toggleCorte = (
//     tipo: keyof CortesSeleccionadosState,
//     corte: string
//   ) => {
//     const actuales = cortesSeleccionados[tipo];

//     const nuevos = actuales.includes(corte)
//       ? actuales.filter((item) => item !== corte)
//       : [...actuales, corte];

//     setCortesSeleccionados({
//       ...cortesSeleccionados,
//       [tipo]: nuevos,
//     });
//   };

//   const toggleTipoCarne = (tipo: "vacuno" | "cerdo" | "pollo") => {
//     if (tipo === "vacuno") setVacunoAbierto(!vacunoAbierto);
//     if (tipo === "cerdo") setCerdoAbierto(!cerdoAbierto);
//     if (tipo === "pollo") setPolloAbierto(!polloAbierto);
//   };

//   const limpiarTipoCarne = (tipo: keyof CortesSeleccionadosState) => {
//     setCortesSeleccionados({
//       ...cortesSeleccionados,
//       [tipo]: [],
//     });
//   };

//   // 🔥 FILTRO CORREGIDO
//   const filtrarCortes = (lista: Corte[]) => {
//     return [...lista]
//       .filter((corte) => (soloParrilla ? corte.parrilla : true))
//       .filter((corte) =>
//         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
//       )
//       .sort((a, b) => a.nombre.localeCompare(b.nombre));
//   };

//   const vacunoFiltrado = useMemo(
//     () => filtrarCortes(carnes.vacuno),
//     [busqueda, soloParrilla]
//   );

//   const cerdoFiltrado = useMemo(
//     () => filtrarCortes(carnes.cerdo),
//     [busqueda, soloParrilla]
//   );

//   const polloFiltrado = useMemo(
//     () => filtrarCortes(carnes.pollo),
//     [busqueda, soloParrilla]
//   );

//   const colorContador = (cantidad: number) =>
//     cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

//   const renderBloqueCortes = (
//     tipo: keyof CortesSeleccionadosState,
//     titulo: string,
//     colorTitulo: string,
//     lista: Corte[]
//   ) => {
//     return (
//       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

//           {cortesSeleccionados[tipo].length > 0 && (
//             <button
//               onClick={() => limpiarTipoCarne(tipo)}
//               className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300"
//             >
//               Limpiar
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//           {lista.map((corte) => (
//             <label
//               key={corte.nombre}
//               className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3"
//             >
//               <input
//                 type="checkbox"
//                 checked={cortesSeleccionados[tipo].includes(corte.nombre)}
//                 onChange={() => toggleCorte(tipo, corte.nombre)}
//               />

//               <div>
//                 <p className="text-white">{corte.nombre}</p>
//                 <p className="text-sm text-zinc-400">
//                   ${corte.precio.toLocaleString()}/kg
//                 </p>

//                 {corte.parrilla && (
//                   <span className="text-xs text-green-400">
//                     🔥 Parrilla
//                   </span>
//                 )}
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold text-white">
//         Tipo de carne
//       </h2>

//       <input
//         type="text"
//         placeholder="Buscar corte..."
//         value={busqueda}
//         onChange={(e) => setBusqueda(e.target.value)}
//         className="mb-4 w-full rounded-xl bg-zinc-800 px-4 py-3 text-white"
//       />

//       {/* 🔥 CHECKBOX */}
//       <div className="mb-6 flex items-center gap-3 text-white">
//         <input
//           type="checkbox"
//           checked={soloParrilla}
//           onChange={() => setSoloParrilla(!soloParrilla)}
//         />
//         <span>Mostrar solo cortes de parrilla 🔥</span>
//       </div>

//       <div className="space-y-4 text-white">
//         {/* VACUNO */}
//         <button onClick={() => toggleTipoCarne("vacuno")}>
//           Vacuno ({cortesSeleccionados.vacuno.length})
//         </button>
//         {vacunoAbierto &&
//           renderBloqueCortes(
//             "vacuno",
//             "Cortes de vacuno",
//             "text-red-300",
//             vacunoFiltrado
//           )}

//         {/* CERDO */}
//         <button onClick={() => toggleTipoCarne("cerdo")}>
//           Cerdo ({cortesSeleccionados.cerdo.length})
//         </button>
//         {cerdoAbierto &&
//           renderBloqueCortes(
//             "cerdo",
//             "Cortes de cerdo",
//             "text-orange-300",
//             cerdoFiltrado
//           )}

//         {/* POLLO */}
//         <button onClick={() => toggleTipoCarne("pollo")}>
//           Pollo ({cortesSeleccionados.pollo.length})
//         </button>
//         {polloAbierto &&
//           renderBloqueCortes(
//             "pollo",
//             "Cortes de pollo",
//             "text-yellow-300",
//             polloFiltrado
//           )}
//       </div>
//     </section>
//   );
// }
// // "use client";

// // import { useMemo, useState } from "react";
// // import { carnes } from "../lib/datos";
// // import type { CortesSeleccionadosState } from "../app/page";

// // interface Props {
// //   cortesSeleccionados: CortesSeleccionadosState;
// //   setCortesSeleccionados: React.Dispatch<
// //     React.SetStateAction<CortesSeleccionadosState>
// //   >;
// // }

// // export default function SelectorCarnes({
// //   cortesSeleccionados,
// //   setCortesSeleccionados,
// // }: Props) {
// //   const [vacunoAbierto, setVacunoAbierto] = useState(false);
// //   const [cerdoAbierto, setCerdoAbierto] = useState(false);
// //   const [polloAbierto, setPolloAbierto] = useState(false);
// //   const [busqueda, setBusqueda] = useState("");

// //   const toggleCorte = (
// //     tipo: keyof CortesSeleccionadosState,
// //     corte: string
// //   ) => {
// //     const actuales = cortesSeleccionados[tipo];

// //     const nuevos = actuales.includes(corte)
// //       ? actuales.filter((item) => item !== corte)
// //       : [...actuales, corte];

// //     setCortesSeleccionados({
// //       ...cortesSeleccionados,
// //       [tipo]: nuevos,
// //     });
// //   };

// //   const toggleTipoCarne = (tipo: "vacuno" | "cerdo" | "pollo") => {
// //     if (tipo === "vacuno") {
// //       setVacunoAbierto(!vacunoAbierto);
// //     }

// //     if (tipo === "cerdo") {
// //       setCerdoAbierto(!cerdoAbierto);
// //     }

// //     if (tipo === "pollo") {
// //       setPolloAbierto(!polloAbierto);
// //     }
// //   };

// //   const limpiarTipoCarne = (tipo: keyof CortesSeleccionadosState) => {
// //     setCortesSeleccionados({
// //       ...cortesSeleccionados,
// //       [tipo]: [],
// //     });
// //   };

// //   const filtrarCortes = (lista: Corte[]) => {
// //     return [...lista]
// //       .filter((corte) => (soloParrilla ? corte.parrilla : true))
// //       .filter((corte) =>
// //         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
// //       )
// //       .sort((a, b) => a.nombre.localeCompare(b.nombre));
// //   };
// //   // const filtrarCortes = (lista: { nombre: string; precio: number }[]) => {
// //   //   return [...lista]
// //   //     .sort((a, b) => a.nombre.localeCompare(b.nombre))
// //   //     .filter((corte) =>
// //   //       corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
// //   //     );
// //   // };

// //   const vacunoFiltrado = useMemo(
// //     () => filtrarCortes(carnes.vacuno),
// //     [busqueda]
// //   );
// //   const cerdoFiltrado = useMemo(
// //     () => filtrarCortes(carnes.cerdo),
// //     [busqueda]
// //   );
// //   const polloFiltrado = useMemo(
// //     () => filtrarCortes(carnes.pollo),
// //     [busqueda]
// //   );

// //   const colorContador = (cantidad: number) =>
// //     cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

// //   const renderBloqueCortes = (
// //     tipo: keyof CortesSeleccionadosState,
// //     titulo: string,
// //     colorTitulo: string,
// //     lista: { nombre: string; precio: number }[]
// //   ) => {
// //     if (lista.length === 0) {
// //       return (
// //         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //           <p className={`mb-2 font-semibold ${colorTitulo}`}>{titulo}</p>
// //           <p className="text-sm text-zinc-400">
// //             No hay cortes que coincidan con la búsqueda.
// //           </p>
// //         </div>
// //       );
// //     }
// //     const [soloParrilla, setSoloParrilla] = useState(false);

// //     return (
// //       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //         <div className="mb-4 flex items-center justify-between gap-3">
// //           <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

// //           {cortesSeleccionados[tipo].length > 0 && (
// //             <button
// //               onClick={() => limpiarTipoCarne(tipo)}
// //               className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
// //             >
// //               Limpiar
// //             </button>
// //           )}
// //         </div>

// //         <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
// //           {lista.map((corte) => (
// //             <label
// //               key={corte.nombre}
// //               className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
// //             >
// //               <input
// //                 type="checkbox"
// //                 checked={cortesSeleccionados[tipo].includes(corte.nombre)}
// //                 onChange={() => toggleCorte(tipo, corte.nombre)}
// //                 className="mt-1"
// //               />

// //               <div>
// //                 <p className="font-medium text-white">{corte.nombre}</p>
// //                 <p className="text-zinc-400">
// //                   ${corte.precio.toLocaleString()}/kg
// //                 </p>
// //               </div>
// //             </label>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// //       <div className="mb-6">
// //         <input
// //           type="text"
// //           placeholder="Buscar corte..."
// //           value={busqueda}
// //           onChange={(e) => setBusqueda(e.target.value)}
// //           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
// //         />

// //       </div>
// //       <div className="mb-6 flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
// //         <input
// //           type="checkbox"
// //           checked={soloParrilla}
// //           onChange={() => setSoloParrilla(!soloParrilla)}
// //         />
// //         <span>Mostrar solo cortes de parrilla 🔥</span>
// //       </div>


// //       <div className="space-y-4 text-white">
// //         <button
// //           onClick={() => toggleTipoCarne("vacuno")}
// //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// //         >
// //           <span>
// //             Vacuno{" "}
// //             <span className={colorContador(cortesSeleccionados.vacuno.length)}>
// //               ({cortesSeleccionados.vacuno.length})
// //             </span>
// //           </span>
// //           <span className="text-2xl">{vacunoAbierto ? "−" : "+"}</span>
// //         </button>

// //         {vacunoAbierto &&
// //           renderBloqueCortes(
// //             "vacuno",
// //             "Cortes de vacuno",
// //             "text-red-300",
// //             vacunoFiltrado
// //           )}

// //         <button
// //           onClick={() => toggleTipoCarne("cerdo")}
// //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// //         >
// //           <span>
// //             Cerdo{" "}
// //             <span className={colorContador(cortesSeleccionados.cerdo.length)}>
// //               ({cortesSeleccionados.cerdo.length})
// //             </span>
// //           </span>
// //           <span className="text-2xl">{cerdoAbierto ? "−" : "+"}</span>
// //         </button>

// //         {cerdoAbierto &&
// //           renderBloqueCortes(
// //             "cerdo",
// //             "Cortes de cerdo",
// //             "text-orange-300",
// //             cerdoFiltrado
// //           )}

// //         <button
// //           onClick={() => toggleTipoCarne("pollo")}
// //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// //         >
// //           <span>
// //             Pollo{" "}
// //             <span className={colorContador(cortesSeleccionados.pollo.length)}>
// //               ({cortesSeleccionados.pollo.length})
// //             </span>
// //           </span>
// //           <span className="text-2xl">{polloAbierto ? "−" : "+"}</span>
// //         </button>

// //         {polloAbierto &&
// //           renderBloqueCortes(
// //             "pollo",
// //             "Cortes de pollo",
// //             "text-yellow-300",
// //             polloFiltrado
// //           )}

// //         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
// //           <p className="font-semibold text-white">Cortes seleccionados:</p>

// //           <p className="mt-2 text-zinc-300">
// //             Vacuno:{" "}
// //             {cortesSeleccionados.vacuno.length > 0
// //               ? cortesSeleccionados.vacuno.join(", ")
// //               : "Ninguno"}
// //           </p>

// //           <p className="text-zinc-300">
// //             Cerdo:{" "}
// //             {cortesSeleccionados.cerdo.length > 0
// //               ? cortesSeleccionados.cerdo.join(", ")
// //               : "Ninguno"}
// //           </p>

// //           <p className="text-zinc-300">
// //             Pollo:{" "}
// //             {cortesSeleccionados.pollo.length > 0
// //               ? cortesSeleccionados.pollo.join(", ")
// //               : "Ninguno"}
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// // // "use client";

// // // import { useMemo, useState } from "react";
// // // import { carnes } from "../lib/datos";
// // // import type { CortesSeleccionadosState } from "../app/page";

// // // interface Props {
// // //   cortesSeleccionados: CortesSeleccionadosState;
// // //   setCortesSeleccionados: React.Dispatch<
// // //     React.SetStateAction<CortesSeleccionadosState>
// // //   >;
// // // }

// // // export default function SelectorCarnes({
// // //   cortesSeleccionados,
// // //   setCortesSeleccionados,
// // // }: Props) {
// // //   const [vacuno, setVacuno] = useState(false);
// // //   const [cerdo, setCerdo] = useState(false);
// // //   const [pollo, setPollo] = useState(false);
// // //   const [busqueda, setBusqueda] = useState("");

// // //   const toggleCorte = (
// // //     tipo: keyof CortesSeleccionadosState,
// // //     corte: string
// // //   ) => {
// // //     const actuales = cortesSeleccionados[tipo];

// // //     const nuevos = actuales.includes(corte)
// // //       ? actuales.filter((item) => item !== corte)
// // //       : [...actuales, corte];

// // //     setCortesSeleccionados({
// // //       ...cortesSeleccionados,
// // //       [tipo]: nuevos,
// // //     });
// // //   };
// // //   const toggleTipoCarne = (tipo: "vacuno" | "cerdo" | "pollo") => {
// // //     if (tipo === "vacuno") {
// // //       setVacuno(!vacuno);
// // //     }

// // //     if (tipo === "cerdo") {
// // //       setCerdo(!cerdo);
// // //     }

// // //     if (tipo === "pollo") {
// // //       setPollo(!pollo);
// // //     }
// // //   };
// // //   // const toggleTipoCarne = (tipo: "vacuno" | "cerdo" | "pollo") => {
// // //   //   if (tipo === "vacuno") {
// // //   //     const nuevoValor = !vacuno;
// // //   //     setVacuno(nuevoValor);

// // //   //     if (!nuevoValor) {
// // //   //       setCortesSeleccionados({
// // //   //         ...cortesSeleccionados,
// // //   //         vacuno: [],
// // //   //       });
// // //   //     }
// // //   //   }

// // //   //   if (tipo === "cerdo") {
// // //   //     const nuevoValor = !cerdo;
// // //   //     setCerdo(nuevoValor);

// // //   //     if (!nuevoValor) {
// // //   //       setCortesSeleccionados({
// // //   //         ...cortesSeleccionados,
// // //   //         cerdo: [],
// // //   //       });
// // //   //     }
// // //   //   }

// // //   //   if (tipo === "pollo") {
// // //   //     const nuevoValor = !pollo;
// // //   //     setPollo(nuevoValor);

// // //   //     if (!nuevoValor) {
// // //   //       setCortesSeleccionados({
// // //   //         ...cortesSeleccionados,
// // //   //         pollo: [],
// // //   //       });
// // //   //     }
// // //   //   }
// // //   // };

// // //   const filtrarCortes = (lista: { nombre: string; precio: number }[]) => {
// // //     return [...lista]
// // //       .sort((a, b) => a.nombre.localeCompare(b.nombre))
// // //       .filter((corte) =>
// // //         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
// // //       );
// // //   };

// // //   const vacunoFiltrado = useMemo(() => filtrarCortes(carnes.vacuno), [busqueda]);
// // //   const cerdoFiltrado = useMemo(() => filtrarCortes(carnes.cerdo), [busqueda]);
// // //   const polloFiltrado = useMemo(() => filtrarCortes(carnes.pollo), [busqueda]);

// // //   const renderBloqueCortes = (
// // //     tipo: keyof CortesSeleccionadosState,
// // //     titulo: string,
// // //     colorTitulo: string,
// // //     lista: { nombre: string; precio: number }[]
// // //   ) => {
// // //     if (lista.length === 0) {
// // //       return (
// // //         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //           <p className={`mb-2 font-semibold ${colorTitulo}`}>{titulo}</p>
// // //           <p className="text-sm text-zinc-400">
// // //             No hay cortes que coincidan con la búsqueda.
// // //           </p>
// // //         </div>
// // //       );
// // //     }

// // //     return (
// // //       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //         <p className={`mb-4 font-semibold ${colorTitulo}`}>{titulo}</p>

// // //         <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
// // //           {lista.map((corte) => (
// // //             <label
// // //               key={corte.nombre}
// // //               className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
// // //             >
// // //               <input
// // //                 type="checkbox"
// // //                 checked={cortesSeleccionados[tipo].includes(corte.nombre)}
// // //                 onChange={() => toggleCorte(tipo, corte.nombre)}
// // //                 className="mt-1"
// // //               />

// // //               <div>
// // //                 <p className="font-medium text-white">{corte.nombre}</p>
// // //                 <p className="text-zinc-400">
// // //                   ${corte.precio.toLocaleString()}/kg
// // //                 </p>
// // //               </div>
// // //             </label>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// // //       <div className="mb-6">
// // //         <input
// // //           type="text"
// // //           placeholder="Buscar corte..."
// // //           value={busqueda}
// // //           onChange={(e) => setBusqueda(e.target.value)}
// // //           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
// // //         />
// // //       </div>

// // //       <div className="space-y-4 text-white">
// // //         <button
// // //           onClick={() => toggleTipoCarne("vacuno")}
// // //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// // //         >
// // //           <span>Vacuno ({cortesSeleccionados.vacuno.length})</span>
// // //           <span className="text-2xl">{vacuno ? "−" : "+"}</span>
// // //         </button>
// // //         {vacuno &&
// // //           renderBloqueCortes(
// // //             "vacuno",
// // //             "Cortes de vacuno",
// // //             "text-red-300",
// // //             vacunoFiltrado
// // //           )}

// // //         <button
// // //           onClick={() => toggleTipoCarne("cerdo")}
// // //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// // //         >
// // //           <span>Cerdo ({cortesSeleccionados.cerdo.length})</span>
// // //           <span className="text-2xl">{cerdo ? "−" : "+"}</span>
// // //         </button>
// // //         {cerdo &&
// // //           renderBloqueCortes(
// // //             "cerdo",
// // //             "Cortes de cerdo",
// // //             "text-orange-300",
// // //             cerdoFiltrado
// // //           )}

// // //         <button
// // //           onClick={() => toggleTipoCarne("pollo")}
// // //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// // //         >
// // //           <span>Pollo ({cortesSeleccionados.pollo.length})</span>
// // //           <span className="text-2xl">{pollo ? "−" : "+"}</span>
// // //         </button>



// // //         {pollo &&
// // //           renderBloqueCortes(
// // //             "pollo",
// // //             "Cortes de pollo",
// // //             "text-yellow-300",
// // //             polloFiltrado
// // //           )}

// // //         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
// // //           <p className="font-semibold text-white">Cortes seleccionados:</p>

// // //           <p className="mt-2 text-zinc-300">
// // //             Vacuno:{" "}
// // //             {cortesSeleccionados.vacuno.length > 0
// // //               ? cortesSeleccionados.vacuno.join(", ")
// // //               : "Ninguno"}
// // //           </p>

// // //           <p className="text-zinc-300">
// // //             Cerdo:{" "}
// // //             {cortesSeleccionados.cerdo.length > 0
// // //               ? cortesSeleccionados.cerdo.join(", ")
// // //               : "Ninguno"}
// // //           </p>

// // //           <p className="text-zinc-300">
// // //             Pollo:{" "}
// // //             {cortesSeleccionados.pollo.length > 0
// // //               ? cortesSeleccionados.pollo.join(", ")
// // //               : "Ninguno"}
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }
