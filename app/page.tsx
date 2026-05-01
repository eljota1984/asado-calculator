"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectorPersonas from "../components/SelectorPersonas";
import SelectorCarnes from "../components/SelectorCarnes";

import DisclaimerPopup from "../components/DisclaimerPopup";  // Ajusta el path




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

  useEffect(() => {
    localStorage.setItem("adultos", JSON.stringify(adultos));
  }, [adultos]);

  useEffect(() => {
    localStorage.setItem(
      "cortesSeleccionados",
      JSON.stringify(cortesSeleccionados)
    );
  }, [cortesSeleccionados]);
  const [cargandoResumen, setCargandoResumen] = useState(false);

  const irAResumen = () => {
    setCargandoResumen(true);

    setTimeout(() => {
      router.push("/resumen");
    }, 2000);
  };

  return (

    <main className="min-h-screen bg-black px-4 py-6 text-white md:py-10">
      {cargandoResumen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[2rem] border border-red-500/40 bg-zinc-950 p-8 text-center shadow-2xl shadow-red-950/40">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/15 text-4xl ring-1 ring-red-500/40">
              🔥
            </div>

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
        <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-red-950/20 md:p-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/15 text-3xl ring-1 ring-red-500/40">
                🔥
              </div>

              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">
                  Asado Fácil
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Calculadora de asados
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
                Planifica mejor tu parrilla
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                Calculadora de Asados
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                Calcula cantidades, selecciona productos reales, estima costos
                y genera un resumen listo para organizar la compra.
              </p>
            </div>

            <div className="grid w-full gap-3 pt-2 text-sm md:grid-cols-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
                <p className="text-red-400">🔥 Fácil</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
                <p className="text-red-400">💰 Costos</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
                <p className="text-red-400">📦 Compra sugerida</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3">
                <p className="text-red-400">📄 PDF</p>
              </div>
            </div>
          </div>
        </section>

        <SelectorPersonas adultos={adultos} setAdultos={setAdultos} />

        <SelectorCarnes
          cortesSeleccionados={cortesSeleccionados}
          setCortesSeleccionados={setCortesSeleccionados}
        />

        <button
          onClick={irAResumen}
          disabled={cargandoResumen}
         className="group w-full rounded-[1.7rem] border border-red-500/50 bg-gradient-to-r from-red-700 to-red-600 px-6 py-5 text-left shadow-2xl shadow-red-950/30 transition hover:scale-[1.01] hover:from-red-600 hover:to-red-500 disabled:cursor-not-allowed disabled:opacity-70">
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-black text-white">
                Continuar al resumen
              </p>

              <p className="mt-1 text-sm text-red-100">
                Ver dashboard, compra sugerida, costos estimados y descargar PDF
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-3xl text-white transition group-hover:translate-x-1">
              →
            </span>
          </div>
        </button>
      </div>
      <footer className="mt-8 bg-zinc-900 py-4 text-center text-xs text-zinc-500">
        <p>
          * Los cálculos de carne y costos son aproximados y se basan en promedios de precios de grandes cadenas de supermercados y cortes envasados o packs. Los resultados pueden variar dependiendo de la tienda, el corte específico y la disponibilidad en el momento de la compra.
        </p>
      </footer>
    </main>

  );
}

