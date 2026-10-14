import { useState } from "react";
import Header from "./components/Header";
import CachorroCard from "./components/CachorroCard";
import RegistroMascota from "./components/RegistroMascota";
import { cachorrosIniciales, RAZAS } from "./data/cachorros";
import type { Cachorro } from "./data/cachorros";
import Estadisticas from "./components/Estadisticas";

function App() {
  const [cachorros, setCachorros] = useState<Cachorro[]>(cachorrosIniciales);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const registrarMascota = (mascota: Cachorro) => {
    setCachorros((anteriores) =>
      mascotaEditando
        ? anteriores.map((cachorro) =>
            cachorro.id === mascota.id ? mascota : cachorro,
          )
        : [...anteriores, mascota],
    );

    setMostrarFormulario(false);
    setMascotaEditando(null);
  };
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setMascotaEditando(null);
  };

  const disponibles = cachorros.filter(
    (mascota) => mascota.estadoAdopcion === "Disponible",
  ).length;

  const esterilizados = cachorros.filter(
    (mascota) => mascota.esterilizado,
  ).length;

  const [busqueda, setBusqueda] = useState("");
  const [filtroAdopcion, setFiltroAdopcion] = useState("Todos");
  const [filtroSexo, setFiltroSexo] = useState("Todos");
  const [filtroRaza, setFiltroRaza] = useState("Todas");
  const [filtroEsterilizado, setFiltroEsterilizado] = useState("Todos");
  const [edadMaxima, setEdadMaxima] = useState("");
  const [mascotaEditando, setMascotaEditando] = useState<Cachorro | null>(null);
  const razas = [
    ...new Set([...RAZAS, ...cachorros.map((cachorro) => cachorro.raza)]),
  ];

  const cambiarRaza = (id: number, nuevaRaza: string) => {
    setCachorros((anteriores) =>
      anteriores.map((cachorro) =>
        cachorro.id === id ? { ...cachorro, raza: nuevaRaza } : cachorro,
      ),
    );
  };

  const cachorrosFiltrados = cachorros.filter((cachorro) => {
    const coincideBusqueda =
      cachorro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cachorro.raza.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroAdopcion === "Todos" || cachorro.estadoAdopcion === filtroAdopcion;

    const coincideSexo = filtroSexo === "Todos" || cachorro.sexo === filtroSexo;

    const coincideRaza = filtroRaza === "Todas" || cachorro.raza === filtroRaza;

    const coincideEsterilizado =
      filtroEsterilizado === "Todos" ||
      (filtroEsterilizado === "Si" && cachorro.esterilizado) ||
      (filtroEsterilizado === "No" && !cachorro.esterilizado);

    const coincideEdad =
      edadMaxima === "" || cachorro.edad <= Number(edadMaxima);

    return (
      coincideBusqueda &&
      coincideEstado &&
      coincideSexo &&
      coincideRaza &&
      coincideEsterilizado &&
      coincideEdad
    );
  });

  const eliminarMascota = (id: number) => {
    setCachorros((anteriores) =>
      anteriores.filter((cachorro) => cachorro.id !== id),
    );
  };

  const iniciarEdicion = (mascota: Cachorro) => {
    setMascotaEditando(mascota);
    setMostrarFormulario(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        total={cachorros.length}
        onAgregar={() => {
          setMascotaEditando(null);
          setMostrarFormulario(true);
        }}
      />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {mostrarFormulario && (
          <RegistroMascota
            key={mascotaEditando?.id ?? "nueva"}
            mascotaInicial={mascotaEditando}
            onRegistrar={registrarMascota}
            onCerrar={cerrarFormulario}
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

          <label className="flex flex-col gap-1 text-sm text-stone-600">
            Sexo
            <select
              value={filtroSexo}
              onChange={(e) => setFiltroSexo(e.target.value)}
              className="px-4 py-2 rounded-xl border border-stone-200 bg-white"
            >
              <option value="Todos">Todos</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-stone-600">
            Raza
            <select
              value={filtroRaza}
              onChange={(e) => setFiltroRaza(e.target.value)}
              className="px-4 py-2 rounded-xl border border-stone-200 bg-white"
            >
              <option value="Todas">Todas</option>

              {razas.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-stone-600">
            Esterilizado
            <select
              value={filtroEsterilizado}
              onChange={(e) => setFiltroEsterilizado(e.target.value)}
              className="px-4 py-2 rounded-xl border border-stone-200 bg-white"
            >
              <option value="Todos">Todos</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-stone-600">
            Edad máxima
            <input
              type="number"
              min="0"
              step="1"
              value={edadMaxima}
              onChange={(e) => setEdadMaxima(e.target.value)}
              placeholder="Sin límite"
              className="px-4 py-2 rounded-xl border border-stone-200 bg-white"
            />
          </label>

          <span className="text-sm text-slate-500">
            {cachorrosFiltrados.length} resultados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cachorrosFiltrados.map((cachorro) => (
            <CachorroCard
              key={cachorro.id}
              cachorro={cachorro}
              razas={razas}
              onCambiarRaza={(nuevaRaza) => cambiarRaza(cachorro.id, nuevaRaza)}
              onEliminar={() => eliminarMascota(cachorro.id)}
              onEditar={() => iniciarEdicion(cachorro)}
            />
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
