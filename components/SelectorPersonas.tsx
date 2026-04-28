"use client";

import type { AdultosState } from "../app/page";

interface Props {
  adultos: AdultosState;
  setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
}

export default function SelectorPersonas({
  adultos,
  setAdultos,
}: Props) {
  const cambiarCantidad = (
    tipo: keyof AdultosState,
    operacion: "sumar" | "restar"
  ) => {
    setAdultos((prev) => {
      const valorActual = prev[tipo];
      const nuevoValor =
        operacion === "sumar"
          ? valorActual + 1
          : Math.max(0, valorActual - 1);

      return {
        ...prev,
        [tipo]: nuevoValor,
      };
    });
  };

  const renderFila = (
    titulo: string,
    descripcion: string,
    tipo: keyof AdultosState
  ) => {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg shadow-black/20">
        <div className="mb-4">
          <p className="font-bold text-white">{titulo}</p>
          <p className="mt-1 text-sm leading-5 text-zinc-400">{descripcion}</p>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-zinc-900 p-2 ring-1 ring-zinc-800">
          <button
            type="button"
            onClick={() => cambiarCantidad(tipo, "restar")}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-2xl font-black text-white transition hover:bg-zinc-700"
          >
            −
          </button>

          <span className="min-w-12 text-center text-3xl font-black text-white">
            {adultos[tipo]}
          </span>

          <button
            type="button"
            onClick={() => cambiarCantidad(tipo, "sumar")}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-2xl font-black text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

  const totalPersonas =
    adultos.alto + adultos.normal + adultos.bajo + adultos.ninos;

  return (
    <section className="w-full max-w-5xl rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-red-950/10 md:p-7">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-red-400">
          Paso 1
        </p>

        <h2 className="mt-1 text-2xl font-black text-white">
          Cantidad de personas
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Define el consumo estimado de los comensales antes de seleccionar los
          productos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {renderFila(
          "Adulto alto consumo",
          "Come más que el promedio.",
          "alto"
        )}

        {renderFila(
          "Adulto consumo normal",
          "Consumo estándar para asado.",
          "normal"
        )}

        {renderFila(
          "Adulto bajo consumo",
          "Come menos que el promedio.",
          "bajo"
        )}

        {renderFila(
          "Niños",
          "Se consideran en el consumo total, pero no pagan.",
          "ninos"
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
          <p className="text-sm text-red-200">Adultos que pagan</p>
          <p className="mt-2 text-3xl font-black text-red-300">
            {totalAdultos}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="text-sm text-zinc-400">Total personas</p>
          <p className="mt-2 text-3xl font-black text-white">
            {totalPersonas}
          </p>
        </div>
      </div>
    </section>
  );
}
// "use client";

// import type { AdultosState } from "../app/page";

// interface Props {
//   adultos: AdultosState;
//   setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
// }

// export default function SelectorPersonas({
//   adultos,
//   setAdultos,
// }: Props) {
//   const cambiarCantidad = (
//     tipo: keyof AdultosState,
//     operacion: "sumar" | "restar"
//   ) => {
//     setAdultos((prev) => {
//       const valorActual = prev[tipo];
//       const nuevoValor =
//         operacion === "sumar"
//           ? valorActual + 1
//           : Math.max(0, valorActual - 1);

//       return {
//         ...prev,
//         [tipo]: nuevoValor,
//       };
//     });
//   };

//   const renderFila = (
//     titulo: string,
//     descripcion: string,
//     tipo: keyof AdultosState
//   ) => {
//     return (
//       <div className="rounded-xl bg-zinc-800 p-4">
//         <div className="mb-3">
//           <p className="font-semibold text-white">{titulo}</p>
//           <p className="text-sm text-zinc-400">{descripcion}</p>
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={() => cambiarCantidad(tipo, "restar")}
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-xl font-bold text-white hover:bg-zinc-600"
//           >
//             −
//           </button>

//           <span className="text-2xl font-bold text-white">
//             {adultos[tipo]}
//           </span>

//           <button
//             type="button"
//             onClick={() => cambiarCantidad(tipo, "sumar")}
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white hover:bg-red-700"
//           >
//             +
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const totalAdultos =
//     adultos.alto + adultos.normal + adultos.bajo;

//   const totalPersonas =
//     adultos.alto +
//     adultos.normal +
//     adultos.bajo +
//     adultos.ninos;

//   return (
//     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold text-white">
//         Cantidad de personas
//       </h2>

//       <div className="grid gap-4 md:grid-cols-2">
//         {renderFila(
//           "Adulto alto consumo",
//           "Come más que el promedio.",
//           "alto"
//         )}

//         {renderFila(
//           "Adulto consumo normal",
//           "Consumo estándar para asado.",
//           "normal"
//         )}

//         {renderFila(
//           "Adulto bajo consumo",
//           "Come menos que el promedio.",
//           "bajo"
//         )}

//         {renderFila(
//           "Niños",
//           "Se consideran en el consumo total, pero no pagan.",
//           "ninos"
//         )}
//       </div>

//       <div className="mt-6 grid gap-3 md:grid-cols-2">
//         <div className="rounded-xl bg-zinc-800 p-4">
//           <p className="text-sm text-zinc-400">Adultos</p>
//           <p className="text-2xl font-bold text-white">
//             {totalAdultos}
//           </p>
//         </div>

//         <div className="rounded-xl bg-zinc-800 p-4">
//           <p className="text-sm text-zinc-400">Total personas</p>
//           <p className="text-2xl font-bold text-white">
//             {totalPersonas}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
// "use client";

// import type { AdultosState } from "../app/page";

// interface Props {
//   adultos: AdultosState;
//   setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
// }

// export default function SelectorPersonas({ adultos, setAdultos }: Props) {
//   const cambiarCantidad = (
//     tipo: keyof AdultosState,
//     operacion: "sumar" | "restar"
//   ) => {
//     setAdultos((prev) => {
//       const valorActual = prev[tipo];
//       const nuevoValor =
//         operacion === "sumar" ? valorActual + 1 : Math.max(0, valorActual - 1);

//       return {
//         ...prev,
//         [tipo]: nuevoValor,
//       };
//     });
//   };

//   const renderFila = (
//     label: string,
//     tipo: keyof AdultosState
//   ) => (
//     <div className="flex items-center justify-between gap-4 rounded-xl bg-zinc-800 p-4">
//       <span className="text-sm font-medium text-white">{label}</span>
      

//       <div className="flex items-center gap-3">
//         <button
//           type="button"
//           onClick={() => cambiarCantidad(tipo, "restar")}
//           className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white hover:bg-red-700"
//         >
//           −
//         </button>

//         <div className="min-w-[2.5rem] text-center text-lg font-semibold text-white">
//           {adultos[tipo]}
//         </div>

//         <button
//           type="button"
//           onClick={() => cambiarCantidad(tipo, "sumar")}
//           className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white hover:bg-green-700"
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold text-white">
//         Cantidad de personas
//       </h2>
      

//       <div className="space-y-4">
//         {renderFila("Adultos (alto consumo)", "alto")}
//         {renderFila("Adultos (consumo normal)", "normal")}
//         {renderFila("Adultos (bajo consumo)", "bajo")}
//         {renderFila("Niños", "ninos")}
//       </div>
//     </section>
//   );
// }

