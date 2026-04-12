"use client";

import { useState } from "react";
import SelectorPersonas from "../components/SelectorPersonas";
import SelectorCarnes from "../components/SelectorCarnes";

export interface AdultosState {
  alto: number;
  normal: number;
  bajo: number;
  ninos: number;
}

export interface CortesSeleccionadosState {
  vacuno: string[];
  cerdo: string[];
  pollo: string[];
}

export default function Home() {
  const [adultos, setAdultos] = useState<AdultosState>({
    alto: 0,
    normal: 0,
    bajo: 0,
    ninos: 0,
  });

  const [cortesSeleccionados, setCortesSeleccionados] =
    useState<CortesSeleccionadosState>({
      vacuno: [],
      cerdo: [],
      pollo: [],
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black p-8">
      <h1 className="text-4xl font-bold text-white">
        Calculadora de Asados 🔥
      </h1>

      <SelectorPersonas adultos={adultos} setAdultos={setAdultos} />

      <SelectorCarnes
        cortesSeleccionados={cortesSeleccionados}
        setCortesSeleccionados={setCortesSeleccionados}
      />
    </main>
  );
}
// "use client";
// import SelectorPersonas from "../components/SelectorPersonas";
// import SelectorCarnes from "../components/SelectorCarnes";
// import { useState } from "react";



// export default function Home() {
//   const [adultos, setAdultos] = useState({
//     alto: 0,
//     normal: 0,
//     bajo: 0,
//     ninos:0
//   });

//   const [cortesSeleccionados, setCortesSeleccionados] = useState({
//     vacuno: [],
//     cerdo: [],
//     pollo: []
//   });

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-8">
//       <h1 className="text-4xl font-bold">

//         Calculadora de Asados 🔥
//       </h1>

//       <SelectorPersonas
//         adultos={adultos}
//         setAdultos={setAdultos}
//       />
//       <SelectorCarnes
//         cortesSeleccionados={cortesSeleccionados}
//         setCortesSeleccionados={setCortesSeleccionados}
//       />

//     </main>
//   );

// }