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
// "use client";

// import { useMemo, useState } from "react";
// import { carnes } from "../lib/datos";
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
//   const [vacuno, setVacuno] = useState(false);
//   const [cerdo, setCerdo] = useState(false);
//   const [pollo, setPollo] = useState(false);
//   const [busqueda, setBusqueda] = useState("");

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
//     if (tipo === "vacuno") {
//       const nuevoValor = !vacuno;
//       setVacuno(nuevoValor);

//       if (!nuevoValor) {
//         setCortesSeleccionados({
//           ...cortesSeleccionados,
//           vacuno: [],
//         });
//       }
//     }

//     if (tipo === "cerdo") {
//       const nuevoValor = !cerdo;
//       setCerdo(nuevoValor);

//       if (!nuevoValor) {
//         setCortesSeleccionados({
//           ...cortesSeleccionados,
//           cerdo: [],
//         });
//       }
//     }

//     if (tipo === "pollo") {
//       const nuevoValor = !pollo;
//       setPollo(nuevoValor);

//       if (!nuevoValor) {
//         setCortesSeleccionados({
//           ...cortesSeleccionados,
//           pollo: [],
//         });
//       }
//     }
//   };

//   const filtrarCortes = (lista: { nombre: string; precio: number }[]) => {
//     return [...lista]
//       .sort((a, b) => a.nombre.localeCompare(b.nombre))
//       .filter((corte) =>
//         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
//       );
//   };

//   const vacunoFiltrado = useMemo(() => filtrarCortes(carnes.vacuno), [busqueda]);
//   const cerdoFiltrado = useMemo(() => filtrarCortes(carnes.cerdo), [busqueda]);
//   const polloFiltrado = useMemo(() => filtrarCortes(carnes.pollo), [busqueda]);

//   const renderBloqueCortes = (
//     tipo: keyof CortesSeleccionadosState,
//     titulo: string,
//     colorTitulo: string,
//     lista: { nombre: string; precio: number }[]
//   ) => {
//     if (lista.length === 0) {
//       return (
//         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//           <p className={`mb-2 font-semibold ${colorTitulo}`}>{titulo}</p>
//           <p className="text-sm text-zinc-400">
//             No hay cortes que coincidan con la búsqueda.
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//         <p className={`mb-4 font-semibold ${colorTitulo}`}>{titulo}</p>

//         <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//           {lista.map((corte) => (
//             <label
//               key={corte.nombre}
//               className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={cortesSeleccionados[tipo].includes(corte.nombre)}
//                 onChange={() => toggleCorte(tipo, corte.nombre)}
//                 className="mt-1"
//               />

//               <div>
//                 <p className="font-medium text-white">{corte.nombre}</p>
//                 <p className="text-zinc-400">
//                   ${corte.precio.toLocaleString()}/kg
//                 </p>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Buscar corte..."
//           value={busqueda}
//           onChange={(e) => setBusqueda(e.target.value)}
//           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
//         />
//       </div>

//       <div className="space-y-4 text-white">
//         <label className="flex items-center gap-3 text-lg font-medium">
//           <input
//             type="checkbox"
//             checked={vacuno}
//             onChange={() => toggleTipoCarne("vacuno")}
//           />
//           Vacuno
//         </label>

//         {vacuno &&
//           renderBloqueCortes(
//             "vacuno",
//             "Cortes de vacuno",
//             "text-red-300",
//             vacunoFiltrado
//           )}

//         <label className="flex items-center gap-3 text-lg font-medium">
//           <input
//             type="checkbox"
//             checked={cerdo}
//             onChange={() => toggleTipoCarne("cerdo")}
//           />
//           Cerdo
//         </label>

//         {cerdo &&
//           renderBloqueCortes(
//             "cerdo",
//             "Cortes de cerdo",
//             "text-orange-300",
//             cerdoFiltrado
//           )}

//         <label className="flex items-center gap-3 text-lg font-medium">
//           <input
//             type="checkbox"
//             checked={pollo}
//             onChange={() => toggleTipoCarne("pollo")}
//           />
//           Pollo
//         </label>

//         {pollo &&
//           renderBloqueCortes(
//             "pollo",
//             "Cortes de pollo",
//             "text-yellow-300",
//             polloFiltrado
//           )}

//         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
//           <p className="font-semibold text-white">Cortes seleccionados:</p>

