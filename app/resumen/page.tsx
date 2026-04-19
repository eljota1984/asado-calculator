"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { productosAsado } from "../../lib/datos";
import type {
  AdultosState,
  CortesSeleccionadosState,
} from "../page";

export default function ResumenPage() {
  const router = useRouter();

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

  useEffect(() => {
    const adultosGuardados = localStorage.getItem("adultos");
    const cortesGuardados = localStorage.getItem("cortesSeleccionados");

    if (adultosGuardados) {
      setAdultos(JSON.parse(adultosGuardados));
    }

    if (cortesGuardados) {
      setCortesSeleccionados(JSON.parse(cortesGuardados));
    }
  }, []);

  const gramosPorPersona = {
    alto: 550,
    normal: 420,
    bajo: 320,
    ninos: 220,
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

  const reiniciarCalculo = () => {
    localStorage.removeItem("adultos");
    localStorage.removeItem("cortesSeleccionados");
    router.push("/");
  };

  const volverAEditar = () => {
    router.push("/");
  };

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
            Resumen del Asado 📊
          </h1>

          <p className="mt-2 text-center text-sm text-zinc-400">
            Revisa los resultados y descarga el resumen
          </p>
        </section>

        <section className="rounded-2xl bg-zinc-900 p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">
            Dashboard
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={volverAEditar}
            className="w-full rounded-2xl bg-zinc-700 px-4 py-4 text-lg font-semibold hover:bg-zinc-600"
          >
            Volver a editar
          </button>

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
      </div>
    </main>
  );
}