import SelectorPersonas from "../components/SelectorPersonas";
import SelectorCarnes from "../components/SelectorCarnes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">
        Calculadora de Asados 🔥
      </h1>

      <SelectorPersonas />
      <SelectorCarnes />
    </main>
  );
}