//           <p className="mt-2 text-zinc-300">
//             Vacuno:{" "}
//             {cortesSeleccionados.vacuno.length > 0
//               ? cortesSeleccionados.vacuno.join(", ")
//               : "Ninguno"}
//           </p>

//           <p className="text-zinc-300">
//             Cerdo:{" "}
//             {cortesSeleccionados.cerdo.length > 0
//               ? cortesSeleccionados.cerdo.join(", ")
//               : "Ninguno"}
//           </p>

//           <p className="text-zinc-300">
//             Pollo:{" "}
//             {cortesSeleccionados.pollo.length > 0
//               ? cortesSeleccionados.pollo.join(", ")
//               : "Ninguno"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
// // "use client";

// // import { useState } from "react";
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
// //   const [vacuno, setVacuno] = useState(false);
// //   const [cerdo, setCerdo] = useState(false);
// //   const [pollo, setPollo] = useState(false);

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
// //       const nuevoValor = !vacuno;
// //       setVacuno(nuevoValor);

// //       if (!nuevoValor) {
// //         setCortesSeleccionados({
// //           ...cortesSeleccionados,
// //           vacuno: [],
// //         });
// //       }
// //     }

// //     if (tipo === "cerdo") {
// //       const nuevoValor = !cerdo;
// //       setCerdo(nuevoValor);

// //       if (!nuevoValor) {
// //         setCortesSeleccionados({
// //           ...cortesSeleccionados,
// //           cerdo: [],
// //         });
// //       }
// //     }

// //     if (tipo === "pollo") {
// //       const nuevoValor = !pollo;
// //       setPollo(nuevoValor);

// //       if (!nuevoValor) {
// //         setCortesSeleccionados({
// //           ...cortesSeleccionados,
// //           pollo: [],
// //         });
// //       }
// //     }
// //   };

// //   return (
// //     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// //       <div className="space-y-4 text-white">
// //         <label className="flex items-center gap-3">
// //           <input
// //             type="checkbox"
// //             checked={vacuno}
// //             onChange={() => toggleTipoCarne("vacuno")}
// //           />
// //           Vacuno
// //         </label>

// //         {vacuno && (
// //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //             <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
// //             <div className="space-y-2">
// //               {carnes.vacuno.map((corte) => (
// //                 <label
// //                   key={corte.nombre}
// //                   className="flex items-center gap-3 text-sm"
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     checked={cortesSeleccionados.vacuno.includes(corte.nombre)}
// //                     onChange={() => toggleCorte("vacuno", corte.nombre)}
// //                   />
// //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// //                 </label>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         <label className="flex items-center gap-3">
// //           <input
// //             type="checkbox"
// //             checked={cerdo}
// //             onChange={() => toggleTipoCarne("cerdo")}
// //           />
// //           Cerdo
// //         </label>

// //         {cerdo && (
// //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //             <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
// //             <div className="space-y-2">
// //               {carnes.cerdo.map((corte) => (
// //                 <label
// //                   key={corte.nombre}
// //                   className="flex items-center gap-3 text-sm"
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     checked={cortesSeleccionados.cerdo.includes(corte.nombre)}
// //                     onChange={() => toggleCorte("cerdo", corte.nombre)}
// //                   />
// //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// //                 </label>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         <label className="flex items-center gap-3">
// //           <input
// //             type="checkbox"
// //             checked={pollo}
// //             onChange={() => toggleTipoCarne("pollo")}
// //           />
// //           Pollo
// //         </label>

// //         {pollo && (
// //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //             <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
// //             <div className="space-y-2">
// //               {carnes.pollo.map((corte) => (
// //                 <label
// //                   key={corte.nombre}
// //                   className="flex items-center gap-3 text-sm"
// //                 >
// //                   <input
// //                     type="checkbox"
// //                     checked={cortesSeleccionados.pollo.includes(corte.nombre)}
// //                     onChange={() => toggleCorte("pollo", corte.nombre)}
// //                   />
// //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// //                 </label>
// //               ))}
// //             </div>
// //           </div>
// //         )}

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

// // // import { useState } from "react";
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
// // //       const nuevoValor = !vacuno;
// // //       setVacuno(nuevoValor);

// // //       if (!nuevoValor) {
// // //         setCortesSeleccionados({
// // //           ...cortesSeleccionados,
// // //           vacuno: [],
// // //         });
// // //       }
// // //     }

// // //     if (tipo === "cerdo") {
// // //       const nuevoValor = !cerdo;
// // //       setCerdo(nuevoValor);

