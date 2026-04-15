"use client";

import { useMemo, useState } from "react";
import {
  carnes,
  type Corte,
  type CategoriaCorte,
} from "../lib/datos";
import type { CortesSeleccionadosState } from "../app/page";

type FiltroCategoria = "todos" | CategoriaCorte;

interface Props {
  cortesSeleccionados: CortesSeleccionadosState;
  setCortesSeleccionados: React.Dispatch<
    React.SetStateAction<CortesSeleccionadosState>
  >;
}

// 🔥 Definimos los presets
const presets = {
  economico: {
    vacuno: ["Sobrecostilla", "Huachalomo", "Asado del carnicero"],
    cerdo: ["Costillar", "Chuleta centro"],
    pollo: ["Trutro entero", "Trutro corto", "Alitas"],
  },
  mixto: {
    vacuno: ["Lomo liso", "Sobrecostilla", "Punta picana"],
    cerdo: ["Costillar", "Chuleta vetada"],
    pollo: ["Pechuga", "Trutro entero", "Alitas"],
  },
  premium: {
    vacuno: ["Lomo vetado", "Entraña", "Filete", "Punta picana"],
    cerdo: ["Costillar", "Malaya"],
    pollo: ["Pechuga deshuesada", "Alitas"],
  },
};

export default function SelectorCarnes({
  cortesSeleccionados,
  setCortesSeleccionados,
}: Props) {
  const [vacunoAbierto, setVacunoAbierto] = useState(false);
  const [cerdoAbierto, setCerdoAbierto] = useState(false);
  const [polloAbierto, setPolloAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [soloParrilla, setSoloParrilla] = useState(false);
  const [filtroCategoria, setFiltroCategoria] =
    useState<FiltroCategoria>("todos");

  // 👇 Función para alternar entre cortes seleccionados
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

  // 👇 Función para alternar los tipos de carne (vacuno, cerdo, pollo)
  const toggleTipoCarne = (tipo: "vacuno" | "cerdo" | "pollo") => {
    if (tipo === "vacuno") setVacunoAbierto(!vacunoAbierto);
    if (tipo === "cerdo") setCerdoAbierto(!cerdoAbierto);
    if (tipo === "pollo") setPolloAbierto(!polloAbierto);
  };

  // 👇 Limpiar tipo de carne
  const limpiarTipoCarne = (tipo: keyof CortesSeleccionadosState) => {
    setCortesSeleccionados({
      ...cortesSeleccionados,
      [tipo]: [],
    });
  };

  // 🔥 Aplicar preset de cortes
  const aplicarPreset = (tipo: keyof typeof presets) => {
    const seleccion = presets[tipo];

    setCortesSeleccionados({
      vacuno: seleccion.vacuno,
      cerdo: seleccion.cerdo,
      pollo: seleccion.pollo,
    });

    // 👇 Mejora UX: abrir todo automáticamente
    setVacunoAbierto(true);
    setCerdoAbierto(true);
    setPolloAbierto(true);
  };

  // 👇 Filtro de cortes según la categoría
  const filtrarCortes = (lista: Corte[]) => {
    return [...lista]
      .filter((corte) => (soloParrilla ? corte.parrilla : true))
      .filter((corte) =>
        filtroCategoria === "todos" ? true : corte.categoria === filtroCategoria
      )
      .filter((corte) =>
        corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  };

  // 👇 Filtrar cortes por cada tipo
  const vacunoFiltrado = useMemo(
    () => filtrarCortes(carnes.vacuno),
    [busqueda, soloParrilla, filtroCategoria]
  );

  const cerdoFiltrado = useMemo(
    () => filtrarCortes(carnes.cerdo),
    [busqueda, soloParrilla, filtroCategoria]
  );

  const polloFiltrado = useMemo(
    () => filtrarCortes(carnes.pollo),
    [busqueda, soloParrilla, filtroCategoria]
  );

  // 👇 Cambiar color del contador según si está vacío o no
  const colorContador = (cantidad: number) =>
    cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

  // 👇 Obtener badge según la categoría del corte
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

  // 👇 Renderizar los cortes de carne
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
          {lista.map((corte) => {
            const badgeCategoria = getCategoriaBadge(corte.categoria);

            return (
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

                <div className="space-y-1">
                  <p className="font-medium text-white">{corte.nombre}</p>
                  <p className="text-zinc-400">
                    ${corte.precio.toLocaleString()}/kg
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {corte.parrilla && (
                      <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-green-400">
                        🔥 Parrilla
                      </span>
                    )}

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${badgeCategoria.className}`}
                    >
                      {badgeCategoria.texto}
                    </span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      {/* LIMPIAR BOTÓN ARRIBA */}
      <div className="mb-6 space-y-2 text-white">
        <p className="font-semibold">Tipo de asado sugerido:</p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => aplicarPreset("economico")}
            className="rounded-lg bg-green-700 px-3 py-2 text-sm hover:bg-green-800"
          >
            💰 Económico
          </button>

          <button
            onClick={() => aplicarPreset("mixto")}
            className="rounded-lg bg-yellow-600 px-3 py-2 text-sm hover:bg-yellow-700"
          >
            ⚖️ Mixto
          </button>

          <button
            onClick={() => aplicarPreset("premium")}
            className="rounded-lg bg-red-700 px-3 py-2 text-sm hover:bg-red-800"
          >
            🥩 Premium
          </button>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar corte..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
        />
      </div>

      {/* FILTROS */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
          <input
            type="checkbox"
            checked={soloParrilla}
            onChange={() => setSoloParrilla(!soloParrilla)}
          />
          <span>Mostrar solo cortes de parrilla 🔥</span>
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
        {/* VACUNO */}
        <button
          onClick={() => toggleTipoCarne("vacuno")}
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
          renderBloqueCortes(
            "vacuno",
            "Cortes de vacuno",
            "text-red-300",
            vacunoFiltrado
          )}

        {/* CERDO */}
        <button
          onClick={() => toggleTipoCarne("cerdo")}
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
          renderBloqueCortes(
            "cerdo",
            "Cortes de cerdo",
            "text-orange-300",
            cerdoFiltrado
          )}

        {/* POLLO */}
        <button
          onClick={() => toggleTipoCarne("pollo")}
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
// import {
//   carnes,
//   type Corte,
//   type CategoriaCorte,
// } from "../lib/datos";
// import type { CortesSeleccionadosState } from "../app/page";

// interface Props {
//   cortesSeleccionados: CortesSeleccionadosState;
//   setCortesSeleccionados: React.Dispatch<
//     React.SetStateAction<CortesSeleccionadosState>
//   >;
// }

// type FiltroCategoria = "todos" | CategoriaCorte;

// export default function SelectorCarnes({
//   cortesSeleccionados,
//   setCortesSeleccionados,
// }: Props) {
//   const [vacunoAbierto, setVacunoAbierto] = useState(false);
//   const [cerdoAbierto, setCerdoAbierto] = useState(false);
//   const [polloAbierto, setPolloAbierto] = useState(false);
//   const [busqueda, setBusqueda] = useState("");
//   const [soloParrilla, setSoloParrilla] = useState(false);
//   const [filtroCategoria, setFiltroCategoria] =
//     useState<FiltroCategoria>("todos");

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

//   // 🔥 APLICAR PRESET
//   const aplicarPreset = (tipo: keyof typeof presets) => {
//     const seleccion = presets[tipo];

//     setCortesSeleccionados({
//       vacuno: seleccion.vacuno,
//       cerdo: seleccion.cerdo,
//       pollo: seleccion.pollo,
//     });

//     // 👇 mejora UX: abrir todo automáticamente
//     setVacunoAbierto(true);
//     setCerdoAbierto(true);
//     setPolloAbierto(true);
//   };

//   const filtrarCortes = (lista: Corte[]) => {
//     return [...lista]
//       .filter((corte) => (soloParrilla ? corte.parrilla : true))
//       .filter((corte) =>
//         filtroCategoria === "todos" ? true : corte.categoria === filtroCategoria
//       )
//       .filter((corte) =>
//         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
//       )
//       .sort((a, b) => a.nombre.localeCompare(b.nombre));
//   };

//   const vacunoFiltrado = useMemo(
//     () => filtrarCortes(carnes.vacuno),
//     [busqueda, soloParrilla, filtroCategoria]
//   );

//   const cerdoFiltrado = useMemo(
//     () => filtrarCortes(carnes.cerdo),
//     [busqueda, soloParrilla, filtroCategoria]
//   );

//   const polloFiltrado = useMemo(
//     () => filtrarCortes(carnes.pollo),
//     [busqueda, soloParrilla, filtroCategoria]
//   );

//   const colorContador = (cantidad: number) =>
//     cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

//   const getCategoriaBadge = (categoria: CategoriaCorte) => {
//     if (categoria === "economico") {
//       return {
//         texto: "💰 Económico",
//         className: "bg-green-900 text-green-300",
//       };
//     }

//     if (categoria === "mixto") {
//       return {
//         texto: "⚖️ Mixto",
//         className: "bg-yellow-900 text-yellow-300",
//       };
//     }

//     return {
//       texto: "🥩 Premium",
//       className: "bg-red-900 text-red-300",
//     };
//   };

//   const renderBloqueCortes = (
//     tipo: keyof CortesSeleccionadosState,
//     titulo: string,
//     colorTitulo: string,
//     lista: Corte[]
//   ) => {
//     if (lista.length === 0) {
//       return (
//         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//           <div className="mb-4 flex items-center justify-between">
//             <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

//             {cortesSeleccionados[tipo].length > 0 && (
//               <button
//                 onClick={() => limpiarTipoCarne(tipo)}
//                 className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
//               >
//                 Limpiar
//               </button>
//             )}
//           </div>

//           <p className="text-sm text-zinc-400">
//             No hay cortes que coincidan con el filtro actual.
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//         <div className="mb-4 flex items-center justify-between">
//           <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

//           {cortesSeleccionados[tipo].length > 0 && (
//             <button
//               onClick={() => limpiarTipoCarne(tipo)}
//               className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
//             >
//               Limpiar
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//           {lista.map((corte) => {
//             const badgeCategoria = getCategoriaBadge(corte.categoria);

//             return (
//               <label
//                 key={corte.nombre}
//                 className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
//               >
//                 <input
//                   type="checkbox"
//                   checked={cortesSeleccionados[tipo].includes(corte.nombre)}
//                   onChange={() => toggleCorte(tipo, corte.nombre)}
//                   className="mt-1"
//                 />

//                 <div className="space-y-1">
//                   <p className="font-medium text-white">{corte.nombre}</p>
//                   <p className="text-zinc-400">
//                     ${corte.precio.toLocaleString()}/kg
//                   </p>

//                   <div className="flex flex-wrap gap-2">
//                     {corte.parrilla && (
//                       <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-green-400">
//                         🔥 Parrilla
//                       </span>
//                     )}

//                     <span
//                       className={`rounded-full px-2 py-1 text-xs ${badgeCategoria.className}`}
//                     >
//                       {badgeCategoria.texto}
//                     </span>
//                   </div>
//                 </div>
//               </label>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       {/* LIMPIAR BOTÓN ARRIBA */}
//       <div className="mb-6 space-y-2 text-white">
//         <p className="font-semibold">Tipo de asado sugerido:</p>

//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={() => aplicarPreset("economico")}
//             className="rounded-lg bg-green-700 px-3 py-2 text-sm hover:bg-green-800"
//           >
//             💰 Económico
//           </button>

//           <button
//             onClick={() => aplicarPreset("mixto")}
//             className="rounded-lg bg-yellow-600 px-3 py-2 text-sm hover:bg-yellow-700"
//           >
//             ⚖️ Mixto
//           </button>

//           <button
//             onClick={() => aplicarPreset("premium")}
//             className="rounded-lg bg-red-700 px-3 py-2 text-sm hover:bg-red-800"
//           >
//             🥩 Premium
//           </button>
//         </div>
//       </div>

//       {/* BUSCADOR */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Buscar corte..."
//           value={busqueda}
//           onChange={(e) => setBusqueda(e.target.value)}
//           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
//         />
//       </div>

//       {/* FILTROS */}
//       <div className="mb-6 space-y-4">
//         <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
//           <input
//             type="checkbox"
//             checked={soloParrilla}
//             onChange={() => setSoloParrilla(!soloParrilla)}
//           />
//           <span>Mostrar solo cortes de parrilla 🔥</span>
//         </div>

//         <div className="rounded-xl bg-zinc-800 p-4 text-white">
//           <p className="mb-3 font-semibold">Filtrar por categoría</p>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setFiltroCategoria("todos")}
//               className={`rounded-lg px-3 py-2 text-sm ${
//                 filtroCategoria === "todos"
//                   ? "bg-zinc-600 text-white"
//                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
//               }`}
//             >
//               Todos
//             </button>

//             <button
//               onClick={() => setFiltroCategoria("economico")}
//               className={`rounded-lg px-3 py-2 text-sm ${
//                 filtroCategoria === "economico"
//                   ? "bg-green-700 text-white"
//                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
//               }`}
//             >
//               💰 Económicos
//             </button>

//             <button
//               onClick={() => setFiltroCategoria("mixto")}
//               className={`rounded-lg px-3 py-2 text-sm ${
//                 filtroCategoria === "mixto"
//                   ? "bg-yellow-600 text-white"
//                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
//               }`}
//             >
//               ⚖️ Mixtos
//             </button>

//             <button
//               onClick={() => setFiltroCategoria("premium")}
//               className={`rounded-lg px-3 py-2 text-sm ${
//                 filtroCategoria === "premium"
//                   ? "bg-red-700 text-white"
//                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
//               }`}
//             >
//               🥩 Premium
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-4 text-white">
//         {/* VACUNO */}
//         <button
//           onClick={() => toggleTipoCarne("vacuno")}
//           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
//         >
//           <span>
//             Vacuno{" "}
//             <span className={colorContador(cortesSeleccionados.vacuno.length)}>
//               ({cortesSeleccionados.vacuno.length})
//             </span>
//           </span>
//           <span className="text-2xl">{vacunoAbierto ? "−" : "+"}</span>
//         </button>

//         {vacunoAbierto &&
//           renderBloqueCortes(
//             "vacuno",
//             "Cortes de vacuno",
//             "text-red-300",
//             vacunoFiltrado
//           )}

//         {/* CERDO */}
//         <button
//           onClick={() => toggleTipoCarne("cerdo")}
//           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
//         >
//           <span>
//             Cerdo{" "}
//             <span className={colorContador(cortesSeleccionados.cerdo.length)}>
//               ({cortesSeleccionados.cerdo.length})
//             </span>
//           </span>
//           <span className="text-2xl">{cerdoAbierto ? "−" : "+"}</span>
//         </button>

//         {cerdoAbierto &&
//           renderBloqueCortes(
//             "cerdo",
//             "Cortes de cerdo",
//             "text-orange-300",
//             cerdoFiltrado
//           )}

//         {/* POLLO */}
//         <button
//           onClick={() => toggleTipoCarne("pollo")}
//           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
//         >
//           <span>
//             Pollo{" "}
//             <span className={colorContador(cortesSeleccionados.pollo.length)}>
//               ({cortesSeleccionados.pollo.length})
//             </span>
//           </span>
//           <span className="text-2xl">{polloAbierto ? "−" : "+"}</span>
//         </button>

//         {polloAbierto &&
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

// // import { useMemo, useState } from "react";
// // import {
// //   carnes,
// //   type Corte,
// //   type CategoriaCorte,
// // } from "../lib/datos";
// // import type { CortesSeleccionadosState } from "../app/page";

// // interface Props {
// //   cortesSeleccionados: CortesSeleccionadosState;
// //   setCortesSeleccionados: React.Dispatch<
// //     React.SetStateAction<CortesSeleccionadosState>
// //   >;
// // }

// // type FiltroCategoria = "todos" | CategoriaCorte;

// // export default function SelectorCarnes({
// //   cortesSeleccionados,
// //   setCortesSeleccionados,
// // }: Props) {
// //   const [vacunoAbierto, setVacunoAbierto] = useState(false);
// //   const [cerdoAbierto, setCerdoAbierto] = useState(false);
// //   const [polloAbierto, setPolloAbierto] = useState(false);
// //   const [busqueda, setBusqueda] = useState("");
// //   const [soloParrilla, setSoloParrilla] = useState(false);
// //   const [filtroCategoria, setFiltroCategoria] =
// //     useState<FiltroCategoria>("todos");

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
// //     if (tipo === "vacuno") setVacunoAbierto(!vacunoAbierto);
// //     if (tipo === "cerdo") setCerdoAbierto(!cerdoAbierto);
// //     if (tipo === "pollo") setPolloAbierto(!polloAbierto);
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
// //         filtroCategoria === "todos" ? true : corte.categoria === filtroCategoria
// //       )
// //       .filter((corte) =>
// //         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
// //       )
// //       .sort((a, b) => a.nombre.localeCompare(b.nombre));
// //   };

// //   const vacunoFiltrado = useMemo(
// //     () => filtrarCortes(carnes.vacuno),
// //     [busqueda, soloParrilla, filtroCategoria]
// //   );

// //   const cerdoFiltrado = useMemo(
// //     () => filtrarCortes(carnes.cerdo),
// //     [busqueda, soloParrilla, filtroCategoria]
// //   );

// //   const polloFiltrado = useMemo(
// //     () => filtrarCortes(carnes.pollo),
// //     [busqueda, soloParrilla, filtroCategoria]
// //   );

// //   const colorContador = (cantidad: number) =>
// //     cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

// //   const getCategoriaBadge = (categoria: CategoriaCorte) => {
// //     if (categoria === "economico") {
// //       return {
// //         texto: "💰 Económico",
// //         className: "bg-green-900 text-green-300",
// //       };
// //     }

// //     if (categoria === "mixto") {
// //       return {
// //         texto: "⚖️ Mixto",
// //         className: "bg-yellow-900 text-yellow-300",
// //       };
// //     }

// //     return {
// //       texto: "🥩 Premium",
// //       className: "bg-red-900 text-red-300",
// //     };
// //   };

// //   const renderBloqueCortes = (
// //     tipo: keyof CortesSeleccionadosState,
// //     titulo: string,
// //     colorTitulo: string,
// //     lista: Corte[]
// //   ) => {
// //     if (lista.length === 0) {
// //       return (
// //         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //           <div className="mb-4 flex items-center justify-between">
// //             <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

// //             {cortesSeleccionados[tipo].length > 0 && (
// //               <button
// //                 onClick={() => limpiarTipoCarne(tipo)}
// //                 className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
// //               >
// //                 Limpiar
// //               </button>
// //             )}
// //           </div>

// //           <p className="text-sm text-zinc-400">
// //             No hay cortes que coincidan con el filtro actual.
// //           </p>
// //         </div>
// //       );
// //     }

// //     return (
// //       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //         <div className="mb-4 flex items-center justify-between">
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
// //           {lista.map((corte) => {
// //             const badgeCategoria = getCategoriaBadge(corte.categoria);

// //             return (
// //               <label
// //                 key={corte.nombre}
// //                 className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
// //               >
// //                 <input
// //                   type="checkbox"
// //                   checked={cortesSeleccionados[tipo].includes(corte.nombre)}
// //                   onChange={() => toggleCorte(tipo, corte.nombre)}
// //                   className="mt-1"
// //                 />

// //                 <div className="space-y-1">
// //                   <p className="font-medium text-white">{corte.nombre}</p>
// //                   <p className="text-zinc-400">
// //                     ${corte.precio.toLocaleString()}/kg
// //                   </p>

// //                   <div className="flex flex-wrap gap-2">
// //                     {corte.parrilla && (
// //                       <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-green-400">
// //                         🔥 Parrilla
// //                       </span>
// //                     )}

// //                     <span
// //                       className={`rounded-full px-2 py-1 text-xs ${badgeCategoria.className}`}
// //                     >
// //                       {badgeCategoria.texto}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </label>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// //       <h2 className="mb-6 text-2xl font-bold text-white">
// //         Tipo de carne
// //       </h2>

// //       {/* BUSCADOR */}
// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           placeholder="Buscar corte..."
// //           value={busqueda}
// //           onChange={(e) => setBusqueda(e.target.value)}
// //           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
// //         />
// //       </div>

// //       {/* FILTROS */}
// //       <div className="mb-6 space-y-4">
// //         <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
// //           <input
// //             type="checkbox"
// //             checked={soloParrilla}
// //             onChange={() => setSoloParrilla(!soloParrilla)}
// //           />
// //           <span>Mostrar solo cortes de parrilla 🔥</span>
// //         </div>

// //         <div className="rounded-xl bg-zinc-800 p-4 text-white">
// //           <p className="mb-3 font-semibold">Filtrar por categoría</p>

// //           <div className="flex flex-wrap gap-2">
// //             <button
// //               onClick={() => setFiltroCategoria("todos")}
// //               className={`rounded-lg px-3 py-2 text-sm ${
// //                 filtroCategoria === "todos"
// //                   ? "bg-zinc-600 text-white"
// //                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
// //               }`}
// //             >
// //               Todos
// //             </button>

// //             <button
// //               onClick={() => setFiltroCategoria("economico")}
// //               className={`rounded-lg px-3 py-2 text-sm ${
// //                 filtroCategoria === "economico"
// //                   ? "bg-green-700 text-white"
// //                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
// //               }`}
// //             >
// //               💰 Económicos
// //             </button>

// //             <button
// //               onClick={() => setFiltroCategoria("mixto")}
// //               className={`rounded-lg px-3 py-2 text-sm ${
// //                 filtroCategoria === "mixto"
// //                   ? "bg-yellow-600 text-white"
// //                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
// //               }`}
// //             >
// //               ⚖️ Mixtos
// //             </button>

// //             <button
// //               onClick={() => setFiltroCategoria("premium")}
// //               className={`rounded-lg px-3 py-2 text-sm ${
// //                 filtroCategoria === "premium"
// //                   ? "bg-red-700 text-white"
// //                   : "bg-zinc-900 text-zinc-300 hover:bg-zinc-700"
// //               }`}
// //             >
// //               🥩 Premium
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="space-y-4 text-white">
// //         {/* VACUNO */}
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

// //         {/* CERDO */}
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

// //         {/* POLLO */}
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
// // "use client";

// // import { useMemo, useState } from "react";
// // import { carnes, type Corte } from "../lib/datos";
// // import type { CortesSeleccionadosState } from "../app/page";

// // interface Props {
// //   cortesSeleccionados: CortesSeleccionadosState;
// //   setCortesSeleccionados: React.Dispatch<
// //     React.SetStateAction<CortesSeleccionadosState>
// //   >;
// // }

// // // 🔥 PRESETS
// // const presets = {
// //   economico: {
// //     vacuno: ["Sobrecostilla", "Huachalomo", "Asado del carnicero"],
// //     cerdo: ["Costillar", "Chuleta centro"],
// //     pollo: ["Trutro entero", "Trutro corto", "Alitas"],
// //   },
// //   mixto: {
// //     vacuno: ["Lomo liso", "Sobrecostilla", "Punta picana"],
// //     cerdo: ["Costillar", "Chuleta vetada"],
// //     pollo: ["Pechuga", "Trutro entero", "Alitas"],
// //   },
// //   premium: {
// //     vacuno: ["Lomo vetado", "Entraña", "Filete", "Punta picana"],
// //     cerdo: ["Costillar", "Malaya"],
// //     pollo: ["Pechuga deshuesada", "Alitas"],
// //   },
// // };

// // export default function SelectorCarnes({
// //   cortesSeleccionados,
// //   setCortesSeleccionados,
// // }: Props) {
// //   const [vacunoAbierto, setVacunoAbierto] = useState(false);
// //   const [cerdoAbierto, setCerdoAbierto] = useState(false);
// //   const [polloAbierto, setPolloAbierto] = useState(false);
// //   const [busqueda, setBusqueda] = useState("");
// //   const [soloParrilla, setSoloParrilla] = useState(false);

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
// //     if (tipo === "vacuno") setVacunoAbierto(!vacunoAbierto);
// //     if (tipo === "cerdo") setCerdoAbierto(!cerdoAbierto);
// //     if (tipo === "pollo") setPolloAbierto(!polloAbierto);
// //   };

// //   const limpiarTipoCarne = (tipo: keyof CortesSeleccionadosState) => {
// //     setCortesSeleccionados({
// //       ...cortesSeleccionados,
// //       [tipo]: [],
// //     });
// //   };

// //   // 🔥 APLICAR PRESET
// //   const aplicarPreset = (tipo: keyof typeof presets) => {
// //     const seleccion = presets[tipo];

// //     setCortesSeleccionados({
// //       vacuno: seleccion.vacuno,
// //       cerdo: seleccion.cerdo,
// //       pollo: seleccion.pollo,
// //     });

// //     // 👇 mejora UX: abrir todo automáticamente
// //     setVacunoAbierto(true);
// //     setCerdoAbierto(true);
// //     setPolloAbierto(true);
// //   };

// //   const filtrarCortes = (lista: Corte[]) => {
// //     return [...lista]
// //       .filter((corte) => (soloParrilla ? corte.parrilla : true))
// //       .filter((corte) =>
// //         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
// //       )
// //       .sort((a, b) => a.nombre.localeCompare(b.nombre));
// //   };

// //   const vacunoFiltrado = useMemo(
// //     () => filtrarCortes(carnes.vacuno),
// //     [busqueda, soloParrilla]
// //   );

// //   const cerdoFiltrado = useMemo(
// //     () => filtrarCortes(carnes.cerdo),
// //     [busqueda, soloParrilla]
// //   );

// //   const polloFiltrado = useMemo(
// //     () => filtrarCortes(carnes.pollo),
// //     [busqueda, soloParrilla]
// //   );

// //   const colorContador = (cantidad: number) =>
// //     cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

// //   const renderBloqueCortes = (
// //     tipo: keyof CortesSeleccionadosState,
// //     titulo: string,
// //     colorTitulo: string,
// //     lista: Corte[]
// //   ) => {
// //     return (
// //       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //         <div className="mb-4 flex items-center justify-between">
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

// //                 {corte.parrilla && (
// //                   <span className="text-xs text-green-400">
// //                     🔥 Parrilla
// //                   </span>
// //                 )}
// //               </div>
// //             </label>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// //       <h2 className="mb-6 text-2xl font-bold text-white">
// //         Tipo de carne
// //       </h2>

// //       {/* 🔥 PRESETS */}
// //       <div className="mb-6 space-y-2 text-white">
// //         <p className="font-semibold">Tipo de asado sugerido:</p>

// //         <div className="flex flex-wrap gap-2">
// //           <button
// //             onClick={() => aplicarPreset("economico")}
// //             className="rounded-lg bg-green-700 px-3 py-2 text-sm hover:bg-green-800"
// //           >
// //             💰 Económico
// //           </button>

// //           <button
// //             onClick={() => aplicarPreset("mixto")}
// //             className="rounded-lg bg-yellow-600 px-3 py-2 text-sm hover:bg-yellow-700"
// //           >
// //             ⚖️ Mixto
// //           </button>

// //           <button
// //             onClick={() => aplicarPreset("premium")}
// //             className="rounded-lg bg-red-700 px-3 py-2 text-sm hover:bg-red-800"
// //           >
// //             🥩 Premium
// //           </button>
// //         </div>
// //       </div>

// //       {/* 🔍 BUSCADOR */}
// //       <input
// //         type="text"
// //         placeholder="Buscar corte..."
// //         value={busqueda}
// //         onChange={(e) => setBusqueda(e.target.value)}
// //         className="mb-4 w-full rounded-xl bg-zinc-800 px-4 py-3 text-white"
// //       />

// //       {/* 🔥 FILTRO PARRILLA */}
// //       <div className="mb-6 flex items-center gap-3 text-white">
// //         <input
// //           type="checkbox"
// //           checked={soloParrilla}
// //           onChange={() => setSoloParrilla(!soloParrilla)}
// //         />
// //         <span>Mostrar solo cortes de parrilla 🔥</span>
// //       </div>

// //       <div className="space-y-4 text-white">
// //         {/* VACUNO */}
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

// //         {/* CERDO */}
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

// //         {/* POLLO */}
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
// //       </div>
// //     </section>
// //   );
// // }
// // // "use client";

// // // import { useMemo, useState } from "react";
// // // import { carnes, type Corte } from "../lib/datos";
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
// // //   const [vacunoAbierto, setVacunoAbierto] = useState(false);
// // //   const [cerdoAbierto, setCerdoAbierto] = useState(false);
// // //   const [polloAbierto, setPolloAbierto] = useState(false);
// // //   const [busqueda, setBusqueda] = useState("");
// // //   const [soloParrilla, setSoloParrilla] = useState(false);

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
// // //       setVacunoAbierto(!vacunoAbierto);
// // //     }

// // //     if (tipo === "cerdo") {
// // //       setCerdoAbierto(!cerdoAbierto);
// // //     }

// // //     if (tipo === "pollo") {
// // //       setPolloAbierto(!polloAbierto);
// // //     }
// // //   };

// // //   const limpiarTipoCarne = (tipo: keyof CortesSeleccionadosState) => {
// // //     setCortesSeleccionados({
// // //       ...cortesSeleccionados,
// // //       [tipo]: [],
// // //     });
// // //   };

// // //   const filtrarCortes = (lista: Corte[]) => {
// // //     return [...lista]
// // //       .filter((corte) => (soloParrilla ? corte.parrilla : true))
// // //       .filter((corte) =>
// // //         corte.nombre.toLowerCase().includes(busqueda.toLowerCase())
// // //       )
// // //       .sort((a, b) => a.nombre.localeCompare(b.nombre));
// // //   };

// // //   const vacunoFiltrado = useMemo(
// // //     () => filtrarCortes(carnes.vacuno),
// // //     [busqueda, soloParrilla]
// // //   );

// // //   const cerdoFiltrado = useMemo(
// // //     () => filtrarCortes(carnes.cerdo),
// // //     [busqueda, soloParrilla]
// // //   );

// // //   const polloFiltrado = useMemo(
// // //     () => filtrarCortes(carnes.pollo),
// // //     [busqueda, soloParrilla]
// // //   );

// // //   const colorContador = (cantidad: number) =>
// // //     cantidad > 0 ? "text-yellow-400" : "text-zinc-400";

// // //   const renderBloqueCortes = (
// // //     tipo: keyof CortesSeleccionadosState,
// // //     titulo: string,
// // //     colorTitulo: string,
// // //     lista: Corte[]
// // //   ) => {
// // //     if (lista.length === 0) {
// // //       return (
// // //         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //           <div className="mb-4 flex items-center justify-between">
// // //             <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

// // //             {cortesSeleccionados[tipo].length > 0 && (
// // //               <button
// // //                 onClick={() => limpiarTipoCarne(tipo)}
// // //                 className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
// // //               >
// // //                 Limpiar
// // //               </button>
// // //             )}
// // //           </div>

// // //           <p className="text-sm text-zinc-400">
// // //             No hay cortes que coincidan con el filtro actual.
// // //           </p>
// // //         </div>
// // //       );
// // //     }

// // //     return (
// // //       <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// // //         <div className="mb-4 flex items-center justify-between">
// // //           <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

// // //           {cortesSeleccionados[tipo].length > 0 && (
// // //             <button
// // //               onClick={() => limpiarTipoCarne(tipo)}
// // //               className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
// // //             >
// // //               Limpiar
// // //             </button>
// // //           )}
// // //         </div>

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

// // //                 {corte.parrilla && (
// // //                   <span className="text-xs text-green-400">
// // //                     🔥 Parrilla
// // //                   </span>
// // //                 )}
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

// // //       <div className="mb-4">
// // //         <input
// // //           type="text"
// // //           placeholder="Buscar corte..."
// // //           value={busqueda}
// // //           onChange={(e) => setBusqueda(e.target.value)}
// // //           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
// // //         />
// // //       </div>

// // //       <div className="mb-6 flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
// // //         <input
// // //           type="checkbox"
// // //           checked={soloParrilla}
// // //           onChange={() => setSoloParrilla(!soloParrilla)}
// // //         />
// // //         <span>Mostrar solo cortes de parrilla 🔥</span>
// // //       </div>

// // //       <div className="space-y-4 text-white">
// // //         {/* VACUNO */}
// // //         <button
// // //           onClick={() => toggleTipoCarne("vacuno")}
// // //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium text-white hover:bg-zinc-700"
// // //         >
// // //           <span>
// // //             Vacuno{" "}
// // //             <span className={colorContador(cortesSeleccionados.vacuno.length)}>
// // //               ({cortesSeleccionados.vacuno.length})
// // //             </span>
// // //           </span>
// // //           <span className="text-2xl">{vacunoAbierto ? "−" : "+"}</span>
// // //         </button>

// // //         {vacunoAbierto &&
// // //           renderBloqueCortes(
// // //             "vacuno",
// // //             "Cortes de vacuno",
// // //             "text-red-300",
// // //             vacunoFiltrado
// // //           )}

// // //         {/* CERDO */}
// // //         <button
// // //           onClick={() => toggleTipoCarne("cerdo")}
// // //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium text-white hover:bg-zinc-700"
// // //         >
// // //           <span>
// // //             Cerdo{" "}
// // //             <span className={colorContador(cortesSeleccionados.cerdo.length)}>
// // //               ({cortesSeleccionados.cerdo.length})
// // //             </span>
// // //           </span>
// // //           <span className="text-2xl">{cerdoAbierto ? "−" : "+"}</span>
// // //         </button>

// // //         {cerdoAbierto &&
// // //           renderBloqueCortes(
// // //             "cerdo",
// // //             "Cortes de cerdo",
// // //             "text-orange-300",
// // //             cerdoFiltrado
// // //           )}

// // //         {/* POLLO */}
// // //         <button
// // //           onClick={() => toggleTipoCarne("pollo")}
// // //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium text-white hover:bg-zinc-700"
// // //         >
// // //           <span>
// // //             Pollo{" "}
// // //             <span className={colorContador(cortesSeleccionados.pollo.length)}>
// // //               ({cortesSeleccionados.pollo.length})
// // //             </span>
// // //           </span>
// // //           <span className="text-2xl">{polloAbierto ? "−" : "+"}</span>
// // //         </button>

// // //         {polloAbierto &&
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
