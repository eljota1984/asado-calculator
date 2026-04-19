"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import SelectorPersonas from "../components/SelectorPersonas";
import SelectorCarnes from "../components/SelectorCarnes";
import { productosAsado } from "../lib/datos";

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
  embutidos: string[];
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
      embutidos: [],
    });

  const gramosPorPersona = {
    alto: 550,
    normal: 420,
    bajo: 320,
    ninos: 220,
  };

  const reiniciarCalculo = () => {
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
      embutidos: [],
    });
  };

  const totalPersonas =
    adultos.alto +
    adultos.normal +
    adultos.bajo +
    adultos.ninos;

  const totalAdultos =
    adultos.alto + adultos.normal + adultos.bajo;

  const gramosTotales =
    adultos.alto * gramosPorPersona.alto +
    adultos.normal * gramosPorPersona.normal +
    adultos.bajo * gramosPorPersona.bajo +
    adultos.ninos * gramosPorPersona.ninos;

  const kilosTotales = gramosTotales / 1000;

  const seleccionados = useMemo(() => {
    const todos = [
      ...productosAsado.vacuno,
      ...productosAsado.cerdo,
      ...productosAsado.pollo,
      ...productosAsado.embutidos,
    ];

    const nombres = [
      ...cortesSeleccionados.vacuno,
      ...cortesSeleccionados.cerdo,
      ...cortesSeleccionados.pollo,
      ...cortesSeleccionados.embutidos,
    ];

    return todos.filter((item) =>
      nombres.includes(item.nombre)
    );
  }, [cortesSeleccionados]);

  const cantidadSeleccionados = seleccionados.length;

  const precioPromedio =
    cantidadSeleccionados > 0
      ? seleccionados.reduce((acc, item) => acc + item.precio, 0) /
        cantidadSeleccionados
      : 0;

  const costoEstimado =
    cantidadSeleccionados > 0 ? kilosTotales * precioPromedio : 0;

  const costoPorAdulto =
    totalAdultos > 0 ? costoEstimado / totalAdultos : 0;

  const resumenPorTipo = [
    {
      nombre: "Vacuno",
      cantidad: cortesSeleccionados.vacuno.length,
    },
    {
      nombre: "Cerdo",
      cantidad: cortesSeleccionados.cerdo.length,
    },
    {
      nombre: "Pollo",
      cantidad: cortesSeleccionados.pollo.length,
    },
    {
      nombre: "Embutidos",
      cantidad: cortesSeleccionados.embutidos.length,
    },
  ];

  const generarPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.text("Resumen del Asado", 20, y);

    y += 12;
    doc.setFontSize(12);
    doc.text(`Adultos: ${totalAdultos}`, 20, y);

    y += 8;
    doc.text(`Ninos: ${adultos.ninos}`, 20, y);

    y += 8;
    doc.text(`Total personas: ${totalPersonas}`, 20, y);

    y += 8;
    doc.text(`Carne estimada: ${kilosTotales.toFixed(2)} kg`, 20, y);

    y += 8;
    doc.text(
      `Costo estimado: $${Math.round(costoEstimado).toLocaleString("es-CL")}`,
      20,
      y
    );

    y += 8;
    doc.text(
      `Costo por adulto: $${Math.round(costoPorAdulto).toLocaleString("es-CL")}`,
      20,
      y
    );

    y += 12;
    doc.setFontSize(16);
    doc.text("Seleccion por tipo", 20, y);

    y += 10;
    doc.setFontSize(12);

    resumenPorTipo.forEach((item) => {
      doc.text(`${item.nombre}: ${item.cantidad}`, 20, y);
      y += 8;
    });

    y += 6;
    doc.setFontSize(16);
    doc.text("Productos seleccionados", 20, y);

    y += 10;
    doc.setFontSize(11);

    if (seleccionados.length === 0) {
      doc.text("No hay productos seleccionados.", 20, y);
    } else {
      seleccionados.forEach((producto) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.text(`${producto.nombre}`, 20, y);
        y += 6;

        doc.text(
          `Tipo: ${producto.tipo} | Categoria: ${producto.categoria}`,
          25,
          y
        );
        y += 6;

        doc.text(
          `Precio: $${producto.precio.toLocaleString("es-CL")}${
            producto.tipoVenta === "pack" ? " / pack" : " / kg"
          }`,
          25,
          y
        );
        y += 6;

        if (producto.descripcionVenta) {
          doc.text(`Venta: ${producto.descripcionVenta}`, 25, y);
          y += 6;
        }

        if (producto.pesoPromedio) {
          doc.text(
            `Peso promedio: ${producto.pesoPromedio.toFixed(2)} kg`,
            25,
            y
          );
          y += 6;
        }

        doc.line(20, y, 190, y);
        y += 8;
      });
    }

    doc.save("resumen-asado-v2.pdf");
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
          <h1 className="text-center text-3xl font-bold md:text-4xl">
            Calculadora de Asados 🔥
          </h1>

          <p className="mt-2 text-center text-sm text-zinc-400">
            Estima kilos, costos y selección de productos
          </p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={generarPDF}
            className="w-full rounded-2xl bg-green-600 px-4 py-4 text-lg font-semibold hover:bg-green-700"
          >
            Descargar PDF
          </button>

          <button
            onClick={reiniciarCalculo}
            className="w-full rounded-2xl bg-red-600 px-4 py-4 text-lg font-semibold hover:bg-red-700"
          >
            Reiniciar cálculo
          </button>
        </div>

        <SelectorPersonas
          adultos={adultos}
          setAdultos={setAdultos}
        />

        <SelectorCarnes
          cortesSeleccionados={cortesSeleccionados}
          setCortesSeleccionados={setCortesSeleccionados}
        />

        <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">
            Resumen del asado
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-zinc-400">Personas</p>
              <p className="text-2xl font-bold">{totalPersonas}</p>
            </div>

            <div className="rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-zinc-400">Carne estimada</p>
              <p className="text-2xl font-bold">
                {kilosTotales.toFixed(2)} kg
              </p>
            </div>

            <div className="rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-zinc-400">Productos elegidos</p>
              <p className="text-2xl font-bold">{cantidadSeleccionados}</p>
            </div>

            <div className="rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-zinc-400">Costo estimado</p>
              <p className="text-2xl font-bold">
                ${Math.round(costoEstimado).toLocaleString("es-CL")}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-zinc-400">Adultos que pagan</p>
              <p className="text-2xl font-bold">{totalAdultos}</p>
            </div>

            <div className="rounded-xl bg-zinc-800 p-4">
              <p className="text-sm text-zinc-400">Costo por adulto</p>
              <p className="text-2xl font-bold">
                ${Math.round(costoPorAdulto).toLocaleString("es-CL")}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-zinc-800 p-4">
            <p className="mb-2 font-semibold">Selección actual</p>

            <div className="space-y-1 text-sm text-zinc-300">
              {resumenPorTipo.map((item) => (
                <p key={item.nombre}>
                  {item.nombre}: {item.cantidad}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
// "use client";

// import { useMemo, useState } from "react";
// import SelectorPersonas from "../components/SelectorPersonas";
// import SelectorCarnes from "../components/SelectorCarnes";
// import { productosAsado } from "../lib/datos";

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
//   embutidos: string[];
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
//       embutidos: [],
//     });

//   const gramosPorPersona = {
//     alto: 550,
//     normal: 420,
//     bajo: 320,
//     ninos: 220,
//   };

//   const reiniciarCalculo = () => {
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
//       embutidos: [],
//     });
//   };

//   const totalPersonas =
//     adultos.alto +
//     adultos.normal +
//     adultos.bajo +
//     adultos.ninos;

//   const gramosTotales =
//     adultos.alto * gramosPorPersona.alto +
//     adultos.normal * gramosPorPersona.normal +
//     adultos.bajo * gramosPorPersona.bajo +
//     adultos.ninos * gramosPorPersona.ninos;

//   const kilosTotales = gramosTotales / 1000;

//   const seleccionados = useMemo(() => {
//     const todos = [
//       ...productosAsado.vacuno,
//       ...productosAsado.cerdo,
//       ...productosAsado.pollo,
//       ...productosAsado.embutidos,
//     ];

//     const nombres = [
//       ...cortesSeleccionados.vacuno,
//       ...cortesSeleccionados.cerdo,
//       ...cortesSeleccionados.pollo,
//       ...cortesSeleccionados.embutidos,
//     ];

//     return todos.filter((item) =>
//       nombres.includes(item.nombre)
//     );
//   }, [cortesSeleccionados]);

//   const cantidadSeleccionados = seleccionados.length;

//   const precioPromedio =
//     cantidadSeleccionados > 0
//       ? seleccionados.reduce((acc, item) => acc + item.precio, 0) /
//         cantidadSeleccionados
//       : 0;

//   const costoEstimado =
//     cantidadSeleccionados > 0 ? kilosTotales * precioPromedio : 0;

//   const resumenPorTipo = [
//     {
//       nombre: "Vacuno",
//       cantidad: cortesSeleccionados.vacuno.length,
//     },
//     {
//       nombre: "Cerdo",
//       cantidad: cortesSeleccionados.cerdo.length,
//     },
//     {
//       nombre: "Pollo",
//       cantidad: cortesSeleccionados.pollo.length,
//     },
//     {
//       nombre: "Embutidos",
//       cantidad: cortesSeleccionados.embutidos.length,
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
//       <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
//         <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
//           <h1 className="text-center text-3xl font-bold md:text-4xl">
//             Calculadora de Asados 🔥
//           </h1>

//           <p className="mt-2 text-center text-sm text-zinc-400">
//             Estima kilos, costos y selección de productos
//           </p>
//         </section>

//         <button
//           onClick={reiniciarCalculo}
//           className="w-full rounded-2xl bg-red-600 px-4 py-4 text-lg font-semibold hover:bg-red-700"
//         >
//           Reiniciar cálculo
//         </button>

//         <SelectorPersonas
//           adultos={adultos}
//           setAdultos={setAdultos}
//         />

//         <SelectorCarnes
//           cortesSeleccionados={cortesSeleccionados}
//           setCortesSeleccionados={setCortesSeleccionados}
//         />

//         <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
//           <h2 className="mb-4 text-xl font-bold">
//             Resumen del asado
//           </h2>

//           <div className="grid gap-3 md:grid-cols-2">
//             <div className="rounded-xl bg-zinc-800 p-4">
//               <p className="text-sm text-zinc-400">Personas</p>
//               <p className="text-2xl font-bold">{totalPersonas}</p>
//             </div>

//             <div className="rounded-xl bg-zinc-800 p-4">
//               <p className="text-sm text-zinc-400">Carne estimada</p>
//               <p className="text-2xl font-bold">
//                 {kilosTotales.toFixed(2)} kg
//               </p>
//             </div>

//             <div className="rounded-xl bg-zinc-800 p-4">
//               <p className="text-sm text-zinc-400">Productos elegidos</p>
//               <p className="text-2xl font-bold">{cantidadSeleccionados}</p>
//             </div>

//             <div className="rounded-xl bg-zinc-800 p-4">
//               <p className="text-sm text-zinc-400">Costo estimado</p>
//               <p className="text-2xl font-bold">
//                 ${Math.round(costoEstimado).toLocaleString("es-CL")}
//               </p>
//             </div>
//           </div>

//           <div className="mt-5 rounded-xl bg-zinc-800 p-4">
//             <p className="mb-2 font-semibold">Selección actual</p>

//             <div className="space-y-1 text-sm text-zinc-300">
//               {resumenPorTipo.map((item) => (
//                 <p key={item.nombre}>
//                   {item.nombre}: {item.cantidad}
//                 </p>
//               ))}
//             </div>
//           </div>
           
//         </section>
//       </div>
//     </main>
//   );
// }
// // "use client";

// // import { useMemo, useState } from "react";
// // import {
// //   productosAsado,
// //   type ProductoAsado,
// //   type CategoriaCorte,
// //   type TipoVenta,
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
// //   const [embutidosAbierto, setEmbutidosAbierto] = useState(false);

// //   const [busqueda, setBusqueda] = useState("");
// //   const [soloParrilla, setSoloParrilla] = useState(false);
// //   const [filtroCategoria, setFiltroCategoria] =
// //     useState<FiltroCategoria>("todos");

// //   const toggleCorte = (
// //     tipo: keyof CortesSeleccionadosState,
// //     nombreProducto: string
// //   ) => {
// //     const actuales = cortesSeleccionados[tipo];

// //     const nuevos = actuales.includes(nombreProducto)
// //       ? actuales.filter((item) => item !== nombreProducto)
// //       : [...actuales, nombreProducto];

// //     setCortesSeleccionados({
// //       ...cortesSeleccionados,
// //       [tipo]: nuevos,
// //     });
// //   };

// //   const toggleTipo = (
// //     tipo: "vacuno" | "cerdo" | "pollo" | "embutidos"
// //   ) => {
// //     if (tipo === "vacuno") setVacunoAbierto(!vacunoAbierto);
// //     if (tipo === "cerdo") setCerdoAbierto(!cerdoAbierto);
// //     if (tipo === "pollo") setPolloAbierto(!polloAbierto);
// //     if (tipo === "embutidos") setEmbutidosAbierto(!embutidosAbierto);
// //   };

// //   const limpiarTipo = (tipo: keyof CortesSeleccionadosState) => {
// //     setCortesSeleccionados({
// //       ...cortesSeleccionados,
// //       [tipo]: [],
// //     });
// //   };

// //   const filtrarProductos = (lista: ProductoAsado[]) => {
// //     return [...lista]
// //       .filter((producto) => (soloParrilla ? producto.parrilla : true))
// //       .filter((producto) =>
// //         filtroCategoria === "todos"
// //           ? true
// //           : producto.categoria === filtroCategoria
// //       )
// //       .filter((producto) =>
// //         producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
// //       )
// //       .sort((a, b) => a.nombre.localeCompare(b.nombre));
// //   };

// //   const vacunoFiltrado = useMemo(
// //     () => filtrarProductos(productosAsado.vacuno),
// //     [busqueda, soloParrilla, filtroCategoria]
// //   );

// //   const cerdoFiltrado = useMemo(
// //     () => filtrarProductos(productosAsado.cerdo),
// //     [busqueda, soloParrilla, filtroCategoria]
// //   );

// //   const polloFiltrado = useMemo(
// //     () => filtrarProductos(productosAsado.pollo),
// //     [busqueda, soloParrilla, filtroCategoria]
// //   );

// //   const embutidosFiltrado = useMemo(
// //     () => filtrarProductos(productosAsado.embutidos),
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

// //   const getTipoVentaBadge = (tipoVenta: TipoVenta) => {
// //     if (tipoVenta === "pack") {
// //       return {
// //         texto: "📦 Pack",
// //         className: "bg-blue-900 text-blue-300",
// //       };
// //     }

// //     if (tipoVenta === "bandeja") {
// //       return {
// //         texto: "🧺 Bandeja",
// //         className: "bg-purple-900 text-purple-300",
// //       };
// //     }

// //     if (tipoVenta === "unidad") {
// //       return {
// //         texto: "🧩 Unidad",
// //         className: "bg-cyan-900 text-cyan-300",
// //       };
// //     }

// //     return {
// //       texto: "⚖️ Peso variable",
// //       className: "bg-zinc-700 text-zinc-200",
// //     };
// //   };

// //   const renderInfoVenta = (producto: ProductoAsado) => {
// //     const partes: string[] = [];

// //     if (producto.pesoPromedio) {
// //       partes.push(`Promedio: ${producto.pesoPromedio.toFixed(2)} kg`);
// //     }

// //     if (producto.pesoMinimo && producto.pesoMaximo) {
// //       partes.push(
// //         `Rango: ${producto.pesoMinimo.toFixed(2)}–${producto.pesoMaximo.toFixed(
// //           2
// //         )} kg`
// //       );
// //     }

// //     if (producto.unidadesPorPack) {
// //       partes.push(`${producto.unidadesPorPack} unidades`);
// //     }

// //     if (producto.descripcionVenta) {
// //       partes.push(producto.descripcionVenta);
// //     }

// //     return partes;
// //   };

// //   const renderBloque = (
// //     tipo: keyof CortesSeleccionadosState,
// //     titulo: string,
// //     colorTitulo: string,
// //     lista: ProductoAsado[]
// //   ) => {
// //     if (lista.length === 0) {
// //       return (
// //         <div className="ml-6 rounded-lg bg-zinc-800 p-4">
// //           <div className="mb-4 flex items-center justify-between">
// //             <p className={`font-semibold ${colorTitulo}`}>{titulo}</p>

// //             {cortesSeleccionados[tipo].length > 0 && (
// //               <button
// //                 onClick={() => limpiarTipo(tipo)}
// //                 className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
// //               >
// //                 Limpiar
// //               </button>
// //             )}
// //           </div>

// //           <p className="text-sm text-zinc-400">
// //             No hay productos que coincidan con el filtro actual.
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
// //               onClick={() => limpiarTipo(tipo)}
// //               className="rounded-lg bg-zinc-900 px-3 py-1 text-sm text-red-300 hover:bg-zinc-700"
// //             >
// //               Limpiar
// //             </button>
// //           )}
// //         </div>

// //         <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
// //           {lista.map((producto) => {
// //             const badgeCategoria = getCategoriaBadge(producto.categoria);
// //             const badgeVenta = getTipoVentaBadge(producto.tipoVenta);
// //             const infoVenta = renderInfoVenta(producto);

// //             return (
// //               <label
// //                 key={producto.nombre}
// //                 className="flex items-start gap-3 rounded-lg bg-zinc-900 p-3 text-sm hover:bg-zinc-700"
// //               >
// //                 <input
// //                   type="checkbox"
// //                   checked={cortesSeleccionados[tipo].includes(producto.nombre)}
// //                   onChange={() => toggleCorte(tipo, producto.nombre)}
// //                   className="mt-1"
// //                 />

// //                 <div className="space-y-1">
// //                   <p className="font-medium text-white">{producto.nombre}</p>

// //                   <p className="text-zinc-400">
// //                     ${producto.precio.toLocaleString()}
// //                     {producto.tipoVenta === "pack" ? " / pack" : " / kg"}
// //                   </p>

// //                   <div className="flex flex-wrap gap-2">
// //                     {producto.parrilla && (
// //                       <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-green-400">
// //                         🔥 Parrilla
// //                       </span>
// //                     )}

// //                     <span
// //                       className={`rounded-full px-2 py-1 text-xs ${badgeCategoria.className}`}
// //                     >
// //                       {badgeCategoria.texto}
// //                     </span>

// //                     <span
// //                       className={`rounded-full px-2 py-1 text-xs ${badgeVenta.className}`}
// //                     >
// //                       {badgeVenta.texto}
// //                     </span>
// //                   </div>

// //                   {infoVenta.length > 0 && (
// //                     <div className="pt-1 text-xs text-zinc-400">
// //                       {infoVenta.map((linea) => (
// //                         <p key={linea}>{linea}</p>
// //                       ))}
// //                     </div>
// //                   )}
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
// //         Productos para el asado
// //       </h2>

// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           placeholder="Buscar producto o corte..."
// //           value={busqueda}
// //           onChange={(e) => setBusqueda(e.target.value)}
// //           className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 outline-none focus:border-yellow-500"
// //         />
// //       </div>

// //       <div className="mb-6 space-y-4">
// //         <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3 text-white">
// //           <input
// //             type="checkbox"
// //             checked={soloParrilla}
// //             onChange={() => setSoloParrilla(!soloParrilla)}
// //           />
// //           <span>Mostrar solo productos de parrilla 🔥</span>
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
// //         <button
// //           onClick={() => toggleTipo("vacuno")}
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
// //           renderBloque(
// //             "vacuno",
// //             "Productos de vacuno",
// //             "text-red-300",
// //             vacunoFiltrado
// //           )}

// //         <button
// //           onClick={() => toggleTipo("cerdo")}
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
// //           renderBloque(
// //             "cerdo",
// //             "Productos de cerdo",
// //             "text-orange-300",
// //             cerdoFiltrado
// //           )}

// //         <button
// //           onClick={() => toggleTipo("pollo")}
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
// //           renderBloque(
// //             "pollo",
// //             "Productos de pollo",
// //             "text-yellow-300",
// //             polloFiltrado
// //           )}

// //         <button
// //           onClick={() => toggleTipo("embutidos")}
// //           className="flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-lg font-medium hover:bg-zinc-700"
// //         >
// //           <span>
// //             Embutidos{" "}
// //             <span
// //               className={colorContador(cortesSeleccionados.embutidos.length)}
// //             >
// //               ({cortesSeleccionados.embutidos.length})
// //             </span>
// //           </span>
// //           <span className="text-2xl">{embutidosAbierto ? "−" : "+"}</span>
// //         </button>

// //         {embutidosAbierto &&
// //           renderBloque(
// //             "embutidos",
// //             "Productos de embutidos",
// //             "text-pink-300",
// //             embutidosFiltrado
// //           )}

// //         <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
// //           <p className="font-semibold text-white">Seleccionados:</p>

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

// //           <p className="text-zinc-300">
// //             Embutidos:{" "}
// //             {cortesSeleccionados.embutidos.length > 0
// //               ? cortesSeleccionados.embutidos.join(", ")
// //               : "Ninguno"}
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// // // "use client";

// // // import { useMemo, useState } from "react";
// // // import SelectorPersonas from "../components/SelectorPersonas";
// // // import SelectorCarnes from "../components/SelectorCarnes";
// // // import { productosAsado } from "../lib/datos";

// // // /* ======================================================
// // //    TIPOS
// // // ====================================================== */

// // // export interface AdultosState {
// // //   alto: number;
// // //   normal: number;
// // //   bajo: number;
// // //   ninos: number;
// // // }

// // // export interface CortesSeleccionadosState {
// // //   vacuno: string[];
// // //   cerdo: string[];
// // //   pollo: string[];
// // //   embutidos: string[];
// // // }

// // // /* ======================================================
// // //    PAGE
// // // ====================================================== */

// // // export default function Home() {
// // //   const [adultos, setAdultos] = useState<AdultosState>({
// // //     alto: 0,
// // //     normal: 0,
// // //     bajo: 0,
// // //     ninos: 0,
// // //   });

// // //   const [cortesSeleccionados, setCortesSeleccionados] =
// // //     useState<CortesSeleccionadosState>({
// // //       vacuno: [],
// // //       cerdo: [],
// // //       pollo: [],
// // //       embutidos: [],
// // //     });

// // //   /* ======================================================
// // //      CONFIG CONSUMO BASE
// // //   ====================================================== */

// // //   const gramosPorPersona = {
// // //     alto: 550,
// // //     normal: 420,
// // //     bajo: 320,
// // //     ninos: 220,
// // //   };

// // //   /* ======================================================
// // //      REINICIAR
// // //   ====================================================== */

// // //   const reiniciarCalculo = () => {
// // //     setAdultos({
// // //       alto: 0,
// // //       normal: 0,
// // //       bajo: 0,
// // //       ninos: 0,
// // //     });

// // //     setCortesSeleccionados({
// // //       vacuno: [],
// // //       cerdo: [],
// // //       pollo: [],
// // //       embutidos: [],
// // //     });
// // //   };

// // //   /* ======================================================
// // //      TOTAL PERSONAS
// // //   ====================================================== */

// // //   const totalPersonas =
// // //     adultos.alto +
// // //     adultos.normal +
// // //     adultos.bajo +
// // //     adultos.ninos;

// // //   /* ======================================================
// // //      GRAMAJE TOTAL
// // //   ====================================================== */

// // //   const gramosTotales =
// // //     adultos.alto * gramosPorPersona.alto +
// // //     adultos.normal * gramosPorPersona.normal +
// // //     adultos.bajo * gramosPorPersona.bajo +
// // //     adultos.ninos * gramosPorPersona.ninos;

// // //   const kilosTotales = gramosTotales / 1000;

// // //   /* ======================================================
// // //      PRODUCTOS SELECCIONADOS
// // //   ====================================================== */

// // //   const seleccionados = useMemo(() => {
// // //     const todos = [
// // //       ...productosAsado.vacuno,
// // //       ...productosAsado.cerdo,
// // //       ...productosAsado.pollo,
// // //       ...productosAsado.embutidos,
// // //     ];

// // //     const nombres = [
// // //       ...cortesSeleccionados.vacuno,
// // //       ...cortesSeleccionados.cerdo,
// // //       ...cortesSeleccionados.pollo,
// // //       ...cortesSeleccionados.embutidos,
// // //     ];

// // //     return todos.filter((item) =>
// // //       nombres.includes(item.nombre)
// // //     );
// // //   }, [cortesSeleccionados]);

// // //   const cantidadSeleccionados = seleccionados.length;

// // //   /* ======================================================
// // //      PRECIO PROMEDIO
// // //   ====================================================== */

// // //   const precioPromedio =
// // //     cantidadSeleccionados > 0
// // //       ? seleccionados.reduce(
// // //           (acc, item) => acc + item.precio,
// // //           0
// // //         ) / cantidadSeleccionados
// // //       : 0;

// // //   /* ======================================================
// // //      COSTO TOTAL ESTIMADO
// // //   ====================================================== */

// // //   const costoEstimado =
// // //     cantidadSeleccionados > 0
// // //       ? kilosTotales * precioPromedio
// // //       : 0;

// // //   /* ======================================================
// // //      RESUMEN POR TIPO
// // //   ====================================================== */

// // //   const resumenPorTipo = [
// // //     {
// // //       nombre: "Vacuno",
// // //       cantidad: cortesSeleccionados.vacuno.length,
// // //     },
// // //     {
// // //       nombre: "Cerdo",
// // //       cantidad: cortesSeleccionados.cerdo.length,
// // //     },
// // //     {
// // //       nombre: "Pollo",
// // //       cantidad: cortesSeleccionados.pollo.length,
// // //     },
// // //     {
// // //       nombre: "Embutidos",
// // //       cantidad: cortesSeleccionados.embutidos.length,
// // //     },
// // //   ];

// // //   /* ======================================================
// // //      UI
// // //   ====================================================== */

// // //   return (
// // //     <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
// // //       <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
// // //         {/* TÍTULO */}
// // //         <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // //           <h1 className="text-center text-3xl font-bold md:text-4xl">
// // //             Calculadora de Asados 🔥
// // //           </h1>

// // //           <p className="mt-2 text-center text-sm text-zinc-400">
// // //             Estima kilos, costos y mezcla de carnes
// // //           </p>
// // //         </section>

// // //         {/* BOTÓN REINICIAR */}
// // //         <button
// // //           onClick={reiniciarCalculo}
// // //           className="w-full rounded-2xl bg-red-600 px-4 py-4 text-lg font-semibold hover:bg-red-700"
// // //         >
// // //           Reiniciar cálculo
// // //         </button>

// // //         {/* PERSONAS */}
// // //         <SelectorPersonas
// // //           adultos={adultos}
// // //           setAdultos={setAdultos}
// // //         />

// // //         {/* CARNES */}
// // //         <SelectorCarnes
// // //           cortesSeleccionados={cortesSeleccionados}
// // //           setCortesSeleccionados={
// // //             setCortesSeleccionados
// // //           }
// // //         />

// // //         {/* RESUMEN */}
// // //         <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // //           <h2 className="mb-4 text-xl font-bold">
// // //             Resumen del asado
// // //           </h2>

// // //           <div className="grid gap-3 md:grid-cols-2">
// // //             <div className="rounded-xl bg-zinc-800 p-4">
// // //               <p className="text-sm text-zinc-400">
// // //                 Personas
// // //               </p>
// // //               <p className="text-2xl font-bold">
// // //                 {totalPersonas}
// // //               </p>
// // //             </div>

// // //             <div className="rounded-xl bg-zinc-800 p-4">
// // //               <p className="text-sm text-zinc-400">
// // //                 Carne estimada
// // //               </p>
// // //               <p className="text-2xl font-bold">
// // //                 {kilosTotales.toFixed(2)} kg
// // //               </p>
// // //             </div>

// // //             <div className="rounded-xl bg-zinc-800 p-4">
// // //               <p className="text-sm text-zinc-400">
// // //                 Productos elegidos
// // //               </p>
// // //               <p className="text-2xl font-bold">
// // //                 {cantidadSeleccionados}
// // //               </p>
// // //             </div>

// // //             <div className="rounded-xl bg-zinc-800 p-4">
// // //               <p className="text-sm text-zinc-400">
// // //                 Costo estimado
// // //               </p>
// // //               <p className="text-2xl font-bold">
// // //                 $
// // //                 {Math.round(
// // //                   costoEstimado
// // //                 ).toLocaleString("es-CL")}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           {/* DETALLE */}
// // //           <div className="mt-5 rounded-xl bg-zinc-800 p-4">
// // //             <p className="mb-2 font-semibold">
// // //               Selección actual
// // //             </p>

// // //             <div className="space-y-1 text-sm text-zinc-300">
// // //               {resumenPorTipo.map((item) => (
// // //                 <p key={item.nombre}>
// // //                   {item.nombre}:{" "}
// // //                   {item.cantidad > 0
// // //                     ? item.cantidad
// // //                     : 0}
// // //                 </p>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </div>
// // //     </main>
// // //   );
// // // }
// // // // "use client";
// // // // import { useEffect, useMemo, useState } from "react";
// // // // import jsPDF from "jspdf";
// // // // import SelectorPersonas from "../components/SelectorPersonas";
// // // // import SelectorCarnes from "../components/SelectorCarnes";
// // // // import SelectorPorcentajes from "../components/SelectorPorcentajes";
// // // // import { carnes } from "../lib/datos";
// // // // import ResumenGrafico from "../components/ResumenGrafico";


// // // // export interface AdultosState {
// // // //   alto: number;
// // // //   normal: number;
// // // //   bajo: number;
// // // //   ninos: number;
// // // // }

// // // // export interface CortesSeleccionadosState {
// // // //   vacuno: string[];
// // // //   cerdo: string[];
// // // //   pollo: string[];
// // // // }

// // // // export interface PorcentajesCortesState {
// // // //   [nombreCorte: string]: number;
// // // // }

// // // // interface CorteConPrecio {
// // // //   nombre: string;
// // // //   precio: number;
// // // // }

// // // // export default function Home() {
// // // //   const [adultos, setAdultos] = useState<AdultosState>({
// // // //     alto: 0,
// // // //     normal: 0,
// // // //     bajo: 0,
// // // //     ninos: 0,
// // // //   });

// // // //   const [cortesSeleccionados, setCortesSeleccionados] =
// // // //     useState<CortesSeleccionadosState>({
// // // //       vacuno: [],
// // // //       cerdo: [],
// // // //       pollo: [],
// // // //     });

// // // //   const [porcentajesCortes, setPorcentajesCortes] =
// // // //     useState<PorcentajesCortesState>({});

// // // //   useEffect(() => {
// // // //     const adultosGuardados = localStorage.getItem("adultos");
// // // //     const cortesGuardados = localStorage.getItem("cortesSeleccionados");
// // // //     const porcentajesGuardados = localStorage.getItem("porcentajesCortes");


// // // //     if (adultosGuardados) {
// // // //       setAdultos(JSON.parse(adultosGuardados));
// // // //     }

// // // //     if (cortesGuardados) {
// // // //       setCortesSeleccionados(JSON.parse(cortesGuardados));
// // // //     }

// // // //     if (porcentajesGuardados) {
// // // //       setPorcentajesCortes(JSON.parse(porcentajesGuardados));
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     localStorage.setItem("adultos", JSON.stringify(adultos));
// // // //   }, [adultos]);

// // // //   // useEffect(() => {
// // // //   //   reiniciarCalculoAutomatico();
// // // //   // }, []);

// // // //   useEffect(() => {
// // // //     localStorage.setItem(
// // // //       "cortesSeleccionados",
// // // //       JSON.stringify(cortesSeleccionados)
// // // //     );
// // // //   }, [cortesSeleccionados]);

// // // //   useEffect(() => {
// // // //     localStorage.setItem(
// // // //       "porcentajesCortes",
// // // //       JSON.stringify(porcentajesCortes)
// // // //     );
// // // //   }, [porcentajesCortes]);

// // // //   const cortesActivos = useMemo(() => {
// // // //     return [
// // // //       ...cortesSeleccionados.vacuno,
// // // //       ...cortesSeleccionados.cerdo,
// // // //       ...cortesSeleccionados.pollo,
// // // //     ];
// // // //   }, [cortesSeleccionados]);

// // // //   const todosLosCortes: CorteConPrecio[] = [
// // // //     ...carnes.vacuno,
// // // //     ...carnes.cerdo,
// // // //     ...carnes.pollo,
// // // //   ];

// // // //   const carneTotal =
// // // //     adultos.alto * 0.5 +
// // // //     adultos.normal * 0.4 +
// // // //     adultos.bajo * 0.3 +
// // // //     adultos.ninos * 0.2;

// // // //   const carbonTotal = carneTotal;

// // // //   const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

// // // //   const totalPorcentajes = cortesActivos.reduce((acc, corte) => {
// // // //     return acc + (porcentajesCortes[corte] ?? 0);
// // // //   }, 0);

// // // //   const porcentajesValidos = totalPorcentajes === 100;

// // // //   const detalleCortes = cortesActivos.map((nombreCorte) => {
// // // //     let tipo = "";

// // // //     if (cortesSeleccionados.vacuno.includes(nombreCorte)) tipo = "Vacuno";
// // // //     if (cortesSeleccionados.cerdo.includes(nombreCorte)) tipo = "Cerdo";
// // // //     if (cortesSeleccionados.pollo.includes(nombreCorte)) tipo = "Pollo";

// // // //     const corteData = todosLosCortes.find((corte) => corte.nombre === nombreCorte);

// // // //     const porcentaje = porcentajesCortes[nombreCorte] ?? 0;
// // // //     const kg = carneTotal * (porcentaje / 100);
// // // //     const precio = corteData?.precio ?? 0;
// // // //     const costo = kg * precio;

// // // //     return {
// // // //       nombre: nombreCorte,
// // // //       tipo,
// // // //       porcentaje,
// // // //       kg,
// // // //       precio,
// // // //       costo,
// // // //     };
// // // //   });
  

// // // //   const costoTotal = detalleCortes.reduce((acc, corte) => acc + corte.costo, 0);

// // // //   const costoPorAdulto = totalAdultos > 0 ? costoTotal / totalAdultos : 0;

// // // //   const reiniciarCalculo = () => {
// // // //     if (!confirm("¿Seguro que quieres reiniciar el cálculo?")) return;

// // // //     setAdultos({
// // // //       alto: 0,
// // // //       normal: 0,
// // // //       bajo: 0,
// // // //       ninos: 0,
// // // //     });

// // // //     setCortesSeleccionados({
// // // //       vacuno: [],
// // // //       cerdo: [],
// // // //       pollo: [],
// // // //     });

// // // //     setPorcentajesCortes({});

// // // //     localStorage.removeItem("adultos");
// // // //     localStorage.removeItem("cortesSeleccionados");
// // // //     localStorage.removeItem("porcentajesCortes");
// // // //   };


// // // //   const generarPDF = () => {
// // // //     const doc = new jsPDF();

// // // //     let y = 20;

// // // //     doc.setFontSize(20);
// // // //     doc.text("Resumen del Asado", 20, y);

// // // //     y += 12;
// // // //     doc.setFontSize(12);
// // // //     doc.text(`Total de adultos: ${totalAdultos}`, 20, y);

// // // //     y += 8;
// // // //     doc.text(`Total de niños: ${adultos.ninos}`, 20, y);

// // // //     y += 8;
// // // //     doc.text(`Carne necesaria: ${carneTotal.toFixed(2)} kg`, 20, y);

// // // //     y += 8;
// // // //     doc.text(`Carbón necesario: ${carbonTotal.toFixed(2)} kg`, 20, y);

// // // //     y += 8;
// // // //     doc.text(`Total porcentajes: ${totalPorcentajes}%`, 20, y);

// // // //     y += 12;
// // // //     doc.setFontSize(16);
// // // //     doc.text("Detalle por corte", 20, y);

// // // //     y += 10;
// // // //     doc.setFontSize(11);

// // // //     detalleCortes.forEach((corte) => {
// // // //       if (y > 250) {
// // // //         doc.addPage();
// // // //         y = 20;
// // // //       }

// // // //       doc.setFontSize(12);
// // // //       doc.text(`${corte.nombre}`, 20, y);

// // // //       y += 6;
// // // //       doc.setFontSize(11);
// // // //       doc.text(`Tipo de carne: ${corte.tipo}`, 25, y);

// // // //       y += 6;
// // // //       doc.text(`Porcentaje asignado: ${corte.porcentaje}%`, 25, y);

// // // //       y += 6;
// // // //       doc.text(`Peso asignado: ${corte.kg.toFixed(2)} kg`, 25, y);

// // // //       y += 6;
// // // //       doc.text(`Precio por kilo: $${corte.precio.toLocaleString()}`, 25, y);

// // // //       y += 6;
// // // //       doc.text(`Costo del corte: $${corte.costo.toLocaleString()}`, 25, y);

// // // //       y += 10;
// // // //       doc.line(20, y, 190, y);
// // // //       y += 8;
// // // //     });

// // // //     if (y > 240) {
// // // //       doc.addPage();
// // // //       y = 20;
// // // //     }

// // // //     doc.setFontSize(16);
// // // //     doc.text("Totales finales", 20, y);

// // // //     y += 10;
// // // //     doc.setFontSize(12);
// // // //     doc.text(`Costo total del asado: $${costoTotal.toLocaleString()}`, 20, y);

// // // //     y += 8;
// // // //     doc.text(`Costo por adulto: $${costoPorAdulto.toFixed(0)}`, 20, y);

// // // //     doc.save("resumen-asado.pdf");
// // // //   };

// // // //   return (
// // // //     <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black p-8">
// // // //       <h1 className="text-4xl font-bold text-white">
// // // //         Calculadora de Asados 🔥
// // // //       </h1>
// // // //       <button
// // // //         onClick={reiniciarCalculo}
// // // //         className="w-5/8 rounded-lg bg-red-600 text-white py-3 text-xl hover:bg-red-700"
// // // //       >
// // // //         Reiniciar Cálculo
// // // //       </button>
// // // //       {/* <button
// // // //         onClick={reiniciarCalculo}
// // // //         className="w-5x1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
// // // //       >
// // // //         Reiniciar cálculo
// // // //       </button> */}



// // // //       <SelectorPersonas adultos={adultos} setAdultos={setAdultos}
// // // //       />


// // // //       <SelectorCarnes
// // // //         cortesSeleccionados={cortesSeleccionados}
// // // //         setCortesSeleccionados={setCortesSeleccionados}
// // // //       />

// // // //       <SelectorPorcentajes
// // // //         cortesSeleccionados={cortesSeleccionados}
// // // //         porcentajesCortes={porcentajesCortes}
// // // //         setPorcentajesCortes={setPorcentajesCortes}
// // // //       />
// // // //       <ResumenGrafico detalleCortes={detalleCortes} />

// // // //       <section className="w-full max-w-3xl space-y-6 text-white">

// // // //         <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // // //           <h2 className="mb-4 text-2xl font-bold">Resumen general</h2>

// // // //           <div className="grid grid-cols-2 gap-4 text-sm">
// // // //             <div className="rounded-lg bg-zinc-800 p-3">
// // // //               <p className="text-zinc-400">Adultos</p>
// // // //               <p className="text-lg font-semibold">{totalAdultos}</p>
// // // //             </div>

// // // //             <div className="rounded-lg bg-zinc-800 p-3">
// // // //               <p className="text-zinc-400">Niños</p>
// // // //               <p className="text-lg font-semibold">{adultos.ninos}</p>
// // // //             </div>

// // // //             <div className="rounded-lg bg-zinc-800 p-3">
// // // //               <p className="text-zinc-400">Carne total</p>
// // // //               <p className="text-lg font-semibold">{carneTotal.toFixed(2)} kg</p>
// // // //             </div>

// // // //             <div className="rounded-lg bg-zinc-800 p-3">
// // // //               <p className="text-zinc-400">Carbón</p>
// // // //               <p className="text-lg font-semibold">{carbonTotal.toFixed(2)} kg</p>
// // // //             </div>
// // // //           </div>

// // // //           <div className="mt-4 text-sm">
// // // //             <p>
// // // //               Porcentajes:{" "}
// // // //               <span
// // // //                 className={
// // // //                   totalPorcentajes === 100 ? "text-green-400" : "text-red-400"
// // // //                 }
// // // //               >
// // // //                 {totalPorcentajes}%
// // // //               </span>
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         {detalleCortes.length > 0 && (
// // // //           <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // // //             <h2 className="mb-4 text-2xl font-bold">Detalle por corte</h2>

// // // //             {["Vacuno", "Cerdo", "Pollo"].map((tipo) => {
// // // //               const cortesPorTipo = detalleCortes.filter(
// // // //                 (corte) => corte.tipo === tipo
// // // //               );

// // // //               if (cortesPorTipo.length === 0) return null;

// // // //               return (
// // // //                 <div key={tipo} className="mb-6">
// // // //                   <h3
// // // //                     className={`mb-3 text-xl font-semibold ${tipo === "Vacuno"
// // // //                       ? "text-red-300"
// // // //                       : tipo === "Cerdo"
// // // //                         ? "text-orange-300"
// // // //                         : "text-yellow-300"
// // // //                       }`}
// // // //                   >
// // // //                     {tipo}
// // // //                   </h3>

// // // //                   <div className="space-y-3">
// // // //                     {cortesPorTipo.map((corte) => (
// // // //                       <div
// // // //                         key={corte.nombre}
// // // //                         className="rounded-lg bg-zinc-800 p-4"
// // // //                       >
// // // //                         <div className="flex justify-between">
// // // //                           <p className="font-semibold text-white">{corte.nombre}</p>
// // // //                           <p>{corte.porcentaje}%</p>
// // // //                         </div>

// // // //                         <div className="mt-2 text-sm text-zinc-300">
// // // //                           <p>Peso asignado: {corte.kg.toFixed(2)} kg</p>
// // // //                           <p>Precio por kilo: ${corte.precio.toLocaleString()}</p>
// // // //                         </div>

// // // //                         <p className="mt-2 font-semibold text-green-400">
// // // //                           Costo del corte: ${corte.costo.toLocaleString()}
// // // //                         </p>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         )}

// // // //         <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
// // // //           <h2 className="mb-4 text-2xl font-bold">Totales</h2>

// // // //           {porcentajesValidos ? (
// // // //             <div className="space-y-3">
// // // //               <div className="flex justify-between text-lg">
// // // //                 <span>Costo total</span>
// // // //                 <span className="font-semibold text-yellow-400">
// // // //                   ${costoTotal.toLocaleString()}
// // // //                 </span>
// // // //               </div>

// // // //               <div className="flex justify-between text-lg">
// // // //                 <span>Costo por adulto</span>
// // // //                 <span className="font-semibold text-green-400">
// // // //                   ${costoPorAdulto.toFixed(0)}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="rounded-lg bg-red-950 p-4 text-sm text-red-300">
// // // //               Ajusta los porcentajes hasta que sumen 100% para ver los totales.
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="space-y-3">
// // // //           <button
// // // //             onClick={generarPDF}
// // // //             disabled={!porcentajesValidos}
// // // //             className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-zinc-600"
// // // //           >
// // // //             Descargar PDF
// // // //           </button>



// // // //         </div>
// // // //       </section>
// // // //     </main>
// // // //   );
// // // // }