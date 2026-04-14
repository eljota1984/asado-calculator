"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
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

  // useEffect(() => {
  //   const adultosGuardados = localStorage.getItem("adultos");
  //   const cortesGuardados = localStorage.getItem("cortesSeleccionados");
  //   const porcentajesGuardados = localStorage.getItem("porcentajesCortes");

  //   if (adultosGuardados) {
  //     setAdultos(JSON.parse(adultosGuardados));
  //   }

  //   if (cortesGuardados) {
  //     setCortesSeleccionados(JSON.parse(cortesGuardados));
  //   }

  //   if (porcentajesGuardados) {
  //     setPorcentajesCortes(JSON.parse(porcentajesGuardados));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("adultos", JSON.stringify(adultos));
  }, [adultos]);

  useEffect(() => {
    reiniciarCalculoAutomatico();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cortesSeleccionados",
      JSON.stringify(cortesSeleccionados)
    );
  }, [cortesSeleccionados]);

  useEffect(() => {
    localStorage.setItem(
      "porcentajesCortes",
      JSON.stringify(porcentajesCortes)
    );
  }, [porcentajesCortes]);

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

  const carbonTotal = carneTotal;

  const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

  const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
    return acc + (porcentajesCortes[corte] ?? 0);
  }, 0);

  const porcentajesValidos = totalPorcentajes === 100;

  const detalleCortes = cortesActivos.map((nombreCorte) => {
    let tipo = "";

    if (cortesSeleccionados.vacuno.includes(nombreCorte)) tipo = "Vacuno";
    if (cortesSeleccionados.cerdo.includes(nombreCorte)) tipo = "Cerdo";
    if (cortesSeleccionados.pollo.includes(nombreCorte)) tipo = "Pollo";

    const corteData = todosLosCortes.find((corte) => corte.nombre === nombreCorte);

    const porcentaje = porcentajesCortes[nombreCorte] ?? 0;
    const kg = carneTotal * (porcentaje / 100);
    const precio = corteData?.precio ?? 0;
    const costo = kg * precio;

    return {
      nombre: nombreCorte,
      tipo,
      porcentaje,
      kg,
      precio,
      costo,
    };
  });

  const costoTotal = detalleCortes.reduce((acc, corte) => acc + corte.costo, 0);

  const costoPorAdulto = totalAdultos > 0 ? costoTotal / totalAdultos : 0;

  const reiniciarCalculo = () => {
    if (!confirm("¿Seguro que quieres reiniciar el cálculo?")) return;

    setAdultos({
      alto: 0,
      normal: 0,
      bajo: 0,
      ninos: 0,
    });

    setCortesSeleccionados({
      vacuno: [],
      cerdo: [],
      pollo: [],
    });

    setPorcentajesCortes({});

    localStorage.removeItem("adultos");
    localStorage.removeItem("cortesSeleccionados");
    localStorage.removeItem("porcentajesCortes");
  };

  const reiniciarCalculoAutomatico = () => {
    setAdultos({
      alto: 0,
      normal: 0,
      bajo: 0,
      ninos: 0,
    });

    setCortesSeleccionados({
      vacuno: [],
      cerdo: [],
      pollo: [],
    });

    setPorcentajesCortes({});

    localStorage.removeItem("adultos");
    localStorage.removeItem("cortesSeleccionados");
    localStorage.removeItem("porcentajesCortes");
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("Resumen del Asado", 20, y);

    y += 12;
    doc.setFontSize(12);
    doc.text(`Total de adultos: ${totalAdultos}`, 20, y);

    y += 8;
    doc.text(`Total de niños: ${adultos.ninos}`, 20, y);

    y += 8;
    doc.text(`Carne necesaria: ${carneTotal.toFixed(2)} kg`, 20, y);

    y += 8;
    doc.text(`Carbón necesario: ${carbonTotal.toFixed(2)} kg`, 20, y);

    y += 8;
    doc.text(`Total porcentajes: ${totalPorcentajes}%`, 20, y);

    y += 12;
    doc.setFontSize(16);
    doc.text("Detalle por corte", 20, y);

    y += 10;
    doc.setFontSize(11);

    detalleCortes.forEach((corte) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.text(`${corte.nombre}`, 20, y);

      y += 6;
      doc.setFontSize(11);
      doc.text(`Tipo de carne: ${corte.tipo}`, 25, y);

      y += 6;
      doc.text(`Porcentaje asignado: ${corte.porcentaje}%`, 25, y);

      y += 6;
      doc.text(`Peso asignado: ${corte.kg.toFixed(2)} kg`, 25, y);

      y += 6;
      doc.text(`Precio por kilo: $${corte.precio.toLocaleString()}`, 25, y);

      y += 6;
      doc.text(`Costo del corte: $${corte.costo.toLocaleString()}`, 25, y);

      y += 10;
      doc.line(20, y, 190, y);
      y += 8;
    });

    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(16);
    doc.text("Totales finales", 20, y);

    y += 10;
    doc.setFontSize(12);
    doc.text(`Costo total del asado: $${costoTotal.toLocaleString()}`, 20, y);

    y += 8;
    doc.text(`Costo por adulto: $${costoPorAdulto.toFixed(0)}`, 20, y);

    doc.save("resumen-asado.pdf");
  };

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

      <section className="w-full max-w-xl space-y-6 text-white">
        <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Resumen general</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-zinc-400">Adultos</p>
              <p className="text-lg font-semibold">{totalAdultos}</p>
            </div>

            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-zinc-400">Niños</p>
              <p className="text-lg font-semibold">{adultos.ninos}</p>
            </div>

            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-zinc-400">Carne total</p>
              <p className="text-lg font-semibold">{carneTotal.toFixed(2)} kg</p>
            </div>

            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-zinc-400">Carbón</p>
              <p className="text-lg font-semibold">{carbonTotal.toFixed(2)} kg</p>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <p>
              Porcentajes:{" "}
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

        {detalleCortes.length > 0 && (
          <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Detalle por corte</h2>

            {["Vacuno", "Cerdo", "Pollo"].map((tipo) => {
              const cortesPorTipo = detalleCortes.filter(
                (corte) => corte.tipo === tipo
              );

              if (cortesPorTipo.length === 0) return null;

              return (
                <div key={tipo} className="mb-6">
                  <h3
                    className={`mb-3 text-xl font-semibold ${tipo === "Vacuno"
                      ? "text-red-300"
                      : tipo === "Cerdo"
                        ? "text-orange-300"
                        : "text-yellow-300"
                      }`}
                  >
                    {tipo}
                  </h3>

                  <div className="space-y-3">
                    {cortesPorTipo.map((corte) => (
                      <div
                        key={corte.nombre}
                        className="rounded-lg bg-zinc-800 p-4"
                      >
                        <div className="flex justify-between">
                          <p className="font-semibold text-white">{corte.nombre}</p>
                          <p>{corte.porcentaje}%</p>
                        </div>

                        <div className="mt-2 text-sm text-zinc-300">
                          <p>Peso asignado: {corte.kg.toFixed(2)} kg</p>
                          <p>Precio por kilo: ${corte.precio.toLocaleString()}</p>
                        </div>

                        <p className="mt-2 font-semibold text-green-400">
                          Costo del corte: ${corte.costo.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Totales</h2>

          {porcentajesValidos ? (
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Costo total</span>
                <span className="font-semibold text-yellow-400">
                  ${costoTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Costo por adulto</span>
                <span className="font-semibold text-green-400">
                  ${costoPorAdulto.toFixed(0)}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-red-950 p-4 text-sm text-red-300">
              Ajusta los porcentajes hasta que sumen 100% para ver los totales.
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={generarPDF}
            disabled={!porcentajesValidos}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-zinc-600"
          >
            Descargar PDF
          </button>

          <button
            onClick={reiniciarCalculo}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Reiniciar cálculo
          </button>
        </div>
      </section>
    </main>
  );
}
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import SelectorPersonas from "../components/SelectorPersonas";
// import SelectorCarnes from "../components/SelectorCarnes";
// import SelectorPorcentajes from "../components/SelectorPorcentajes";
// import { carnes } from "../lib/datos";
// import jsPDF from "jspdf";

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

// interface CorteConPrecio {
//   nombre: string;
//   precio: number;
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

//   useEffect(() => {
//     const adultosGuardados = localStorage.getItem("adultos");
//     const cortesGuardados = localStorage.getItem("cortesSeleccionados");
//     const porcentajesGuardados = localStorage.getItem("porcentajesCortes");

//     if (adultosGuardados) {
//       setAdultos(JSON.parse(adultosGuardados));
//     }

//     if (cortesGuardados) {
//       setCortesSeleccionados(JSON.parse(cortesGuardados));
//     }

//     if (porcentajesGuardados) {
//       setPorcentajesCortes(JSON.parse(porcentajesGuardados));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("adultos", JSON.stringify(adultos));
//   }, [adultos]);

//   useEffect(() => {
//     localStorage.setItem(
//       "cortesSeleccionados",
//       JSON.stringify(cortesSeleccionados)
//     );
//   }, [cortesSeleccionados]);

//   useEffect(() => {
//     localStorage.setItem(
//       "porcentajesCortes",
//       JSON.stringify(porcentajesCortes)
//     );
//   }, [porcentajesCortes]);

//   const cortesActivos = useMemo(() => {
//     return [
//       ...cortesSeleccionados.vacuno,
//       ...cortesSeleccionados.cerdo,
//       ...cortesSeleccionados.pollo,
//     ];
//   }, [cortesSeleccionados]);

//   const todosLosCortes: CorteConPrecio[] = [
//     ...carnes.vacuno,
//     ...carnes.cerdo,
//     ...carnes.pollo,
//   ];

//   const carneTotal =
//     adultos.alto * 0.5 +
//     adultos.normal * 0.4 +
//     adultos.bajo * 0.3 +
//     adultos.ninos * 0.2;

//   const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

//   const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
//     return acc + (porcentajesCortes[corte] ?? 0);
//   }, 0);
//   const porcentajesValidos = totalPorcentajes === 100;


//   const detalleCortes = cortesActivos.map((nombreCorte) => {
//     let tipo = "";

//     if (cortesSeleccionados.vacuno.includes(nombreCorte)) tipo = "Vacuno";
//     if (cortesSeleccionados.cerdo.includes(nombreCorte)) tipo = "Cerdo";
//     if (cortesSeleccionados.pollo.includes(nombreCorte)) tipo = "Pollo";

//     const corteData = todosLosCortes.find((corte) => corte.nombre === nombreCorte);

//     const porcentaje = porcentajesCortes[nombreCorte] ?? 0;
//     const kg = carneTotal * (porcentaje / 100);
//     const precio = corteData?.precio ?? 0;
//     const costo = kg * precio;

//     return {
//       nombre: nombreCorte,
//       tipo,
//       porcentaje,
//       kg,
//       precio,
//       costo,
//     };
//   });

//   const costoTotal = detalleCortes.reduce((acc, corte) => acc + corte.costo, 0);
//   const carbonTotal = carneTotal * 1.1;
//   const costoPorAdulto = totalAdultos > 0 ? costoTotal / totalAdultos : 0;

//   const reiniciarCalculo = () => {
//     if (!confirm("¿Seguro que quieres reiniciar el cálculo?")) return;

//     setAdultos({
//       alto: 0,
//       normal: 0,
//       bajo: 0,
//       ninos: 0,
//     });

//     setCortesSeleccionados({
//       vacuno: [],
//       cerdo: [],
//       pollo: [],
//     });

//     setPorcentajesCortes({});

//     localStorage.removeItem("adultos");
//     localStorage.removeItem("cortesSeleccionados");
//     localStorage.removeItem("porcentajesCortes");
//   };

//   const generarPDF = () => {
//     const doc = new jsPDF();

//     let y = 20;

//     doc.setFontSize(20);
//     doc.text("Resumen del Asado", 20, y);

//     y += 12;
//     doc.setFontSize(12);
//     doc.text(`Total de adultos: ${totalAdultos}`, 20, y);

//     y += 8;
//     doc.text(`Total de niños: ${adultos.ninos}`, 20, y);

//     y += 8;
//     doc.text(`Carne necesaria: ${carneTotal.toFixed(2)} kg`, 20, y);

//     y += 8;
//     doc.text(`Carbón necesario: ${carbonTotal.toFixed(2)} kg`, 20, y);

//     y += 8;
//     doc.text(`Total porcentajes: ${totalPorcentajes}%`, 20, y);

//     y += 12;
//     doc.setFontSize(16);
//     doc.text("Detalle por corte", 20, y);

//     y += 10;
//     doc.setFontSize(11);

//     detalleCortes.forEach((corte) => {
//       if (y > 250) {
//         doc.addPage();
//         y = 20;
//       }

//       doc.setFontSize(12);
//       doc.text(`${corte.nombre}`, 20, y);

//       y += 6;
//       doc.setFontSize(11);
//       doc.text(`Tipo de carne: ${corte.tipo}`, 25, y);

//       y += 6;
//       doc.text(`Porcentaje asignado: ${corte.porcentaje}%`, 25, y);

//       y += 6;
//       doc.text(`Peso asignado: ${corte.kg.toFixed(2)} kg`, 25, y);

//       y += 6;
//       doc.text(`Precio por kilo: $${corte.precio.toLocaleString()}`, 25, y);

//       y += 6;
//       doc.text(`Costo del corte: $${corte.costo.toLocaleString()}`, 25, y);

//       y += 10;
//       doc.line(20, y, 190, y);
//       y += 8;
//     });

//     if (y > 240) {
//       doc.addPage();
//       y = 20;
//     }

//     doc.setFontSize(16);
//     doc.text("Totales finales", 20, y);

//     y += 10;
//     doc.setFontSize(12);
//     doc.text(`Costo total del asado: $${costoTotal.toLocaleString()}`, 20, y);

//     y += 8;
//     doc.text(`Costo por adulto: $${costoPorAdulto.toFixed(0)}`, 20, y);

//     doc.save("resumen-asado.pdf");
//   };
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
//       <section className="w-full max-w-3xl space-y-6 text-white">

//         {/* 🔹 RESUMEN GENERAL */}
//         <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
//           <h2 className="mb-4 text-2xl font-bold">Resumen general</h2>

//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="rounded-lg bg-zinc-800 p-3">
//               <p className="text-zinc-400">Adultos</p>
//               <p className="text-lg font-semibold">{totalAdultos}</p>
//             </div>

//             <div className="rounded-lg bg-zinc-800 p-3">
//               <p className="text-zinc-400">Niños</p>
//               <p className="text-lg font-semibold">{adultos.ninos}</p>
//             </div>

//             <div className="rounded-lg bg-zinc-800 p-3">
//               <p className="text-zinc-400">Carne total</p>
//               <p className="text-lg font-semibold">{carneTotal.toFixed(2)} kg</p>
//             </div>

//             <div className="rounded-lg bg-zinc-800 p-3">
//               <p className="text-zinc-400">Carbón</p>
//               <p className="text-lg font-semibold">{carbonTotal.toFixed(2)} kg</p>
//             </div>
//           </div>

//           <div className="mt-4 text-sm">
//             <p>
//               Porcentajes:{" "}
//               <span
//                 className={
//                   totalPorcentajes === 100
//                     ? "text-green-400"
//                     : "text-red-400"
//                 }
//               >
//                 {totalPorcentajes}%
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* 🔹 DETALLE POR CORTE */}
//         {detalleCortes.length > 0 && (
//           <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
//             <h2 className="mb-4 text-2xl font-bold">Detalle por corte</h2>

//             {["Vacuno", "Cerdo", "Pollo"].map((tipo) => {
//               const cortesPorTipo = detalleCortes.filter((corte) => corte.tipo === tipo);

//               if (cortesPorTipo.length === 0) return null;

//               return (
//                 <div key={tipo} className="mb-6">
//                   <h3
//                     className={`mb-3 text-xl font-semibold ${tipo === "Vacuno"
//                       ? "text-red-300"
//                       : tipo === "Cerdo"
//                         ? "text-orange-300"
//                         : "text-yellow-300"
//                       }`}
//                   >
//                     {tipo}
//                   </h3>

//                   <div className="space-y-3">
//                     {cortesPorTipo.map((corte) => (
//                       <div
//                         key={corte.nombre}
//                         className="rounded-lg bg-zinc-800 p-4"
//                       >
//                         <div className="flex justify-between">
//                           <p className="font-semibold text-white">{corte.nombre}</p>
//                           <p>{corte.porcentaje}%</p>
//                         </div>

//                         <div className="mt-2 text-sm text-zinc-300">
//                           <p>Peso asignado: {corte.kg.toFixed(2)} kg</p>
//                           <p>Precio por kilo: ${corte.precio.toLocaleString()}</p>
//                         </div>

//                         <p className="mt-2 font-semibold text-green-400">
//                           Costo del corte: ${corte.costo.toLocaleString()}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//         {/* 🔹 TOTALES */}
//         <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
//           <h2 className="mb-4 text-2xl font-bold">Totales</h2>

//           {porcentajesValidos ? (
//             <div className="space-y-3">
//               <div className="flex justify-between text-lg">
//                 <span>Costo total</span>
//                 <span className="font-semibold text-yellow-400">
//                   ${costoTotal.toLocaleString()}
//                 </span>
//               </div>

//               <div className="flex justify-between text-lg">
//                 <span>Costo por adulto</span>
//                 <span className="font-semibold text-green-400">
//                   ${costoPorAdulto.toFixed(0)}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <div className="rounded-lg bg-red-950 p-4 text-red-300 text-sm">
//               Ajusta los porcentajes hasta que sumen 100% para ver los totales.
//             </div>
//           )}
//         </div>

//         {/* 🔹 BOTONES */}
//         <div className="space-y-3">
//           <button
//             onClick={generarPDF}
//             disabled={!porcentajesValidos}
//             className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-zinc-600"
//           >
//             Descargar PDF
//           </button>

//           <button
//             onClick={reiniciarCalculo}
//             className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
//           >
//             Reiniciar cálculo
//           </button>
//         </div>

//       </section>

//     </main>
//   );
// }
