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
    const [mostrarDisclaimer, setMostrarDisclaimer] = useState(true);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setMostrarDisclaimer(false);
        }, 10000);

        return () => clearTimeout(timer);
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

        y += 10;

        doc.setFontSize(14);
        doc.text("Resumen compra sugerida", 20, y);

        y += 8;
        doc.setFontSize(12);

        doc.text(
            `Costo total compra sugerida: $${Math.round(totalCompraSugerida).toLocaleString("es-CL")}`,
            20,
            y
        );

        y += 8;

        doc.text(
            `Costo por adulto (real): $${Math.round(costoPorAdultoReal).toLocaleString("es-CL")}`,
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

        y += 8;

        if (y > 250) {
            doc.addPage();
            y = 20;
        }

        doc.setFontSize(16);
        doc.text("Compra sugerida", 20, y);

        y += 10;
        doc.setFontSize(11);

        compraSugerida.forEach((item) => {
            if (y > 260) {
                doc.addPage();
                y = 20;
            }

            doc.text(`${item.nombre}`, 20, y);
            y += 6;

            doc.text(
                `Sugerencia: ${item.cantidadSugerida} ${item.tipoVenta === "pack"
                    ? "pack(s)"
                    : item.tipoVenta === "unidad"
                        ? "unidad(es)"
                        : item.tipoVenta === "bandeja"
                            ? "bandeja(s)"
                            : "pieza(s)"
                }`,
                25,
                y
            );
            y += 6;

            doc.text(
                `Compra aprox: ${item.kilosCompraAprox.toFixed(2)} kg`,
                25,
                y
            );
            y += 6;

            doc.text(
                `Costo aprox: $${Math.round(item.costoSugerido).toLocaleString("es-CL")}`,
                25,
                y
            );
            y += 8;

            doc.line(20, y, 190, y);
            y += 8;
        });

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
                    `Precio: $${producto.precio.toLocaleString("es-CL")}${producto.tipoVenta === "pack" ? " / pack" : " / kg"
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

    const compraSugerida = useMemo(() => {
        if (seleccionados.length === 0 || kilosTotales === 0) return [];

        const kilosPorProducto = kilosTotales / seleccionados.length;

        return seleccionados.map((producto) => {
            const rendimiento = producto.rendimiento ?? 1;
            const pesoPromedio = producto.pesoPromedio ?? 1;

            const kilosNecesariosBrutos = kilosPorProducto / rendimiento;
            const cantidadSugerida = Math.ceil(kilosNecesariosBrutos / pesoPromedio);
            const kilosCompraAprox = cantidadSugerida * pesoPromedio;

            const costoSugerido =
                producto.tipoVenta === "pack"
                    ? cantidadSugerida * producto.precio
                    : kilosCompraAprox * producto.precio;

            return {
                nombre: producto.nombre,
                tipo: producto.tipo,
                tipoVenta: producto.tipoVenta,
                cantidadSugerida,
                kilosIdeal: kilosPorProducto,
                kilosCompraAprox,
                costoSugerido,
                descripcionVenta: producto.descripcionVenta,
                unidadesPorPack: producto.unidadesPorPack,
            };
        });
    }, [seleccionados, kilosTotales]);


    const totalCompraSugerida = useMemo(() => {
        return compraSugerida.reduce(
            (acc, item) => acc + item.costoSugerido,
            0
        );
    }, [compraSugerida]);

    const costoPorAdultoReal =
        totalAdultos > 0 ? totalCompraSugerida / totalAdultos : 0;




    const kilosCompraSugerida = compraSugerida.reduce(
        (acc, item) => acc + item.kilosCompraAprox,
        0
    );

    const costoPorAdultoCompraSugerida =
        totalAdultos > 0 ? totalCompraSugerida / totalAdultos : 0;
    return (
        <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
            {mostrarDisclaimer && (
                <div className="fixed inset-x-4 top-4 z-50 mx-auto max-w-2xl rounded-2xl border border-yellow-600 bg-zinc-900 p-5 shadow-2xl">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-lg font-bold text-yellow-400">
                                Aviso sobre los cálculos
                            </p>

                            <p className="mt-2 text-sm text-zinc-300">
                                El cálculo estimado muestra los kilos y costos según el consumo
                                aproximado de los comensales y el promedio de precios de los productos
                                seleccionados.
                            </p>

                            <p className="mt-2 text-sm text-zinc-300">
                                La compra sugerida considera formatos reales de compra, como packs,
                                bandejas, piezas o pesos promedio aproximados. Por eso los kilos y el
                                costo sugerido pueden ser mayores al cálculo estimado.
                            </p>
                        </div>

                        <button
                            onClick={() => setMostrarDisclaimer(false)}
                            className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-bold text-zinc-300 hover:bg-zinc-700"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
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

                        <div className="rounded-xl bg-zinc-800 p-4">
                            <p className="text-sm text-zinc-400">Compra sugerida total</p>
                            <p className="text-2xl font-bold text-green-400">
                                {kilosCompraSugerida.toFixed(2)} kg
                            </p>
                        </div>

                        <div className="rounded-xl bg-zinc-800 p-4">
                            <p className="text-sm text-zinc-400">Valor compra sugerida</p>
                            <p className="text-2xl font-bold text-green-400">
                                ${Math.round(totalCompraSugerida).toLocaleString("es-CL")}
                            </p>
                        </div>

                        <div className="rounded-xl bg-zinc-800 p-4">
                            <p className="text-sm text-zinc-400">Costo por adulto sugerido</p>
                            <p className="text-2xl font-bold text-green-400">
                                ${Math.round(costoPorAdultoCompraSugerida).toLocaleString("es-CL")}
                            </p>
                        </div>

                        {/* <div className="mt-5 rounded-xl bg-zinc-800 p-4"> */}
                        <div className="rounded-xl bg-zinc-800 p-4">
                            <p className="mb-2 font-semibold">Selección actual</p>

                            <div className="space-y-1 text-sm text-zinc-300">
                                {resumenPorTipo.map((item) => (
                                    <p key={item.nombre}>
                                        {item.nombre}: {item.cantidad}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>




                    <div className="mt-5 rounded-xl bg-zinc-800 p-4">
                        <p className="mb-3 font-semibold">Compra sugerida</p>

                        {compraSugerida.length === 0 ? (
                            <p className="text-sm text-zinc-400">
                                No hay productos seleccionados.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {compraSugerida.map((item) => (
                                    <div
                                        key={item.nombre}
                                        className="rounded-lg bg-zinc-900 p-3 text-sm"
                                    >
                                        <p className="font-semibold text-white">{item.nombre}</p>

                                        <p className="text-zinc-400">
                                            Ideal calculado: {item.kilosIdeal.toFixed(2)} kg
                                        </p>

                                        <p className="text-zinc-400">
                                            Compra aprox: {item.kilosCompraAprox.toFixed(2)} kg
                                        </p>

                                        <p className="text-zinc-400">
                                            Sugerencia: {item.cantidadSugerida}{" "}
                                            {item.tipoVenta === "pack"
                                                ? "pack(s)"
                                                : item.tipoVenta === "unidad"
                                                    ? "unidad(es)"
                                                    : item.tipoVenta === "bandeja"
                                                        ? "bandeja(s)"
                                                        : "pieza(s)"}
                                        </p>

                                        {item.unidadesPorPack && (
                                            <p className="text-zinc-400">
                                                Unidades por pack: {item.unidadesPorPack}
                                            </p>
                                        )}

                                        {item.descripcionVenta && (
                                            <p className="text-zinc-500">{item.descripcionVenta}</p>
                                        )}

                                        <p className="mt-1 font-semibold text-green-400">
                                            Costo aprox: $
                                            {Math.round(item.costoSugerido).toLocaleString("es-CL")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-5 rounded-xl bg-zinc-800 p-4">
                        <p className="mb-3 font-semibold">Compra sugerida</p>

                        {compraSugerida.length === 0 ? (
                            <p className="text-sm text-zinc-400">
                                No hay productos seleccionados.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {compraSugerida.map((item) => (
                                    <div
                                        key={item.nombre}
                                        className="rounded-lg bg-zinc-900 p-3 text-sm"
                                    >
                                        <p className="font-semibold text-white">{item.nombre}</p>

                                        <p className="text-zinc-400">
                                            Ideal calculado: {item.kilosIdeal.toFixed(2)} kg
                                        </p>

                                        <p className="text-zinc-400">
                                            Compra aprox: {item.kilosCompraAprox.toFixed(2)} kg
                                        </p>

                                        <p className="text-zinc-400">
                                            Sugerencia: {item.cantidadSugerida}{" "}
                                            {item.tipoVenta === "pack"
                                                ? "pack(s)"
                                                : item.tipoVenta === "unidad"
                                                    ? "unidad(es)"
                                                    : item.tipoVenta === "bandeja"
                                                        ? "bandeja(s)"
                                                        : "pieza(s)"}
                                        </p>

                                        {item.unidadesPorPack && (
                                            <p className="text-zinc-400">
                                                Unidades por pack: {item.unidadesPorPack}
                                            </p>
                                        )}

                                        {item.descripcionVenta && (
                                            <p className="text-zinc-500">{item.descripcionVenta}</p>
                                        )}

                                        <p className="mt-1 font-semibold text-green-400">
                                            Costo aprox: $
                                            {Math.round(item.costoSugerido).toLocaleString("es-CL")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
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