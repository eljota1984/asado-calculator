"use client";

import type { AdultosState } from "../app/page";

interface Props {
  adultos: AdultosState;
  setAdultos: React.Dispatch<React.SetStateAction<AdultosState>>;
}

export default function SelectorPersonas({ adultos, setAdultos }: Props) {
  const toNumber = (value: string) => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Cantidad de personas
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="adultos-alto" className="text-white">
            Adultos (alto consumo)
          </label>
          <input
            id="adultos-alto"
            type="number"
            min="0"
            value={adultos.alto}
            onChange={(e) =>
              setAdultos({ ...adultos, alto: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="adultos-normal" className="text-white">
            Adultos (consumo normal)
          </label>
          <input
            id="adultos-normal"
            type="number"
            min="0"
            value={adultos.normal}
            onChange={(e) =>
              setAdultos({ ...adultos, normal: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="adultos-bajo" className="text-white">
            Adultos (bajo consumo)
          </label>
          <input
            id="adultos-bajo"
            type="number"
            min="0"
            value={adultos.bajo}
            onChange={(e) =>
              setAdultos({ ...adultos, bajo: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="ninos" className="text-white">
            Niños
          </label>
          <input
            id="ninos"
            type="number"
            min="0"
            value={adultos.ninos}
            onChange={(e) =>
              setAdultos({ ...adultos, ninos: toNumber(e.target.value) })
            }
            className="w-24 rounded-md border border-zinc-600 bg-white px-3 py-2 text-black"
          />
        </div>
      </div>
    </section>
  );
}
