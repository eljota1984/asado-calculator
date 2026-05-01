
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { productosAsado } from "../../lib/datos";
import type { AdultosState, CortesSeleccionadosState } from "../page";

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
        adultos.alto + adultos.normal + adultos.bajo + adultos.ninos;

    const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

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
        return todos.filter((item) => nombres.includes(item.nombre));
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
        return compraSugerida.reduce((acc, item) => acc + item.costoSugerido, 0);
    }, [compraSugerida]);
    const kilosCompraSugerida = compraSugerida.reduce(
        (acc, item) => acc + item.kilosCompraAprox,
        0
    );
    const costoPorAdultoReal =
        totalAdultos > 0 ? totalCompraSugerida / totalAdultos : 0;
    const costoPorAdultoCompraSugerida =
        totalAdultos > 0 ? totalCompraSugerida / totalAdultos : 0;
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
            `Costo por adulto: $${Math.round(costoPorAdulto).toLocaleString(
                "es-CL"
            )}`,
            20,
            y
        );
        y += 10;
        doc.setFontSize(14);
        doc.text("Resumen compra sugerida", 20, y);
        y += 8;
        doc.setFontSize(12);
        doc.text(
            `Kilos compra sugerida: ${kilosCompraSugerida.toFixed(2)} kg`,
            20,
            y
        );
        y += 8;
        doc.text(
            `Costo total compra sugerida: $${Math.round(
                totalCompraSugerida
            ).toLocaleString("es-CL")}`,
            20,
            y
        );

        y += 8;
        doc.text(
            `Costo por adulto sugerido: $${Math.round(
                costoPorAdultoReal
            ).toLocaleString("es-CL")}`,
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

            doc.text(`Compra aprox: ${item.kilosCompraAprox.toFixed(2)} kg`, 25, y);
            y += 6;

            doc.text(
                `Costo aprox: $${Math.round(item.costoSugerido).toLocaleString(
                    "es-CL"
                )}`,
                25,
                y
            );
            y += 8;

            doc.line(20, y, 190, y);
            y += 8;
        });

        y += 6;

        if (y > 250) {
            doc.addPage();
            y = 20;
        }

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
                    doc.text(`Peso promedio: ${producto.pesoPromedio.toFixed(2)} kg`, 25, y);
                    y += 6;
                }

                doc.line(20, y, 190, y);
                y += 8;
            });
        }

        doc.save("resumen-asado-v2.pdf");
    };

    return (
        <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_35%),linear-gradient(to_bottom,rgba(24,24,27,0.25),transparent)]" />

            {mostrarDisclaimer && (
                <div className="fixed inset-x-4 top-4 z-50 mx-auto max-w-full rounded-3xl border border-red-500/40 bg-zinc-950/95 p-5 shadow-2xl shadow-red-950/40 backdrop-blur">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-lg font-black text-red-400">
                                Aviso sobre los cálculos
                            </p>

                            <p className="mt-2 text-sm leading-6 text-zinc-300">
                                El cálculo estimado muestra kilos y costos según consumo
                                aproximado y precio promedio de los productos seleccionados.
                            </p>

                            <p className="mt-2 text-sm leading-6 text-zinc-300">
                                La compra sugerida considera packs, bandejas, piezas o pesos
                                promedio aproximados. Por eso puede ser mayor al cálculo
                                estimado.
                            </p>
                        </div>

                        <button
                            onClick={() => setMostrarDisclaimer(false)}
                            className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-bold text-zinc-300 ring-1 ring-zinc-700 hover:bg-zinc-800"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
                <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-red-950/20 md:p-8">
                    <div className="text-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
                            Dashboard del asado
                        </p>

                        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                            Resumen del Asado 📊
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                            Revisa costos, kilos estimados, compra sugerida y descarga el PDF
                            final para organizar tu parrilla.
                        </p>
                    </div>
                </section>

                <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl shadow-red-950/10 md:p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                                Resultados
                            </p>
                            <h2 className="text-2xl font-black text-white">Dashboard</h2>
                        </div>

                        <div className="hidden rounded-2xl bg-red-600/10 px-4 py-2 text-sm font-semibold text-red-300 ring-1 ring-red-500/30 md:block">
                            Compra estimada
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                            <p className="text-sm text-zinc-400">Personas</p>
                            <p className="mt-2 text-3xl font-black">{totalPersonas}</p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                            <p className="text-sm text-zinc-400">Carne estimada</p>
                            <p className="mt-2 text-3xl font-black">
                                {kilosTotales.toFixed(2)} kg
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                            <p className="text-sm text-zinc-400">Productos elegidos</p>
                            <p className="mt-2 text-3xl font-black">{cantidadSeleccionados}</p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                            <p className="text-sm text-zinc-400">Costo estimado</p>
                            <p className="mt-2 text-3xl font-black">
                                ${Math.round(costoEstimado).toLocaleString("es-CL")}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                            <p className="text-sm text-zinc-400">Adultos que pagan</p>
                            <p className="mt-2 text-3xl font-black">{totalAdultos}</p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                            <p className="text-sm text-zinc-400">Costo por adulto</p>
                            <p className="mt-2 text-3xl font-black">
                                ${Math.round(costoPorAdulto).toLocaleString("es-CL")}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
                            <p className="text-sm text-red-200">Compra sugerida total</p>
                            <p className="mt-2 text-3xl font-black text-red-300">
                                {kilosCompraSugerida.toFixed(2)} kg
                            </p>
                        </div>

                        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
                            <p className="text-sm text-red-200">Valor compra sugerida</p>
                            <p className="mt-2 text-3xl font-black text-red-300">
                                ${Math.round(totalCompraSugerida).toLocaleString("es-CL")}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
                            <p className="text-sm text-red-200">Costo adulto sugerido</p>
                            <p className="mt-2 text-3xl font-black text-red-300">
                                $
                                {Math.round(costoPorAdultoCompraSugerida).toLocaleString(
                                    "es-CL"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                        <p className="mb-3 font-bold text-white">Selección actual</p>

                        <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-4">
                            {resumenPorTipo.map((item) => (
                                <div
                                    key={item.nombre}
                                    className="rounded-xl bg-zinc-950 p-3 ring-1 ring-zinc-800"
                                >
                                    <p className="text-zinc-500">{item.nombre}</p>
                                    <p className="mt-1 text-xl font-black text-white">
                                        {item.cantidad}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                                    Sugerencia de compra
                                </p>
                                <h3 className="text-xl font-black text-white">
                                    Compra sugerida
                                </h3>
                            </div>
                        </div>

                        {compraSugerida.length === 0 ? (
                            <p className="text-sm text-zinc-400">
                                No hay productos seleccionados.
                            </p>
                        ) : (
                            <div className="grid gap-3 md:grid-cols-2">
                                {compraSugerida.map((item) => (
                                    <div
                                        key={item.nombre}
                                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm"
                                    >
                                        <p className="font-bold text-white">{item.nombre}</p>

                                        <div className="mt-3 space-y-1 text-zinc-400">
                                            <p>Ideal calculado: {item.kilosIdeal.toFixed(2)} kg</p>
                                            <p>Compra aprox: {item.kilosCompraAprox.toFixed(2)} kg</p>
                                            <p>
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
                                                <p>Unidades por pack: {item.unidadesPorPack}</p>
                                            )}

                                            {item.descripcionVenta && (
                                                <p className="text-zinc-500">{item.descripcionVenta}</p>
                                            )}
                                        </div>

                                        <p className="mt-3 rounded-xl bg-red-600/10 px-3 py-2 font-black text-red-300 ring-1 ring-red-500/30">
                                            Costo aprox: $
                                            {Math.round(item.costoSugerido).toLocaleString("es-CL")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <div className="grid gap-3 sm:grid-cols-3">
                    <button
                        onClick={volverAEditar}
                        className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-lg font-bold text-white hover:bg-zinc-800"
                    >
                        Volver a editar
                    </button>

                    <button
                        onClick={generarPDF}
                        className="w-full rounded-2xl border border-red-500/40 bg-red-600 px-4 py-4 text-lg font-bold text-white shadow-xl shadow-red-950/30 hover:bg-red-500"
                    >
                        Descargar PDF
                    </button>

                    <button
                        onClick={reiniciarCalculo}
                        className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-lg font-bold text-red-300 hover:bg-zinc-800"
                    >
                        Reiniciar
                    </button>
                </div>
            </div>
            <footer className="mt-8 bg-zinc-900 py-4 text-center text-xs text-zinc-500">
                <p>
                    * Los cálculos de carne y costos son aproximados y se basan en promedios de precios de grandes cadenas de supermercados y cortes envasados o packs. Los resultados pueden variar dependiendo de la tienda, el corte específico y la disponibilidad en el momento de la compra.
                </p>
            </footer>
        </main>
    );
}