// // //       if (!nuevoValor) {
// // //         setCortesSeleccionados({
// // //           ...cortesSeleccionados,
// // //           cerdo: [],
// // //         });
// // //       }
// // //     }

// // //     if (tipo === "pollo") {
// // //       const nuevoValor = !pollo;
// // //       setPollo(nuevoValor);

// // //       if (!nuevoValor) {
// // //         setCortesSeleccionados({
// // //           ...cortesSeleccionados,
// // //           pollo: [],
// // //         });
// // //       }
// // //     }
// // //   };

// // //   const calcularPrecioPromedio = (): number => {
// // //     const todosLosCortes = [
// // //       ...carnes.vacuno,
// // //       ...carnes.cerdo,
// // //       ...carnes.pollo,
// // //     ];

// // //     const seleccionados = [
// // //       ...cortesSeleccionados.vacuno,
// // //       ...cortesSeleccionados.cerdo,
// // //       ...cortesSeleccionados.pollo,
// // //     ];

// // //     const cortesFiltrados = todosLosCortes.filter((corte) =>
// // //       seleccionados.includes(corte.nombre)
// // //     );

// // //     if (cortesFiltrados.length === 0) return 0;

// // //     const suma = cortesFiltrados.reduce((acc, corte) => acc + corte.precio, 0);
// // //     return suma / cortesFiltrados.length;
// // //   };

// // //   const precioPromedio = calcularPrecioPromedio();

// // //   return (
// // //     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// // //       <div className="space-y-4 text-white">
// // //         <label className="flex items-center gap-3">
// // //           <input
// // //             type="checkbox"
// // //             checked={vacuno}
// // //             onChange={() => toggleTipoCarne("vacuno")}
// // //           />
// // //           Vacuno
// // //         </label>

// // //         {vacuno && (
// // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //             <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
// // //             <div className="space-y-2">
// // //               {carnes.vacuno.map((corte) => (
// // //                 <label
// // //                   key={corte.nombre}
// // //                   className="flex items-center gap-3 text-sm"
// // //                 >
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={cortesSeleccionados.vacuno.includes(corte.nombre)}
// // //                     onChange={() => toggleCorte("vacuno", corte.nombre)}
// // //                   />
// // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // //                 </label>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <label className="flex items-center gap-3">
// // //           <input
// // //             type="checkbox"
// // //             checked={cerdo}
// // //             onChange={() => toggleTipoCarne("cerdo")}
// // //           />
// // //           Cerdo
// // //         </label>

// // //         {cerdo && (
// // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //             <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
// // //             <div className="space-y-2">
// // //               {carnes.cerdo.map((corte) => (
// // //                 <label
// // //                   key={corte.nombre}
// // //                   className="flex items-center gap-3 text-sm"
// // //                 >
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={cortesSeleccionados.cerdo.includes(corte.nombre)}
// // //                     onChange={() => toggleCorte("cerdo", corte.nombre)}
// // //                   />
// // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // //                 </label>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         <label className="flex items-center gap-3">
// // //           <input
// // //             type="checkbox"
// // //             checked={pollo}
// // //             onChange={() => toggleTipoCarne("pollo")}
// // //           />
// // //           Pollo
// // //         </label>

// // //         {pollo && (
// // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //             <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
// // //             <div className="space-y-2">
// // //               {carnes.pollo.map((corte) => (
// // //                 <label
// // //                   key={corte.nombre}
// // //                   className="flex items-center gap-3 text-sm"
// // //                 >
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={cortesSeleccionados.pollo.includes(corte.nombre)}
// // //                     onChange={() => toggleCorte("pollo", corte.nombre)}
// // //                   />
// // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // //                 </label>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

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

// // //         <p className="mt-4 font-semibold text-green-400">
// // //           Precio promedio: ${precioPromedio.toLocaleString()}/kg
// // //         </p>
// // //       </div>
// // //     </section>
// // //   );
// // // }
// // // // "use client";

// // // // import { useState } from "react";
// // // // import { carnes } from "../lib/datos";

// // // // interface Props {
// // // //   cortesSeleccionados: any;
// // // //   setCortesSeleccionados: React.Dispatch<React.SetStateAction<any>>;
// // // // }

// // // // export default function SelectorCarnes({
// // // //   cortesSeleccionados,
// // // //   setCortesSeleccionados,
// // // // }: Props) {
// // // //   const [vacuno, setVacuno] = useState(false);
// // // //   const [cerdo, setCerdo] = useState(false);
// // // //   const [pollo, setPollo] = useState(false);


