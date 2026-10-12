"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<{
    outcome: "accepted" | "dismissed";
  }>;
};

const DISMISS_KEY = "mi-asado-install-dismissed-until";
const SIETE_DIAS = 7 * 24 * 60 * 60 * 1000;

export default function PWAInstallBanner() {
  const [installPrompt, setInstallPrompt] =
    useState<InstallPromptEvent | null>(null);

  const [visible, setVisible] = useState(false);
  const [esIOS, setEsIOS] = useState(false);
  const [mostrarInstrucciones, setMostrarInstrucciones] =
    useState(false);

  useEffect(() => {
    const instalada =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean })
        .standalone === true;

    if (instalada) return;

    const ios =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    setEsIOS(ios);

    let descartada = false;

    try {
      descartada =
        Number(localStorage.getItem(DISMISS_KEY) || "0") >
        Date.now();
    } catch {
      // El almacenamiento puede estar restringido.
    }

    if (descartada) return;

    if (ios) {
      setVisible(true);
    }

    const manejarInstalacion = (evento: Event) => {
      evento.preventDefault();

      setInstallPrompt(evento as InstallPromptEvent);
      setVisible(true);
    };

    const manejarAppInstalada = () => {
      setVisible(false);
      setInstallPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      manejarInstalacion
    );

    window.addEventListener(
      "appinstalled",
      manejarAppInstalada
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        manejarInstalacion
      );

      window.removeEventListener(
        "appinstalled",
        manejarAppInstalada
      );
    };
  }, []);

  const cerrar = () => {
    setVisible(false);

    try {
      localStorage.setItem(
        DISMISS_KEY,
        String(Date.now() + SIETE_DIAS)
      );
    } catch {
      // No es indispensable guardar la preferencia.
    }
  };

  const instalar = async () => {
    if (!installPrompt) return;

    const evento = installPrompt;

    setInstallPrompt(null);
    setVisible(false);

    try {
      const resultado = await evento.prompt();

      if (resultado.outcome === "dismissed") {
        try {
          localStorage.setItem(
            DISMISS_KEY,
            String(Date.now() + SIETE_DIAS)
          );
        } catch {
          // La navegación puede continuar normalmente.
        }
      }
    } catch {
      // El navegador puede cancelar la solicitud.
    }
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Instalar Mi Asado"
      className="fixed inset-x-3 top-3 z-[90] mx-auto max-w-lg rounded-2xl border border-red-500/40 bg-zinc-950/95 p-4 text-white shadow-2xl backdrop-blur"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-2xl">
          🔥
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-base font-black">
            Lleva Mi Asado contigo
          </p>

          <p className="mt-1 text-sm leading-6 text-zinc-300">
            Instálala gratis y calcula tus asados incluso
            sin Internet.
          </p>

          {esIOS ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setMostrarInstrucciones(true)
                }
                className="mt-3 min-h-11 rounded-xl bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-500"
              >
                Cómo instalar
              </button>

              {mostrarInstrucciones && (
                <p className="mt-3 text-sm leading-6 text-zinc-200">
                  Abre la web en Safari, toca
                  {" "}Compartir → Agregar a Inicio,
                  activa «Abrir como app web» si aparece
                  y pulsa Agregar.
                </p>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={instalar}
              className="mt-3 min-h-11 rounded-xl bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-500"
            >
              Instalar gratis ↓
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar invitación para instalar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          ×
        </button>
      </div>
    </aside>
  );
}