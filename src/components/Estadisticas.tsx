interface EstadisticasProps {
  total: number;
  disponibles: number;
  esterilizados: number;
}

function Estadisticas({
  total,
  disponibles,
  esterilizados,
}: EstadisticasProps) {
  return (
    <section className="mb-10">
      <div className="mb-5">
        <span className="text-secondary text-sm font-semibold">
          NUESTRO IMPACTO
        </span>

        <h2 className="text-2xl font-bold text-primary mt-1">
          Huella de Esperanza
        </h2>

        <p className="text-stone-500 text-sm mt-1">
          Cada rescate cuenta una historia de amor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="text-3xl mb-3">🐾</div>
          <p className="text-4xl font-bold text-primary">{total}</p>
          <p className="text-stone-500 text-sm mt-2">Mascotas registradas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="text-3xl mb-3">💚</div>
          <p className="text-4xl font-bold text-secondary">{disponibles}</p>
          <p className="text-stone-500 text-sm mt-2">Esperando un hogar</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="text-3xl mb-3">🏥</div>
          <p className="text-4xl font-bold text-primary">{esterilizados}</p>
          <p className="text-stone-500 text-sm mt-2">Mascotas esterilizadas</p>
        </div>
      </div>
    </section>
  );
}

export default Estadisticas;
