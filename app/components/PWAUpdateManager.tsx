"use client";

import { useEffect, useRef, useState } from "react";

const MINUTOS_ENTRE_REVISIONES = 5;
const TIEMPO_ENTRE_REVISIONES =
  MINUTOS_ENTRE_REVISIONES * 60 * 1000;

export default function PWAUpdateManager() {
  const [actualizacionDisponible, setActualizacionDisponible] =
    useState(false);

  const teniaControlador = useRef(false);
  const ultimaRevision = useRef(0);
  const recargando = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    teniaControlador.current =
      Boolean(navigator.serviceWorker.controller);

    const comprobarActualizacion = async (
      forzar = false
    ) => {
      if (!navigator.onLine) {
        return;
      }

      const ahora = Date.now();

      if (
        !forzar &&
        ahora - ultimaRevision.current <
          TIEMPO_ENTRE_REVISIONES
      ) {
        return;
      }

      ultimaRevision.current = ahora;

      try {
        const registro =
          await navigator.serviceWorker.ready;

        await registro.update();
      } catch {
        // Si no hay red o falla la comprobación,
        // la aplicación continúa funcionando normalmente.
      }
    };

    const manejarCambioControlador = () => {
      if (teniaControlador.current) {
        setActualizacionDisponible(true);
      } else {
        teniaControlador.current = true;
      }
    };

    const manejarVisibilidad = () => {
      if (document.visibilityState === "visible") {
        void comprobarActualizacion();
      }
    };

    const manejarOnline = () => {
      void comprobarActualizacion(true);
    };

    const manejarFocus = () => {
      void comprobarActualizacion();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      manejarCambioControlador
    );

    document.addEventListener(
      "visibilitychange",
      manejarVisibilidad
    );

    window.addEventListener(
      "online",
      manejarOnline
    );

    window.addEventListener(
      "focus",
      manejarFocus
    );

    void comprobarActualizacion(true);

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        manejarCambioControlador
      );

      document.removeEventListener(
        "visibilitychange",
        manejarVisibilidad
      );

      window.removeEventListener(
        "online",
        manejarOnline
      );

      window.removeEventListener(
        "focus",
        manejarFocus
      );
    };
  }, []);

  const actualizarAplicacion = () => {
    if (recargando.current) {
      return;
    }

    recargando.current = true;
    window.location.reload();
  };

  if (!actualizacionDisponible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border border-red-500/40 bg-zinc-950/95 p-4 shadow-2xl shadow-red-950/40 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-black text-white">
            🔥 Nueva versión disponible
          </p>

          <p className="mt-1 text-sm leading-5 text-zinc-400">
            Actualiza Mi Asado para usar los precios,
            mejoras y cálculos más recientes.
          </p>
        </div>

        <button
          type="button"
          onClick={actualizarAplicacion}
          className="shrink-0 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-500"
        >
          Actualizar ahora
        </button>
      </div>
    </div>
  );
}