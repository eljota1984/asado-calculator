import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://calculadoradeasados.cl/calculadora",
  },
};

export default function CalculadoraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}