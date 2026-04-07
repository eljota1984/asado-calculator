"use client";

import { useState } from "react";
import { carnes } from "../lib/datos";

export default function SelectorCarnes() {
  const [vacuno, setVacuno] = useState(false);
  const [cerdo, setCerdo] = useState(false);
  const [pollo, setPollo] = useState(false);

  const [cortesVacuno, setCortesVacuno] = useState<string[]>([]);
  const [cortesCerdo, setCortesCerdo] = useState<string[]>([]);
  const [cortesPollo, setCortesPollo] = useState<string[]>([]);

  const toggleCorte = (
    corte: string,
    cortesSeleccionados: string[],
    setCortes: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (cortesSeleccionados.includes(corte)) {
      setCortes(cortesSeleccionados.filter((item) => item !== corte));
    } else {
      setCortes([...cortesSeleccionados, corte]);
    }
  };

  return (
    <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

      <div className="space-y-4 text-white">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={vacuno}
            onChange={() => setVacuno(!vacuno)}
          />
          Vacuno
        </label>

        {vacuno && (
          <div className="ml-6 rounded-lg bg-zinc-800 p-4">
            <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
            <div className="space-y-2">
              {carnes.vacuno.map((corte) => (
                <label
                  key={corte.nombre}
                  className="flex items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={cortesVacuno.includes(corte.nombre)}
                    onChange={() =>
                      toggleCorte(corte.nombre, cortesVacuno, setCortesVacuno)
                    }
                  />
                  {corte.nombre} - ${corte.precio.toLocaleString()}/kg
                </label>
              ))}
            </div>
          </div>
        )}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={cerdo}
            onChange={() => setCerdo(!cerdo)}
          />
          Cerdo
        </label>

        {cerdo && (
          <div className="ml-6 rounded-lg bg-zinc-800 p-4">
            <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
            <div className="space-y-2">
              {carnes.cerdo.map((corte) => (
                <label
                  key={corte.nombre}
                  className="flex items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={cortesCerdo.includes(corte.nombre)}
                    onChange={() =>
                      toggleCorte(corte.nombre, cortesCerdo, setCortesCerdo)
                    }
                  />
                  {corte.nombre} - ${corte.precio.toLocaleString()}/kg
                </label>
              ))}
            </div>
          </div>
        )}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={pollo}
            onChange={() => setPollo(!pollo)}
          />
          Pollo
        </label>

        {pollo && (
          <div className="ml-6 rounded-lg bg-zinc-800 p-4">
            <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
            <div className="space-y-2">
              {carnes.pollo.map((corte) => (
                <label
                  key={corte.nombre}
                  className="flex items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={cortesPollo.includes(corte.nombre)}
                    onChange={() =>
                      toggleCorte(corte.nombre, cortesPollo, setCortesPollo)
                    }
                  />
                  {corte.nombre} - ${corte.precio.toLocaleString()}/kg
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
          <p className="font-semibold text-white">Cortes seleccionados:</p>
          <p className="mt-2 text-zinc-300">
            Vacuno: {cortesVacuno.length > 0 ? cortesVacuno.join(", ") : "Ninguno"}
          </p>
          <p className="text-zinc-300">
            Cerdo: {cortesCerdo.length > 0 ? cortesCerdo.join(", ") : "Ninguno"}
          </p>
          <p className="text-zinc-300">
            Pollo: {cortesPollo.length > 0 ? cortesPollo.join(", ") : "Ninguno"}
          </p>
        </div>
      </div>
    </section>
  );
}
// "use client";

// import { useState } from "react";
// import { carnes } from "../lib/datos";

// export default function SelectorCarnes() {
//   const [vacuno, setVacuno] = useState(false);
//   const [cerdo, setCerdo] = useState(false);
//   const [pollo, setPollo] = useState(false);

//   const [cortesVacuno, setCortesVacuno] = useState<string[]>([]);
//   const [cortesCerdo, setCortesCerdo] = useState<string[]>([]);
//   const [cortesPollo, setCortesPollo] = useState<string[]>([]);

//   const toggleCorte = (
//     corte: string,
//     cortesSeleccionados: string[],
//     setCortes: React.Dispatch<React.SetStateAction<string[]>>
//   ) => {
//     if (cortesSeleccionados.includes(corte)) {
//       setCortes(cortesSeleccionados.filter((item) => item !== corte));
//     } else {
//       setCortes([...cortesSeleccionados, corte]);
//     }
//   };

//   return (
//     <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold text-white">Tipo de carne</h2>

//       <div className="space-y-4 text-white">
//         <label className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             checked={vacuno}
//             onChange={() => setVacuno(!vacuno)}
//           />
//           Vacuno
//         </label>

//         {vacuno && (
//           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//             <p className="mb-2 font-semibold text-red-300">Cortes de vacuno</p>
//             <div className="space-y-2">
//               {carnes.vacuno.map((corte) => (
//                 <label
//                   key={corte.nombre}
//                   className="flex items-center gap-3 text-sm"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={cortesVacuno.includes(corte.nombre)}
//                     onChange={() =>
//                       toggleCorte(corte.nombre, cortesVacuno, setCortesVacuno)
//                     }
//                   />
//                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         <label className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             checked={cerdo}
//             onChange={() => setCerdo(!cerdo)}
//           />
//           Cerdo
//         </label>

//         {cerdo && (
//           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//             <p className="mb-2 font-semibold text-orange-300">Cortes de cerdo</p>
//             <div className="space-y-2">
//               {carnes.cerdo.map((corte) => (
//                 <label
//                   key={corte.nombre}
//                   className="flex items-center gap-3 text-sm"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={cortesCerdo.includes(corte.nombre)}
//                     onChange={() =>
//                       toggleCorte(corte.nombre, cortesCerdo, setCortesCerdo)
//                     }
//                   />
//                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         <label className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             checked={pollo}
//             onChange={() => setPollo(!pollo)}
//           />
//           Pollo
//         </label>

//         {pollo && (
//           <div className="ml-6 rounded-lg bg-zinc-800 p-4">
//             <p className="mb-2 font-semibold text-yellow-300">Cortes de pollo</p>
//             <div className="space-y-2">
//               {carnes.pollo.map((corte) => (
//                 <label
//                   key={corte.nombre}
//                   className="flex items-center gap-3 text-sm"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={cortesPollo.includes(corte.nombre)}
//                     onChange={() =>
//                       toggleCorte(corte.nombre, cortesPollo, setCortesPollo)
//                     }
//                   />
//                   {corte.nombre} - ${corte.precio.toLocaleString()}/kg
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
//           <p className="font-semibold text-white">Cortes seleccionados:</p>
//           <p className="mt-2 text-zinc-300">
//             Vacuno: {cortesVacuno.length > 0 ? cortesVacuno.join(", ") : "Ninguno"}
//           </p>
//           <p className="text-zinc-300">
//             Cerdo: {cortesCerdo.length > 0 ? cortesCerdo.join(", ") : "Ninguno"}
//           </p>
//           <p className="text-zinc-300">
//             Pollo: {cortesPollo.length > 0 ? cortesPollo.join(", ") : "Ninguno"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