// // // //   const toggleCorte = (
// // // //     corte: string,
// // // //     cortesSeleccionados: string[],
// // // //     setCortes: React.Dispatch<React.SetStateAction<string[]>>
// // // //   ) => {
// // // //     if (cortesSeleccionados.includes(corte)) {
// // // //       setCortes(cortesSeleccionados.filter((item) => item !== corte));
// // // //     } else {
// // // //       setCortes([...cortesSeleccionados, corte]);
// // // //     }
// // // //   };

// // // //   const toggleCarnes = (tipo: string) => {
// // // //     if (tipo === "vacuno") {
// // // //       setVacuno(!vacuno);
// // // //       if (!vacuno) setCortesSeleccionados({ ...cortesSeleccionados, vacuno: [] });
// // // //     }
// // // //     if (tipo === "cerdo") {
// // // //       setCerdo(!cerdo);
// // // //       if (!cerdo) setCortesSeleccionados({ ...cortesSeleccionados, cerdo: [] });
// // // //     }
// // // //     if (tipo === "pollo") {
// // // //       setPollo(!pollo);
// // // //       if (!pollo) setCortesSeleccionados({ ...cortesSeleccionados, pollo: [] });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // // //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// // // //       <div className="space-y-4 text-white">
// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={vacuno}
// // // //             onChange={() => toggleCarnes("vacuno")}
// // // //           />
// // // //           Vacuno
// // // //         </label>

// // // //         {vacuno && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.vacuno.map((corte) => (
// // // //                 <label key={corte.nombre} className="flex items-center gap-3 text-sm">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesSeleccionados.vacuno?.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesSeleccionados.vacuno, (newSelection) => setCortesSeleccionados({ ...cortesSeleccionados, vacuno: newSelection }))
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={cerdo}
// // // //             onChange={() => toggleCarnes("cerdo")}
// // // //           />
// // // //           Cerdo
// // // //         </label>

// // // //         {cerdo && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.cerdo.map((corte) => (
// // // //                 <label key={corte.nombre} className="flex items-center gap-3 text-sm">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesSeleccionados.cerdo?.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesSeleccionados.cerdo, (newSelection) => setCortesSeleccionados({ ...cortesSeleccionados, cerdo: newSelection }))
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={pollo}
// // // //             onChange={() => toggleCarnes("pollo")}
// // // //           />
// // // //           Pollo
// // // //         </label>

// // // //         {pollo && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.pollo.map((corte) => (
// // // //                 <label key={corte.nombre} className="flex items-center gap-3 text-sm">
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesSeleccionados.pollo?.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesSeleccionados.pollo, (newSelection) => setCortesSeleccionados({ ...cortesSeleccionados, pollo: newSelection }))
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
// // // //           <p className="font-semibold text-white">Cortes seleccionados:</p>
// // // //           <p className="mt-2 text-zinc-300">
// // // //             Vacuno: {cortesSeleccionados.vacuno?.length > 0 ? cortesSeleccionados.vacuno.join(", ") : "Ninguno"}
// // // //           </p>
// // // //           <p className="text-zinc-300">
// // // //             Cerdo: {cortesSeleccionados.cerdo?.length > 0 ? cortesSeleccionados.cerdo.join(", ") : "Ninguno"}
// // // //           </p>
// // // //           <p className="text-zinc-300">
// // // //             Pollo: {cortesSeleccionados.pollo?.length > 0 ? cortesSeleccionados.pollo.join(", ") : "Ninguno"}
// // // //           </p>
// // // //         </div>
// // // //         {/* <p className="mt-4 font-semibold text-green-400">
// // // //           { Precio promedio: ${calcularPrecioPromedio().toLocaleString()}/kg }
// // // //         </p> */}

// // // //         {<p className="mt-4 font-semibold text-green-400">
// // // //           Precio promedio: ${calcularPrecioPromedio().toLocaleString()}/kg
// // // //         </p>}
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // "use client";

// // // // import { useState } from "react";
// // // // import { carnes } from "../lib/datos";

// // // // export default function SelectorCarnes() {
// // // //   const [vacuno, setVacuno] = useState(false);
// // // //   const [cerdo, setCerdo] = useState(false);
// // // //   const [pollo, setPollo] = useState(false);

