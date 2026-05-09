import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de Asados | Cuánta carne comprar",
  description: "Calcula cuánta carne necesitas para tu asado según el número de personas. Estimación de kilos, costos y compra sugerida por producto.",
  keywords: ["calculadora asado", "cuanta carne para asado", "asado chileno", "calculadora parrilla"],
  openGraph: {
    title: "Calculadora de Asados",
    description: "Planifica tu asado perfecto: kilos, cortes y costos estimados.",
    url: "https://asado-calculator-eight.vercel.app",
    siteName: "Calculadora de Asados",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
