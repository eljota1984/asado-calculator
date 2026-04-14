"use client";

interface CorteGrafico {
  nombre: string;
  tipo: string;
  porcentaje: number;
}

interface Props {
  detalleCortes: CorteGrafico[];
}

const colores = [
  "#ef4444", // rojo
  "#f97316", // naranjo
  "#eab308", // amarillo
  "#22c55e", // verde
  "#3b82f6", // azul
  "#a855f7", // violeta
  "#ec4899", // rosado
  "#14b8a6", // teal
  "#f43f5e", // rose
  "#84cc16", // lima
];

export default function ResumenGrafico({ detalleCortes }: Props) {
  const cortesValidos = detalleCortes.filter(
    (corte) => corte.porcentaje > 0
  );

  if (cortesValidos.length === 0) return null;

  let acumulado = 0;

  const gradiente = cortesValidos
    .map((corte, index) => {
      const inicio = acumulado;
      const fin = acumulado + corte.porcentaje;
      acumulado = fin;

      return `${colores[index % colores.length]} ${inicio}% ${fin}%`;
    })
    .join(", ");

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-zinc-900 p-6 shadow-lg text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Distribución del asado
      </h2>

      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* CÍRCULO */}
        <div
          className="h-56 w-56 rounded-full border-4 border-zinc-800"
          style={{
            background: `conic-gradient(${gradiente})`,
          }}
        />

        {/* LEYENDA */}
        <div className="w-full space-y-3">
          {cortesValidos.map((corte, index) => (
            <div
              key={corte.nombre}
              className="flex items-center justify-between rounded-lg bg-zinc-800 p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      colores[index % colores.length],
                  }}
                />

                <div>
                  <p className="font-medium text-white">
                    {corte.nombre}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {corte.tipo}
                  </p>
                </div>
              </div>

              <span className="font-semibold text-yellow-400">
                {corte.porcentaje}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}