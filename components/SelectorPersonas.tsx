"use client";

import type { AdultosState } from "../app/page";

interface Props {
  adultos: AdultosState;
  setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
}

export default function SelectorPersonas({ adultos, setAdultos }: Props) {
  const cambiarCantidad = (
    tipo: keyof AdultosState,
    operacion: "sumar" | "restar"
  ) => {
    setAdultos((prev) => {
      const valorActual = prev[tipo];
      const nuevoValor =
        operacion === "sumar" ? valorActual + 1 : Math.max(0, valorActual - 1);

      return {
        ...prev,
        [tipo]: nuevoValor,
      };
    });
  };

  const renderFila = (
    label: string,
    tipo: keyof AdultosState
  ) => (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-zinc-800 p-4">
      <span className="text-sm font-medium text-white">{label}</span>
      

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => cambiarCantidad(tipo, "restar")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white hover:bg-red-700"
        >
          −
        </button>

        <div className="min-w-[2.5rem] text-center text-lg font-semibold text-white">
          {adultos[tipo]}
        </div>

        <button
          type="button"
          onClick={() => cambiarCantidad(tipo, "sumar")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white hover:bg-green-700"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Cantidad de personas
      </h2>
      

      <div className="space-y-4">
        {renderFila("Adultos (alto consumo)", "alto")}
        {renderFila("Adultos (consumo normal)", "normal")}
        {renderFila("Adultos (bajo consumo)", "bajo")}
        {renderFila("Niños", "ninos")}
      </div>
    </section>
  );
}

