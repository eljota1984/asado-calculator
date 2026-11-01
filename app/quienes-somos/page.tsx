
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos | Calculadora de Asados",
  description:
    "Conoce Calculadora de Asados, una herramienta chilena para planificar asados y encontrar recetas y guías parrilleras.",
};

export default function QuienesSomos() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <article className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-10">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300">
          ← Volver al inicio
        </Link>

        <h1 className="mt-8 text-4xl font-black text-white">
          Quiénes somos
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-zinc-300">
          <p>
            Calculadora de Asados es un proyecto digital chileno
            creado para facilitar la organización de asados.
          </p>

          <p>
            Nuestro objetivo es ayudarte a calcular cantidades
            de carne, estimar presupuestos y organizar las
            compras de manera sencilla.
          </p>

          <h2 className="text-2xl font-bold text-red-400">
            ¿Qué encontrarás aquí?
          </h2>

          <p>
            Una calculadora interactiva, recetas, guías
            sobre cortes de carne, consejos sobre carbón
            y artículos para preparar mejores asados.
          </p>

          <h2 className="text-2xl font-bold text-red-400">
            Nuestro compromiso
          </h2>

          <p>
            Queremos ofrecer información clara, práctica
            y útil. Las cantidades y costos calculados
            son estimaciones que pueden variar según
            las preferencias de cada persona y los
            precios del mercado.
          </p>

          <Link
            href="/calculadora"
            className="inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500"
          >
            Ir a la calculadora
          </Link>
        </div>
      </article>
    </main>
  );
}
