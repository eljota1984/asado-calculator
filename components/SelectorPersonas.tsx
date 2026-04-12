"use client";

import type { AdultosState } from "../app/page";

interface Props {
  adultos: AdultosState;
  setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
}

export default function SelectorPersonas({ adultos, setAdultos }: Props) {
  const toNumber = (value: string) => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Cantidad de personas
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="adultos-alto" className="text-white">
            Adultos (alto consumo)
          </label>
          <input
            id="adultos-alto"
            type="number"
            min="0"
            value={adultos.alto}
            onChange={(e) =>
              setAdultos({ ...adultos, alto: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="adultos-normal" className="text-white">
            Adultos (consumo normal)
          </label>
          <input
            id="adultos-normal"
            type="number"
            min="0"
            value={adultos.normal}
            onChange={(e) =>
              setAdultos({ ...adultos, normal: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="adultos-bajo" className="text-white">
            Adultos (bajo consumo)
          </label>
          <input
            id="adultos-bajo"
            type="number"
            min="0"
            value={adultos.bajo}
            onChange={(e) =>
              setAdultos({ ...adultos, bajo: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="ninos" className="text-white">
            Niños
          </label>
          <input
            id="ninos"
            type="number"
            min="0"
            value={adultos.ninos}
            onChange={(e) =>
              setAdultos({ ...adultos, ninos: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>
      </div>
    </section>
  );
}
// "use client";

// interface AdultosState {
//   alto: number;
//   normal: number;
//   bajo: number;
//   ninos: number;
// }

// interface Props {
//   adultos: AdultosState;
//   setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
// }

// export default function SelectorPersonas({ adultos, setAdultos }: Props) {
//   const toNumber = (value: string) => {
//     const parsed = Number(value);
//     return Number.isNaN(parsed) ? 0 : parsed;
//   };

//   return (
//     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold text-white">Cantidad de personas</h2>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between gap-4">
//           <label htmlFor="adultos-alto" className="text-white">
//             Adultos (alto consumo)
//           </label>
//           <input
//             id="adultos-alto"
//             type="number"
//             min="0"
//             value={adultos.alto}
//             onChange={(e) =>
//               setAdultos({ ...adultos, alto: toNumber(e.target.value) })
//             }
//             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
//           />
//         </div>

//         <div className="flex items-center justify-between gap-4">
//           <label htmlFor="adultos-normal" className="text-white">
//             Adultos (consumo normal)
//           </label>
//           <input
//             id="adultos-normal"
//             type="number"
//             min="0"
//             value={adultos.normal}
//             onChange={(e) =>
//               setAdultos({ ...adultos, normal: toNumber(e.target.value) })
//             }
//             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
//           />
//         </div>

//         <div className="flex items-center justify-between gap-4">
//           <label htmlFor="adultos-bajo" className="text-white">
//             Adultos (bajo consumo)
//           </label>
//           <input
//             id="adultos-bajo"
//             type="number"
//             min="0"
//             value={adultos.bajo}
//             onChange={(e) =>
//               setAdultos({ ...adultos, bajo: toNumber(e.target.value) })
//             }
//             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
//           />
//         </div>

//         <div className="flex items-center justify-between gap-4">
//           <label htmlFor="ninos" className="text-white">
//             Niños
//           </label>
//           <input
//             id="ninos"
//             type="number"
//             min="0"
//             value={adultos.ninos}
//             onChange={(e) =>
//               setAdultos({ ...adultos, ninos: toNumber(e.target.value) })
//             }
//             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// // "use client";

// // import { useState } from "react";

// // interface Props {
// //   adultos: { alto: number; normal: number; bajo: number ; ninos: number};
// //   setAdultos: React.Dispatch<React.SetStateAction<any>>;
// // }

// // export default function SelectorPersonas({ adultos, setAdultos }: Props) {
// //   return (
// //     <div className="flex flex-col gap-4 text-white">
// //       <h2 className="text-2xl font-bold">Cantidad de personas</h2>

// //       <div className="flex items-center gap-3">
// //         <label htmlFor="adultos-alto" className="text-white">
// //           Adultos (alto consumo)
// //         </label>
// //         <input
// //           id="adultos-alto"
// //           type="number"
// //           min="0"
// //           value={adultos.alto}
// //           onChange={(e) =>
// //             setAdultos({ ...adultos, alto: parseInt(e.target.value) })
// //           }
// //           className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //         />
// //       </div>

// //       <div className="flex items-center gap-3">
// //         <label htmlFor="adultos-normal" className="text-white">
// //           Adultos (consumo normal)
// //         </label>
// //         <input
// //           id="adultos-normal"
// //           type="number"
// //           min="0"
// //           value={adultos.normal}
// //           onChange={(e) =>
// //             setAdultos({ ...adultos, normal: parseInt(e.target.value) })
// //           }
// //           className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //         />
// //       </div>

// //       <div className="flex items-center gap-3">
// //         <label htmlFor="adultos-bajo" className="text-white">
// //           Adultos (bajo consumo)
// //         </label>
// //         <input
// //           id="adultos-bajo"
// //           type="number"
// //           min="0"
// //           value={adultos.bajo}
// //           onChange={(e) =>
// //             setAdultos({ ...adultos, bajo: parseInt(e.target.value) })
// //           }
// //           className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //         />
// //       </div>

// //       <div className="flex items-center gap-3">
// //         <label htmlFor="ninos" className="text-white">
// //           Niños
// //         </label>
// //         <input
// //           id="ninos"
// //           type="number"
// //           min="0"
// //           value={adultos.ninos || 0}
// //           onChange={(e) => setAdultos({ ...adultos, ninos: parseInt(e.target.value) })}
// //           className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";

// // import { useState } from "react";

// // export default function SelectorPersonas() {
// //   const [adultosAlto, setAdultosAlto] = useState(0);
// //   const [adultosNormal, setAdultosNormal] = useState(0);
// //   const [adultosBajo, setAdultosBajo] = useState(0);
// //   const [ninos, setNinos] = useState(0);
// //   const totalPersonas =
// //     adultosAlto + adultosNormal + adultosBajo + ninos;
// //   const carneTotal =
// //     adultosAlto * 0.5 +
// //     adultosNormal * 0.4 +
// //     adultosBajo * 0.3 +
// //     ninos * 0.2;
// //   const carbonTotal = carneTotal * 1;
// //   const precioPorKg = 8000;
// //   const costoTotal = carneTotal * precioPorKg;
// //   const totalAdultos =
// //     adultosAlto + adultosNormal + adultosBajo;
// //   const costoPorAdulto =
// //     totalAdultos > 0 ? costoTotal / totalAdultos : 0;

    


// //   return (
// //     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
// //       <h2 className="mb-6 text-2xl font-bold text-white">Personas</h2>

// //       <div className="space-y-4">
// //         <div className="flex items-center justify-between gap-4">
// //           <label htmlFor="adultos-alto" className="text-white">
// //             Adultos (alto consumo)
// //           </label>
// //           <input
// //             id="adultos-alto"
// //             type="number"
// //             min="0"
// //             value={adultosAlto}
// //             onChange={(e) => setAdultosAlto(Number(e.target.value))}
// //             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //           />
// //         </div>

// //         <div className="flex items-center justify-between gap-4">
// //           <label htmlFor="adultos-normal" className="text-white">
// //             Adultos (consumo normal)
// //           </label>
// //           <input
// //             id="adultos-normal"
// //             type="number"
// //             min="0"
// //             value={adultosNormal}
// //             onChange={(e) => setAdultosNormal(Number(e.target.value))}
// //             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //           />
// //         </div>

// //         <div className="flex items-center justify-between gap-4">
// //           <label htmlFor="adultos-bajo" className="text-white">
// //             Adultos (bajo consumo)
// //           </label>
// //           <input
// //             id="adultos-bajo"
// //             type="number"
// //             min="0"
// //             value={adultosBajo}
// //             onChange={(e) => setAdultosBajo(Number(e.target.value))}
// //             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //           />
// //         </div>

// //         <div className="flex items-center justify-between gap-4">
// //           <label htmlFor="ninos" className="text-white">
// //             Niños
// //           </label>
// //           <input
// //             id="ninos"
// //             type="number"
// //             min="0"
// //             value={ninos}
// //             onChange={(e) => setNinos(Number(e.target.value))}
// //             className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
// //           />
// //         </div>
// //         <p className="mt-6 text-lg font-semibold text-white">
// //           Total de personas: {totalPersonas}
// //         </p>
// //         <p className="mt-2 text-lg font-semibold text-green-400">
// //           Carne necesaria: {carneTotal.toFixed(2)} kg
// //         </p>
// //         <p className="text-lg font-semibold text-orange-400">
// //           Carbón necesario: {carbonTotal.toFixed(2)} kg
// //         </p>
// //         <p className="text-lg font-semibold text-yellow-400">
// //           Costo estimado: ${costoTotal.toLocaleString()}
// //         </p>
// //         <p className="text-lg font-semibold text-blue-400">
// //           Costo por adulto: ${costoPorAdulto.toFixed(0)}
// //         </p>

// //       </div>
// //     </section>

// //   );
// // }