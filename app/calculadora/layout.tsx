import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Calculadora de Asados: carne, carbón y presupuesto por persona",

  description:
    "Calcula cuánta carne y carbón necesitas para tu asado según la cantidad de invitados. Estima cantidades, costos y organiza tu compra fácilmente.",

  alternates: {
    canonical:
      "https://calculadoradeasados.cl/calculadora",
  },

  openGraph: {
    title:
      "Calculadora de Asados: carne, carbón y presupuesto por persona",

    description:
      "Calcula cuánta carne y carbón necesitas para tu asado según la cantidad de invitados. Estima cantidades, costos y organiza tu compra fácilmente.",

    url:
      "https://calculadoradeasados.cl/calculadora",

    siteName:
      "Calculadora de Asados",

    locale:
      "es_CL",

    type:
      "website",
  },
};

export default function CalculadoraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}