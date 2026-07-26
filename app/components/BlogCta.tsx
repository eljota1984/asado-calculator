import Link from "next/link";

export default function BlogCta() {
  return (
    <section className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 p-4 shadow-xl shadow-red-950/20">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600/15 text-2xl ring-1 ring-red-500/40">
            🔥
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              ¿Ya tienes hambre?
            </h2>

            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Calcula tu asado ideal y obtén una compra sugerida en segundos.
            </p>
          </div>
        </div>

        <Link
          href="/calculadora"
          className="inline-flex w-fit shrink-0 items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-xs font-black text-white shadow-md shadow-red-950/40 transition hover:bg-red-500"
        >
          Ir a la calculadora →
        </Link>
      </div>
    </section>
  );
}
// import Link from "next/link";

// export default function BlogCta() {
//   return (
//     <section className="rounded-[2rem] border border-red-500/30 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 p-6 shadow-2xl shadow-red-950/20 md:p-8">
//       <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
//         <div className="flex items-center gap-4">
//           <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-600/15 text-4xl ring-1 ring-red-500/40">
//             🔥
//           </div>

//           <div>
//             <h2 className="text-3xl font-black text-white">
//               ¿Ya tienes hambre?
//             </h2>

//             <p className="mt-2 text-sm leading-6 text-zinc-400">
//               Calcula tu asado ideal y obtén una compra sugerida en segundos.
//             </p>
//           </div>
//         </div>

//         <Link
//           href="/calculadora"
//           className="rounded-2xl bg-red-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
//         >
//           Ir a la calculadora →
//         </Link>
//       </div>
//     </section>
//   );
// }