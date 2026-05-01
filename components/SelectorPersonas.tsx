"use client";

import type { AdultosState } from "../app/page";

interface Props {
  adultos: AdultosState;
  setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
}

export default function SelectorPersonas({
  adultos,
  setAdultos,
}: Props) {
  const cambiarCantidad = (
    tipo: keyof AdultosState,
    operacion: "sumar" | "restar"
  ) => {
    setAdultos((prev) => {
      const valorActual = prev[tipo];
      const nuevoValor =
        operacion === "sumar"
          ? valorActual + 1
          : Math.max(0, valorActual - 1);

      return {
        ...prev,
        [tipo]: nuevoValor,
      };
    });
  };

  const renderCard = (
    emoji: string,
    titulo: string,
    descripcion: string,
    gramaje: string,
    tipo: keyof AdultosState
  ) => {
    const cantidad = adultos[tipo];
    const seleccionado = cantidad > 0;

    return (
      <div
        className={`rounded-3xl border p-5 shadow-lg shadow-black/20 transition ${
          seleccionado
            ? "border-red-500/50 bg-red-950/25"
            : "border-zinc-800 bg-zinc-950 hover:border-red-500/30"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ring-1 ${
              seleccionado
                ? "bg-red-600/20 ring-red-500/50"
                : "bg-zinc-900 ring-zinc-800"
            }`}
          >
            {emoji}
          </div>

          <div className="flex-1">
            <p className="text-lg font-black text-white">{titulo}</p>
            <p className="mt-1 text-sm leading-5 text-zinc-400">
              {descripcion}
            </p>

            <div className="mt-3 inline-flex rounded-full border border-red-500/30 bg-red-600/10 px-3 py-1 text-xs font-bold text-red-300">
              {gramaje}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-zinc-900 p-2 ring-1 ring-zinc-800">
          <button
            type="button"
            onClick={() => cambiarCantidad(tipo, "restar")}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-2xl font-black text-white transition hover:bg-zinc-700"
          >
            −
          </button>

          <div className="text-center">
            <span className="block text-3xl font-black text-white">
              {cantidad}
            </span>
            <span className="text-xs text-zinc-500">cantidad</span>
          </div>

          <button
            type="button"
            onClick={() => cambiarCantidad(tipo, "sumar")}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-2xl font-black text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const totalAdultos = adultos.alto + adultos.normal + adultos.bajo;

  const totalPersonas =
    adultos.alto + adultos.normal + adultos.bajo + adultos.ninos;

  return (
    <section className="w-full max-w-5xl rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-red-950/10 md:p-7">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-red-400">
          Paso 1
        </p>

        <h2 className="mt-1 text-2xl font-black text-white">
          Cantidad de personas
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Define el consumo estimado de los comensales antes de seleccionar los
          productos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {renderCard(
          "🪓",
          "Vikingo / Vikinga",
          "Llega con hambre ancestral.",
          "Aprox. 550 g",
          "alto"
        )}

        {renderCard(
          "🔥",
          "Parrillero clásico",
          "Buen apetito y ritmo estable.",
          "Aprox. 420 g",
          "normal"
        )}

        {renderCard(
          "🐦",
          "Picoteador/a",
          "Come poco, conversa harto.",
          "Aprox. 320 g",
          "bajo"
        )}

        {renderCard(
          "🍟",
          "Peques",
          "Comen menos, se mueven más.",
          "Aprox. 220 g",
          "ninos"
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5">
          <p className="text-sm text-red-200">Adultos que pagan</p>
          <p className="mt-2 text-3xl font-black text-red-300">
            {totalAdultos}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="text-sm text-zinc-400">Total personas</p>
          <p className="mt-2 text-3xl font-black text-white">
            {totalPersonas}
          </p>
        </div>
      </div>
    </section>
  );
}


