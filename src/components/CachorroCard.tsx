import type { Cachorro } from "../data/cachorros";

interface CachorroCardProps {
  cachorro: Cachorro;
}

function CachorroCard({ cachorro }: CachorroCardProps) {
  const caracteristicas = cachorro.caracteristicas
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Fotografía */}
      <div className="relative h-56 bg-stone-100">
        <img
          src={cachorro.imagen}
          alt={`Fotografía de ${cachorro.nombre}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Estado de adopción */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              cachorro.estadoAdopcion === "Disponible"
                ? "bg-secondary text-white"
                : "bg-stone-200 text-stone-700"
            }`}
          >
            {cachorro.estadoAdopcion === "Disponible"
              ? "En adopción"
              : "Adoptado"}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Nombre, raza, edad y peso */}
        <div className="flex justify-between items-start gap-3">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {cachorro.nombre}
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              {cachorro.raza} · {cachorro.sexo}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-primary">
              {cachorro.edad} meses
            </p>
            <p className="text-xs text-stone-500 mt-1">{cachorro.peso} kg</p>
          </div>
        </div>

        {/* Características */}
        <div className="flex flex-wrap gap-2">
          {caracteristicas.map((caracteristica, index) => (
            <span
              key={index}
              className="bg-surface-container text-stone-700 px-3 py-1 rounded-lg text-xs font-medium"
            >
              {caracteristica}
            </span>
          ))}
        </div>

        {/* Estado de esterilización */}
        <div className="mt-auto pt-3 border-t border-stone-100">
          <span
            className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold ${
              cachorro.esterilizado
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {cachorro.esterilizado
              ? cachorro.sexo === "Hembra"
                ? "✓ Esterilizada"
                : "✓ Esterilizado"
              : "◷ Pendiente esterilización"}
          </span>
        </div>

        {/* Información final */}
        <p className="text-center text-xs text-stone-400">
          🐾 Una segunda oportunidad para ser feliz
        </p>
      </div>
    </article>
  );
}

export default CachorroCard;
