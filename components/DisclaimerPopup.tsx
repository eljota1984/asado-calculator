"use client";

import { useState, useEffect } from "react";

export default function DisclaimerPopup() {
  const [mostrarDisclaimer, setMostrarDisclaimer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarDisclaimer(false); // Esconde el popup después de 10 segundos
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    mostrarDisclaimer && (
      <div className="fixed inset-x-4 top-4 z-50 mx-auto max-w-2xl rounded-2xl border border-yellow-600 bg-zinc-900 p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-yellow-400">
              Aviso sobre los cálculos
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              Los cálculos de carne y costos son aproximados y se basan en
              promedios de precios de grandes cadenas de supermercados y cortes
              envasados o packs. Los resultados pueden variar dependiendo de la
              tienda, el corte específico y la disponibilidad en el momento de la
              compra.
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
    )
  );
}