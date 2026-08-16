"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SelectorPersonas from "../components/SelectorPersonas";
import SelectorCarnes from "../components/SelectorCarnes";
import DisclaimerPopup from "../components/DisclaimerPopup";

import type {
  AdultosState,
  CortesSeleccionadosState,
} from "../lib/types";

export default function Home() {
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

  const [cargandoResumen, setCargandoResumen] = useState(false);

  useEffect(() => {
    const adultosGuardados = localStorage.getItem("adultos");
    const cortesGuardados = localStorage.getItem(
      "cortesSeleccionados"
    );

    if (adultosGuardados) {
      setAdultos(JSON.parse(adultosGuardados));
    }

    if (cortesGuardados) {
      setCortesSeleccionados(JSON.parse(cortesGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adultos", JSON.stringify(adultos));
  }, [adultos]);

  useEffect(() => {
    localStorage.setItem(
      "cortesSeleccionados",
      JSON.stringify(cortesSeleccionados)
    );
  }, [cortesSeleccionados]);

  const hayAdultos =
    adultos.alto + adultos.normal + adultos.bajo > 0;

  const hayCortes =
    cortesSeleccionados.vacuno.length +
      cortesSeleccionados.cerdo.length +
      cortesSeleccionados.pollo.length +
      cortesSeleccionados.embutidos.length >
    0;

  const irAResumen = () => {
    if (!hayAdultos || !hayCortes) return;

    setCargandoResumen(true);

    setTimeout(() => {
      router.push("/resumen");
    }, 2800);
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      {cargandoResumen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center rounded-[2rem] border border-red-500/40 bg-zinc-950 p-8 text-center shadow-2xl shadow-red-950/40">
            <img
              src="/logo_final.png"
              alt="Calculadora de Asados"
              className="h-40 w-auto md:h-56"
            />

            <p className="text-2xl font-black text-white">
              Aliñando los choripanes...
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Calculando kilos, costos y compra sugerida.
            </p>

            <div className="mx-auto mt-6 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500" />
          </div>
        </div>
      )}

      <DisclaimerPopup />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_35%),linear-gradient(to_bottom,rgba(24,24,27,0.2),transparent)]" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* BOTÓN VOLVER */}
        <div className="flex">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 text-sm font-bold text-zinc-300 shadow-lg shadow-black/20 transition duration-200 hover:border-red-500/50 hover:bg-zinc-900 hover:text-white"
          >
            <span className="text-lg text-red-400 transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Volver al inicio
          </Link>
        </div>

        {/* CABECERA */}
        <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-red-950/20 md:p-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <div>
              <div className="mb-4 flex justify-center">
                <img
                  src="/logo_final.png"
                  alt="Calculadora de Asados"
                  className="h-40 w-auto md:h-56"
                />
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                Calculadora de Asados
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                Calcula cantidades, selecciona productos reales, estima
                costos y genera un resumen listo para organizar la compra.
              </p>
            </div>
          </div>
        </section>

        {/* PERSONAS */}
        <SelectorPersonas
          adultos={adultos}
          setAdultos={setAdultos}
        />

        {/* CARNES */}
        <SelectorCarnes
          cortesSeleccionados={cortesSeleccionados}
          setCortesSeleccionados={setCortesSeleccionados}
        />

        {/* CONTINUAR */}
        <button
          onClick={irAResumen}
          disabled={cargandoResumen || !hayAdultos || !hayCortes}
          className="group w-full rounded-[1.7rem] border border-red-500/50 bg-gradient-to-r from-red-700 to-red-600 px-6 py-5 text-left shadow-2xl shadow-red-950/30 transition hover:scale-[1.01] hover:from-red-600 hover:to-red-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-black text-white">
                {!hayAdultos
                  ? "Agrega al menos un adulto"
                  : !hayCortes
                    ? "Selecciona al menos un corte"
                    : "Continuar al resumen"}
              </p>

              <p className="mt-1 text-sm leading-6 text-red-100">
                {!hayAdultos
                  ? "El resumen se habilita cuando hay al menos un adulto que pague."
                  : !hayCortes
                    ? "Debes seleccionar al menos un producto de vacuno, cerdo, pollo o embutidos."
                    : "Ver dashboard, compra sugerida, costos estimados y descargar PDF."}
              </p>
            </div>

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl text-white transition group-hover:translate-x-1">
              →
            </span>
          </div>
        </button>
      </div>

      <footer className="relative mx-auto mt-8 max-w-5xl border-t border-zinc-800 py-5 text-center text-xs leading-5 text-zinc-500">
        <p>
          * Los cálculos de carne y costos son aproximados y se basan en
          promedios de precios de grandes cadenas de supermercados y cortes
          envasados o packs. Los resultados pueden variar dependiendo de la
          tienda, el corte específico y la disponibilidad en el momento de
          la compra.
        </p>
      </footer>
    </main>
  );
}