// // // //   const [cortesVacuno, setCortesVacuno] = useState<string[]>([]);
// // // //   const [cortesCerdo, setCortesCerdo] = useState<string[]>([]);
// // // //   const [cortesPollo, setCortesPollo] = useState<string[]>([]);

// // // //   const toggleCorte = (
// // // //     corte: string,
// // // //     cortesSeleccionados: string[],
// // // //     setCortes: React.Dispatch<React.SetStateAction<string[]>>
// // // //   ) => {
// // // //     if (cortesSeleccionados.includes(corte)) {
// // // //       setCortes(cortesSeleccionados.filter((item) => item !== corte));
// // // //     } else {
// // // //       setCortes([...cortesSeleccionados, corte]);
// // // //     }
// // // //   };

// // // //   const calcularPrecioPromedio = () => {
// // // //     const todosLosCortes = [
// // // //       ...carnes.vacuno,
// // // //       ...carnes.cerdo,
// // // //       ...carnes.pollo,
// // // //     ];

// // // //     const seleccionados = [
// // // //       ...cortesVacuno,
// // // //       ...cortesCerdo,
// // // //       ...cortesPollo,
// // // //     ];

// // // //     const cortesSeleccionados = todosLosCortes.filter((corte) =>
// // // //       seleccionados.includes(corte.nombre)
// // // //     );

// // // //     if (cortesSeleccionados.length === 0) return 0;

// // // //     const suma = cortesSeleccionados.reduce(
// // // //       (acc, corte) => acc + corte.precio,
// // // //       0
// // // //     );

// // // //     return suma / cortesSeleccionados.length;
// // // //   };

// // // //   const precioPromedio = calcularPrecioPromedio();

// // // //   return (
// // // //     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // // //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// // // //       <div className="space-y-4 text-white">
// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={vacuno}
// // // //             onChange={() => {
// // // //               const nuevoValor = !vacuno;
// // // //               setVacuno(nuevoValor);
// // // //               if (!nuevoValor) setCortesVacuno([]);
// // // //             }}
// // // //           />
// // // //           Vacuno
// // // //         </label>

// // // //         {vacuno && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.vacuno.map((corte) => (
// // // //                 <label
// // // //                   key={corte.nombre}
// // // //                   className="flex items-center gap-3 text-sm"
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesVacuno.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesVacuno, setCortesVacuno)
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={cerdo}
// // // //             onChange={() => {
// // // //               const nuevoValor = !cerdo;
// // // //               setCerdo(nuevoValor);
// // // //               if (!nuevoValor) setCortesCerdo([]);
// // // //             }}
// // // //           />
// // // //           Cerdo
// // // //         </label>

// // // //         {cerdo && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.cerdo.map((corte) => (
// // // //                 <label
// // // //                   key={corte.nombre}
// // // //                   className="flex items-center gap-3 text-sm"
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesCerdo.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesCerdo, setCortesCerdo)
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={pollo}
// // // //             onChange={() => {
// // // //               const nuevoValor = !pollo;
// // // //               setPollo(nuevoValor);
// // // //               if (!nuevoValor) setCortesPollo([]);
// // // //             }}
// // // //           />
// // // //           Pollo
// // // //         </label>

// // // //         {pollo && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.pollo.map((corte) => (
// // // //                 <label
// // // //                   key={corte.nombre}
// // // //                   className="flex items-center gap-3 text-sm"
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesPollo.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesPollo, setCortesPollo)
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
// // // //           <p className="font-semibold text-white">Cortes seleccionados:</p>
// // // //           <p className="mt-2 text-zinc-300">
// // // //             Vacuno: {cortesVacuno.length > 0 ? cortesVacuno.join(", ") : "Ninguno"}
// // // //           </p>
// // // //           <p className="text-zinc-300">
// // // //             Cerdo: {cortesCerdo.length > 0 ? cortesCerdo.join(", ") : "Ninguno"}
// // // //           </p>
// // // //           <p className="text-zinc-300">
// // // //             Pollo: {cortesPollo.length > 0 ? cortesPollo.join(", ") : "Ninguno"}
// // // //           </p>
// // // //         </div>

// // // //         <p className="mt-4 font-semibold text-green-400">
// // // //           Precio promedio: ${precioPromedio.toLocaleString()}/kg
// // // //         </p>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }
// // // // "use client";

// // // // import { useState } from "react";
// // // // import { carnes } from "../lib/datos";

