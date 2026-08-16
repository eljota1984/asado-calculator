"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="relative z-50 border-b border-zinc-800/80">
      {/* BARRA PRINCIPAL */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* LOGO */}
        <Link
          href="/"
          onClick={cerrarMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-red-600/10 ring-1 ring-red-500/40 md:h-16 md:w-16">
            <Image
              src="/logo_final.png"
              alt="Calculadora de Asados"
              width={64}
              height={64}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-black text-white">
              Calculadora
            </p>

            <p className="text-sm font-black text-white">
              de Asados
            </p>
          </div>
        </Link>

        {/* MENÚ ESCRITORIO */}
        <nav className="hidden items-center gap-7 text-sm font-semibold text-zinc-300 md:flex">
          <Link
            href="/calculadora"
            className="transition hover:text-red-400"
          >
            Calculadora
          </Link>

          <Link
            href="/blog"
            className="transition hover:text-red-400"
          >
            Blog
          </Link>

          <Link
            href="/blog?categoria=guias"
            className="transition hover:text-red-400"
          >
            Guías
          </Link>

          <Link
            href="/blog?categoria=recetas"
            className="transition hover:text-red-400"
          >
            Recetas
          </Link>

          <Link
            href="/blog?categoria=consejos"
            className="transition hover:text-red-400"
          >
            Consejos
          </Link>
        </nav>

        {/* BOTÓN CALCULADORA ESCRITORIO */}
        <Link
          href="/calculadora"
          className="hidden rounded-lg bg-red-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-red-950/30 transition hover:bg-red-500 md:inline-flex"
        >
          Calcular mi asado
        </Link>

        {/* BOTÓN HAMBURGUESA MÓVIL */}
        <button
          type="button"
          onClick={() => setMenuAbierto((estado) => !estado)}
          aria-expanded={menuAbierto}
          aria-controls="menu-mobile"
          aria-label={
            menuAbierto
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white transition hover:border-red-500/50 hover:bg-zinc-800 md:hidden"
        >
          {menuAbierto ? (
            /* ICONO CERRAR */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            /* ICONO HAMBURGUESA */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {menuAbierto && (
        <nav
          id="menu-mobile"
          className="border-t border-zinc-800 bg-zinc-950/98 px-4 pb-5 pt-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {/* CALCULADORA */}
            <Link
              href="/calculadora"
              onClick={cerrarMenu}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600/15 text-lg">
                  🧮
                </span>

                <span>Calculadora</span>
              </div>

              <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-red-400">
                →
              </span>
            </Link>

            {/* BLOG */}
            <Link
              href="/blog"
              onClick={cerrarMenu}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-lg">
                  📰
                </span>

                <span>Blog</span>
              </div>

              <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-yellow-400">
                →
              </span>
            </Link>

            {/* GUÍAS */}
            <Link
              href="/blog?categoria=guias"
              onClick={cerrarMenu}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-lg">
                  📖
                </span>

                <span>Guías</span>
              </div>

              <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-orange-400">
                →
              </span>
            </Link>

            {/* RECETAS */}
            <Link
              href="/blog?categoria=recetas"
              onClick={cerrarMenu}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-lg">
                  👨‍🍳
                </span>

                <span>Recetas</span>
              </div>

              <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-red-400">
                →
              </span>
            </Link>

            {/* CONSEJOS */}
            <Link
              href="/blog?categoria=consejos"
              onClick={cerrarMenu}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-lg">
                  💡
                </span>

                <span>Consejos</span>
              </div>

              <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-yellow-400">
                →
              </span>
            </Link>
          </div>

          {/* CTA MÓVIL */}
          <div className="mt-4 border-t border-zinc-800 pt-4">
            <Link
              href="/calculadora"
              onClick={cerrarMenu}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-red-950/30 transition hover:from-red-600 hover:to-red-500"
            >
              🔥 Calcular mi asado
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
// import Image from "next/image";
// import Link from "next/link";

// export default function SiteHeader() {
//   return (
//     <header className="flex items-center justify-between gap-4 border-b border-zinc-800/80 px-4 py-4 md:px-6">
//       <Link
//         href="/"
//         className="flex items-center gap-3"
//       >
//         <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-red-600/10 ring-1 ring-red-500/40">
//           <Image
//             src="/logo_final.png"
//             alt="Calculadora de Asados"
//             width={64}
//             height={64}
//             className="h-full w-full object-contain"
//             priority
//           />
//         </div>

//         <div className="leading-tight">
//           <p className="text-sm font-black text-white">
//             Calculadora
//           </p>

//           <p className="text-sm font-black text-white">
//             de Asados
//           </p>
//         </div>
//       </Link>

//       <nav className="hidden items-center gap-7 text-sm font-semibold text-zinc-300 md:flex">
//         <Link
//           href="/calculadora"
//           className="transition hover:text-red-400"
//         >
//           Calculadora
//         </Link>

//         <Link
//           href="/blog"
//           className="transition hover:text-red-400"
//         >
//           Blog
//         </Link>

//         <Link
//           href="/blog?categoria=guias"
//           className="transition hover:text-red-400"
//         >
//           Guías
//         </Link>

//         <Link
//           href="/blog?categoria=recetas"
//           className="transition hover:text-red-400"
//         >
//           Recetas
//         </Link>

//         <Link
//           href="/blog?categoria=consejos"
//           className="transition hover:text-red-400"
//         >
//           Consejos
//         </Link>
//       </nav>

//       <Link
//         href="/calculadora"
//         className="rounded-lg bg-red-600 px-3 py-2 text-xs font-black text-white shadow-md shadow-red-950/30 transition hover:bg-red-500 md:px-4"
//       >
//         Calcular mi asado
//       </Link>
//     </header>
//   );
// }