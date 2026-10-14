import type { Cachorro } from "../data/cachorros";

interface CachorroCardProps {
  cachorro: Cachorro;
  razas: string[];
  onCambiarRaza: (nuevaRaza: string) => void;
  onEliminar: () => void;
  onEditar: () => void;
}

function CachorroCard({
  cachorro,
  razas,
  onCambiarRaza,
  onEliminar,
  onEditar,
}: CachorroCardProps) {
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

        <label className="flex flex-col gap-1 text-sm text-stone-600">
          Raza
          <select
            value={cachorro.raza}
            onChange={(e) => onCambiarRaza(e.target.value)}
            className="rounded-xl border border-stone-200 bg-white px-3 py-2"
          >
            {razas.map((raza) => (
              <option key={raza} value={raza}>
                {raza}
              </option>
            ))}
          </select>
        </label>

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

        <button
          type="button"
          onClick={onEditar}
          className="rounded-xl bg-surface-container px-4 py-2 text-sm font-semibold text-primary hover:bg-stone-200 transition"
        >
          Editar mascota
        </button>

        <button
          type="button"
          onClick={onEliminar}
          className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
        >
          Eliminar mascota
        </button>

        {/* Información final */}
        <p className="text-center text-xs text-stone-400">
          🐾 Una segunda oportunidad para ser feliz
        </p>
      </div>
    </article>
  );
}

export default CachorroCard;