// // // // export default function SelectorCarnes() {
// // // //   const [vacuno, setVacuno] = useState(false);
// // // //   const [cerdo, setCerdo] = useState(false);
// // // //   const [pollo, setPollo] = useState(false);

// // // //   const [cortesVacuno, setCortesVacuno] = useState<string[]>([]);
// // // //   const [cortesCerdo, setCortesCerdo] = useState<string[]>([]);
// // // //   const [cortesPollo, setCortesPollo] = useState<string[]>([]);



// // // //   const toggleCorte = (
// // // //     corte: string,
// // // //     cortesSeleccionados: string[],
// // // //     setCortes: React.Dispatch<React.SetStateAction<string[]>>
// // // //   ) => {
// // // //     if (cortesSeleccionados.includes(corte)) {
// // // //       setCortes(cortesSeleccionados.filter((item) => item !== corte));
// // // //     } else {
// // // //       setCortes([...cortesSeleccionados, corte]);
// // // //     }
// // // //   };


// // // //   const calcularPrecioPromedio = () => {
// // // //     const todosLosCortes = [
// // // //       ...carnes.vacuno,
// // // //       ...carnes.cerdo,
// // // //       ...carnes.pollo,
// // // //     ];

// // // //     const seleccionados = [
// // // //       ...cortesVacuno,
// // // //       ...cortesCerdo,
// // // //       ...cortesPollo,
// // // //     ];

// // // //     const cortesSeleccionados = todosLosCortes.filter((corte) =>
// // // //       seleccionados.includes(corte.nombre)
// // // //     );

// // // //     if (cortesSeleccionados.length === 0) return 0;

// // // //     const suma = cortesSeleccionados.reduce(
// // // //       (acc, corte) => acc + corte.precio,
// // // //       0
// // // //     );

// // // //     return suma / cortesSeleccionados.length;
// // // //   };
// // // //   const precioPromedio = calcularPrecioPromedio();

// // // //   return (
// // // //     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // // //       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

// // // //       <div className="space-y-4 text-white">
// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={vacuno}
// // // //             onChange={() => setVacuno(!vacuno)}
// // // //           />
// // // //           Vacuno
// // // //         </label>

// // // //         {vacuno && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.vacuno.map((corte) => (
// // // //                 <label
// // // //                   key={corte.nombre}
// // // //                   className="flex items-center gap-3 text-sm"
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesVacuno.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesVacuno, setCortesVacuno)
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={cerdo}
// // // //             onChange={() => setCerdo(!cerdo)}
// // // //           />
// // // //           Cerdo
// // // //         </label>

// // // //         {cerdo && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.cerdo.map((corte) => (
// // // //                 <label
// // // //                   key={corte.nombre}
// // // //                   className="flex items-center gap-3 text-sm"
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesCerdo.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesCerdo, setCortesCerdo)
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <label className="flex items-center gap-3">
// // // //           <input
// // // //             type="checkbox"
// // // //             checked={pollo}
// // // //             onChange={() => setPollo(!pollo)}
// // // //           />
// // // //           Pollo
// // // //         </label>

// // // //         {pollo && (
// // // //           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // // //             <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
// // // //             <div className="space-y-2">
// // // //               {carnes.pollo.map((corte) => (
// // // //                 <label
// // // //                   key={corte.nombre}
// // // //                   className="flex items-center gap-3 text-sm"
// // // //                 >
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     checked={cortesPollo.includes(corte.nombre)}
// // // //                     onChange={() =>
// // // //                       toggleCorte(corte.nombre, cortesPollo, setCortesPollo)
// // // //                     }
// // // //                   />
// // // //                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
// // // //                 </label>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
// // // //           <p className="font-semibold text-white">Cortes seleccionados:</p>
// // // //           <p className="mt-2 text-zinc-300">
// // // //             Vacuno: {cortesVacuno.length > 0 ? cortesVacuno.join(", ") : "Ninguno"}
// // // //           </p>
// // // //           <p className="text-zinc-300">
// // // //             Cerdo: {cortesCerdo.length > 0 ? cortesCerdo.join(", ") : "Ninguno"}
// // // //           </p>
// // // //           <p className="text-zinc-300">
// // // //             Pollo: {cortesPollo.length > 0 ? cortesPollo.join(", ") : "Ninguno"}
// // // //           </p>
// // // //         </div>
// // // //         <p className="mt-4 text-green-400 font-semibold">
// // // //           Precio promedio: ${precioPromedio.toLocaleString()}
// // // //         </p>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }
