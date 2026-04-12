"use client";

import { useMemo, useState } from "react";
import SelectorPersonas from "../components/SelectorPersonas";
import SelectorCarnes from "../components/SelectorCarnes";
import SelectorPorcentajes from "../components/SelectorPorcentajes";
import { carnes } from "../lib/datos";

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

export interface PorcentajesCortesState {
  [nombreCorte: string]: number;
}

interface CorteConPrecio {
  nombre: string;
  precio: number;
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

  const [porcentajesCortes, setPorcentajesCortes] =
    useState<PorcentajesCortesState>({});

  const cortesActivos = useMemo(() => {
    return [
      ...cortesSeleccionados.vacuno,
      ...cortesSeleccionados.cerdo,
      ...cortesSeleccionados.pollo,
    ];
  }, [cortesSeleccionados]);

  const todosLosCortes: CorteConPrecio[] = [
    ...carnes.vacuno,
    ...carnes.cerdo,
    ...carnes.pollo,
  ];

  const carneTotal =
    adultos.alto * 0.5 +
    adultos.normal * 0.4 +
    adultos.bajo * 0.3 +
    adultos.ninos * 0.2;

  const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

  const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
    return acc + (porcentajesCortes[corte] ?? 0);
  }, 0);
  const porcentajesValidos = totalPorcentajes === 100;

  const detalleCortes = cortesActivos.map((nombreCorte) => {
    const corteData = todosLosCortes.find((corte) => corte.nombre === nombreCorte);

    const porcentaje = porcentajesCortes[nombreCorte] ?? 0;
    const kg = carneTotal * (porcentaje / 100);
    const precio = corteData?.precio ?? 0;
    const costo = kg * precio;

    return {
      nombre: nombreCorte,
      porcentaje,
      kg,
      precio,
      costo,
    };
  });

  const costoTotal = detalleCortes.reduce((acc, corte) => acc + corte.costo, 0);

  const costoPorAdulto = totalAdultos > 0 ? costoTotal / totalAdultos : 0;

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

      <SelectorPorcentajes
        cortesSeleccionados={cortesSeleccionados}
        porcentajesCortes={porcentajesCortes}
        setPorcentajesCortes={setPorcentajesCortes}
      />

      <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
        <h2 className="mb-4 text-2xl font-bold">Resumen del asado</h2>

        <div className="space-y-2 text-lg">
          <p>Total de adultos: {totalAdultos}</p>
          <p>Total de niños: {adultos.ninos}</p>
          <p>Carne necesaria: {carneTotal.toFixed(2)} kg</p>
          <p>
            Total porcentajes:{" "}
            <span className={totalPorcentajes === 100 ? "text-green-400" : "text-red-400"}>
              {totalPorcentajes}%
            </span>
          </p>
        </div>
        {detalleCortes.length > 0 && porcentajesValidos && (
          <div className="mt-6">
            <h3 className="mb-3 text-xl font-semibold">Detalle por corte</h3>

            <div className="space-y-3">
              {detalleCortes.map((corte) => (
                <div
                  key={corte.nombre}
                  className="rounded-lg bg-zinc-800 p-4 text-sm"
                >
                  <p className="font-semibold text-yellow-300">{corte.nombre}</p>
                  <p>Porcentaje: {corte.porcentaje}%</p>
                  <p>Kilos asignados: {corte.kg.toFixed(2)} kg</p>
                  <p>Precio por kilo: ${corte.precio.toLocaleString()}</p>
                  <p className="font-semibold text-green-400">
                    Costo del corte: ${corte.costo.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 space-y-2 text-lg">
          {porcentajesValidos ? (
            <>
              <p className="font-semibold text-yellow-400">
                Costo total del asado: ${costoTotal.toLocaleString()}
              </p>

              <p className="font-semibold text-green-400">
                Costo por adulto: ${costoPorAdulto.toFixed(0)}
              </p>
            </>
          ) : (
            <div className="rounded-lg bg-red-950 p-4 text-red-300">
              Debes ajustar los porcentajes hasta que la suma sea exactamente 100% para
              obtener un cálculo final válido.
            </div>
          )}
        </div>

      </section>
    </main>
  );
}
// "use client";

// import { useMemo, useState } from "react";
// import SelectorPersonas from "../components/SelectorPersonas";
// import SelectorCarnes from "../components/SelectorCarnes";
// import SelectorPorcentajes from "@/components/SelectorPorcentajes";
// import { carnes } from "../lib/datos";

// export interface AdultosState {
//   alto: number;
//   normal: number;
//   bajo: number;
//   ninos: number;
// }

// export interface CortesSeleccionadosState {
//   vacuno: string[];
//   cerdo: string[];
//   pollo: string[];
// }

// export interface PorcentajesCortesState {
//   [nombreCorte: string]: number;
// }

// export default function Home() {
//   const [adultos, setAdultos] = useState<AdultosState>({
//     alto: 0,
//     normal: 0,
//     bajo: 0,
//     ninos: 0,
//   });

//   const [cortesSeleccionados, setCortesSeleccionados] =
//     useState<CortesSeleccionadosState>({
//       vacuno: [],
//       cerdo: [],
//       pollo: [],
//     });

//   const [porcentajesCortes, setPorcentajesCortes] =
//     useState<PorcentajesCortesState>({});

//   const cortesActivos = useMemo(() => {
//     return [
//       ...cortesSeleccionados.vacuno,
//       ...cortesSeleccionados.cerdo,
//       ...cortesSeleccionados.pollo,
//     ];
//   }, [cortesSeleccionados]);

//   const calcularPrecioPromedio = (): number => {
//     const todosLosCortes = [
//       ...carnes.vacuno,
//       ...carnes.cerdo,
//       ...carnes.pollo,
//     ];

//     const cortesFiltrados = todosLosCortes.filter((corte) =>
//       cortesActivos.includes(corte.nombre)
//     );

//     if (cortesFiltrados.length === 0) return 0;

//     const suma = cortesFiltrados.reduce((acc, corte) => acc + corte.precio, 0);
//     return suma / cortesFiltrados.length;
//   };

//   const precioPromedio = calcularPrecioPromedio();

//   const carneTotal =
//     adultos.alto * 0.5 +
//     adultos.normal * 0.4 +
//     adultos.bajo * 0.3 +
//     adultos.ninos * 0.2;

//   const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

//   const costoTotal = carneTotal * precioPromedio;

//   const costoPorAdulto = totalAdultos > 0 ? costoTotal / totalAdultos : 0;

//   const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
//     return acc + (porcentajesCortes[corte] ?? 0);
//   }, 0);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black p-8">
//       <h1 className="text-4xl font-bold text-white">
//         Calculadora de Asados 🔥
//       </h1>

//       <SelectorPersonas adultos={adultos} setAdultos={setAdultos} />

//       <SelectorCarnes
//         cortesSeleccionados={cortesSeleccionados}
//         setCortesSeleccionados={setCortesSeleccionados}
//       />

//       <SelectorPorcentajes
//         cortesSeleccionados={cortesSeleccionados}
//         porcentajesCortes={porcentajesCortes}
//         setPorcentajesCortes={setPorcentajesCortes}
//       />

//       <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
//         <h2 className="mb-4 text-2xl font-bold">Resumen del asado</h2>

//         <div className="space-y-2 text-lg">
//           <p>Total de adultos: {totalAdultos}</p>
//           <p>Total de niños: {adultos.ninos}</p>
//           <p>Carne necesaria: {carneTotal.toFixed(2)} kg</p>
//           <p>Precio promedio: ${precioPromedio.toLocaleString()}/kg</p>
//           <p>Total porcentajes: {totalPorcentajes}%</p>

//           <p className="font-semibold text-yellow-400">
//             Costo total del asado: ${costoTotal.toLocaleString()}
//           </p>

//           <p className="font-semibold text-green-400">
//             Costo por adulto: ${costoPorAdulto.toFixed(0)}
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }// "use client";

// // import { useState } from "react";
// // import SelectorPersonas from "../components/SelectorPersonas";
// // import SelectorCarnes from "../components/SelectorCarnes";
// // import { carnes } from "../lib/datos";

// // export interface AdultosState {
// //   alto: number;
// //   normal: number;
// //   bajo: number;
// //   ninos: number;
// // }

// // export interface CortesSeleccionadosState {
// //   vacuno: string[];
// //   cerdo: string[];
// //   pollo: string[];
// // }

// // export default function Home() {
// //   const [adultos, setAdultos] = useState<AdultosState>({
// //     alto: 0,
// //     normal: 0,
// //     bajo: 0,
// //     ninos: 0,
// //   });

// //   const [cortesSeleccionados, setCortesSeleccionados] =
// //     useState<CortesSeleccionadosState>({
// //       vacuno: [],
// //       cerdo: [],
// //       pollo: [],
// //     });

// //   const calcularPrecioPromedio = (): number => {
// //     const todosLosCortes = [
// //       ...carnes.vacuno,
// //       ...carnes.cerdo,
// //       ...carnes.pollo,
// //     ];

// //     const seleccionados = [
// //       ...cortesSeleccionados.vacuno,
// //       ...cortesSeleccionados.cerdo,
// //       ...cortesSeleccionados.pollo,
// //     ];

// //     const cortesFiltrados = todosLosCortes.filter((corte) =>
// //       seleccionados.includes(corte.nombre)
// //     );

// //     if (cortesFiltrados.length === 0) return 0;

// //     const suma = cortesFiltrados.reduce((acc, corte) => acc + corte.precio, 0);

// //     return suma / cortesFiltrados.length;
// //   };

// //   const precioPromedio = calcularPrecioPromedio();

// //   const carneTotal =
// //     adultos.alto * 0.5 +
// //     adultos.normal * 0.4 +
// //     adultos.bajo * 0.3 +
// //     adultos.ninos * 0.2;

// //   const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

// //   const costoTotal = carneTotal * precioPromedio;

// //   const costoPorAdulto = totalAdultos > 0 ? costoTotal / totalAdultos : 0;

// //   return (
// //     <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black p-8">
// //       <h1 className="text-4xl font-bold text-white">
// //         Calculadora de Asados 🔥
// //       </h1>

// //       <SelectorPersonas adultos={adultos} setAdultos={setAdultos} />

// //       <SelectorCarnes
// //         cortesSeleccionados={cortesSeleccionados}
// //         setCortesSeleccionados={setCortesSeleccionados}
// //       />

// //       <section className="w-full max-w-xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
// //         <h2 className="mb-4 text-2xl font-bold">Resumen del asado</h2>

// //         <div className="space-y-2 text-lg">
// //           <p>Total de adultos: {totalAdultos}</p>
// //           <p>Total de niños: {adultos.ninos}</p>
// //           <p>Carne necesaria: {carneTotal.toFixed(2)} kg</p>
// //           <p>Precio promedio: ${precioPromedio.toLocaleString()}/kg</p>
// //           <p className="font-semibold text-yellow-400">
// //             Costo total del asado: ${costoTotal.toLocaleString()}
// //           </p>
// //           <p className="font-semibold text-green-400">
// //             Costo por adulto: ${costoPorAdulto.toFixed(0)}
// //           </p>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }
// // "use client";

// // import { useState } from "react";
// // import SelectorPersonas from "../components/SelectorPersonas";
// // import SelectorCarnes from "../components/SelectorCarnes";

// // export interface AdultosState {
// //   alto: number;
// //   normal: number;
// //   bajo: number;
// //   ninos: number;
// // }

// // export interface CortesSeleccionadosState {
// //   vacuno: string[];
// //   cerdo: string[];
// //   pollo: string[];
// // }

// // export default function Home() {
// //   const [adultos, setAdultos] = useState<AdultosState>({
// //     alto: 0,
// //     normal: 0,
// //     bajo: 0,
// //     ninos: 0,
// //   });

// //   const [cortesSeleccionados, setCortesSeleccionados] =
// //     useState<CortesSeleccionadosState>({
// //       vacuno: [],
// //       cerdo: [],
// //       pollo: [],
// //     });

// //   return (
// //     <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black p-8">
// //       <h1 className="text-4xl font-bold text-white">
// //         Calculadora de Asados 🔥
// //       </h1>

// //       <SelectorPersonas adultos={adultos} setAdultos={setAdultos} />

// //       <SelectorCarnes
// //         cortesSeleccionados={cortesSeleccionados}
// //         setCortesSeleccionados={setCortesSeleccionados}
// //       />
// //     </main>
// //   );
// // }
// // // "use client";
// // // import SelectorPersonas from "../components/SelectorPersonas";
// // // import SelectorCarnes from "../components/SelectorCarnes";
// // // import { useState } from "react";



// // // export default function Home() {
// // //   const [adultos, setAdultos] = useState({
// // //     alto: 0,
// // //     normal: 0,
// // //     bajo: 0,
// // //     ninos:0
// // //   });

// // //   const [cortesSeleccionados, setCortesSeleccionados] = useState({
// // //     vacuno: [],
// // //     cerdo: [],
// // //     pollo: []
// // //   });

// // //   return (
// // //     <main className="flex min-h-screen flex-col items-center justify-center gap-8">
// // //       <h1 className="text-4xl font-bold">

// // //         Calculadora de Asados 🔥
// // //       </h1>

// // //       <SelectorPersonas
// // //         adultos={adultos}
// // //         setAdultos={setAdultos}
// // //       />
// // //       <SelectorCarnes
// // //         cortesSeleccionados={cortesSeleccionados}
// // //         setCortesSeleccionados={setCortesSeleccionados}
// // //       />

// // //     </main>
// // //   );

// // // }