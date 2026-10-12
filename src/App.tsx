import { useState } from "react";
import Header from "./components/Header";
import CachorroCard from "./components/CachorroCard";
import RegistroMascota from "./components/RegistroMascota";
import { cachorrosIniciales } from "./data/cachorros";
import type { Cachorro } from "./data/cachorros";
import Estadisticas from "./components/Estadisticas";

function App() {
  const [cachorros, setCachorros] = useState<Cachorro[]>(cachorrosIniciales);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const registrarMascota = (nuevaMascota: Cachorro) => {
    setCachorros((anteriores) => [...anteriores, nuevaMascota]);

    setMostrarFormulario(false);
  };

  const disponibles = cachorros.filter(
    (mascota) => mascota.estadoAdopcion === "Disponible",
  ).length;

  const esterilizados = cachorros.filter(
    (mascota) => mascota.esterilizado,
  ).length;

  const [busqueda, setBusqueda] = useState("");
  const [filtroAdopcion, setFiltroAdopcion] = useState("Todos");

  const cachorrosFiltrados = cachorros.filter((cachorro) => {
    const coincideBusqueda =
      cachorro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cachorro.raza.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroAdopcion === "Todos" || cachorro.estadoAdopcion === filtroAdopcion;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        total={cachorros.length}
        onAgregar={() => setMostrarFormulario((anterior) => !anterior)}
      />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {mostrarFormulario && (
          <RegistroMascota
            onRegistrar={registrarMascota}
            onCerrar={() => setMostrarFormulario(false)}
          />
        )}
        <Estadisticas
          total={cachorros.length}
          disponibles={disponibles}
          esterilizados={esterilizados}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Conoce a nuestros rescatados
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Pequeñas historias esperando un nuevo hogar.
            </p>
          </div>

          <input
            type="text"
            placeholder="🔍 Buscar por nombre o raza..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full mb-6 px-5 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <div className="flex flex-wrap gap-3 mb-8">
            {["Todos", "Disponible", "Adoptado"].map((estado) => (
              <button
                key={estado}
                type="button"
                onClick={() => setFiltroAdopcion(estado)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  filtroAdopcion === estado
                    ? "bg-primary text-white"
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-surface-container"
                }`}
              >
                {estado === "Disponible" ? "En adopción" : estado}
              </button>
            ))}
          </div>

          <span className="text-sm text-slate-500">
            {cachorros.length} resultados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cachorrosFiltrados.map((cachorro) => (
            <CachorroCard key={cachorro.id} cachorro={cachorro} />
          ))}
        </div>

        {cachorrosFiltrados.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            🐾 No encontramos mascotas con esos criterios.
          </div>
        )}
      </main>

      <footer className="bg-emerald-950 text-emerald-100 text-center py-6 mt-12">
        <p className="text-sm">🐾 Huellitas de Esperanza — Cada vida importa</p>
      </footer>
    </div>
  );
}

export default App;
