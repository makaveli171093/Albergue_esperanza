import { useState } from "react";
import type { FormEvent } from "react";
import type { Cachorro } from "../data/cachorros";

interface RegistroMascotaProps {
  onRegistrar: (mascota: Cachorro) => void;
  onCerrar: () => void;
}

function RegistroMascota({ onRegistrar, onCerrar }: RegistroMascotaProps) {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState<"Macho" | "Hembra">("Macho");
  const [edad, setEdad] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [esterilizado, setEsterilizado] = useState(false);
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");

  const registrar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (
      !nombre.trim() ||
      !raza.trim() ||
      !peso.trim() ||
      !edad.trim() ||
      !caracteristicas.trim() ||
      !imagen.trim()
    ) {
      setError("Completa todos los campos antes de registrar la mascota.");
      return;
    }

    const pesoNumero = Number(peso);
    const edadNumero = Number(edad);

    if (!Number.isFinite(pesoNumero) || pesoNumero <= 0) {
      setError("El peso debe ser un número mayor que cero.");
      return;
    }

    if (
      !Number.isFinite(edadNumero) ||
      edadNumero < 0 ||
      !Number.isInteger(edadNumero)
    ) {
      setError(
        "La edad debe ser un número entero de meses, igual o mayor que cero.",
      );
      return;
    }

    const nuevoCachorro: Cachorro = {
      id: Date.now(),
      nombre: nombre.trim(),
      raza: raza.trim(),
      peso: pesoNumero,
      sexo,
      edad: edadNumero,
      caracteristicas: caracteristicas.trim(),
      estadoAdopcion: "Disponible",
      esterilizado,
      imagen: imagen.trim(),
    };

    onRegistrar(nuevoCachorro);
  };

  const inputStyle =
    "w-full rounded-xl border border-stone-200 bg-surface px-4 py-3 text-stone-800 outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-emerald-100">
      <div className="flex justify-between items-center mb-5">
        <div className="mb-6">
          <span className="text-secondary text-sm font-semibold">
            🐾 NUEVO RESCATE
          </span>

          <h2 className="text-2xl font-bold text-primary mt-2">
            Registrar una nueva mascota
          </h2>

          <p className="text-stone-500 text-sm mt-2">
            Completa la información de nuestro nuevo integrante.
          </p>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          className="text-slate-500 hover:text-red-600 cursor-pointer"
          aria-label="Cerrar formulario"
        >
          ✕
        </button>
      </div>

      <form onSubmit={registrar} noValidate className="space-y-4">
        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la mascota"
            className={inputStyle}
          />

          <input
            required
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            placeholder="Raza"
            className={inputStyle}
          />

          <input
            required
            type="number"
            min="0.1"
            step="0.1"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Peso en kg"
            className={inputStyle}
          />

          <input
            required
            type="number"
            min="0"
            step="1"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Edad en meses"
            className={inputStyle}
          />

          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value as "Macho" | "Hembra")}
            className={inputStyle}
          >
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="/cachorros/default.jpg"
            className={inputStyle}
          />
        </div>

        <textarea
          required
          value={caracteristicas}
          onChange={(e) => setCaracteristicas(e.target.value)}
          placeholder="Características de la mascota"
          className={inputStyle}
          rows={3}
        />

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={esterilizado}
            onChange={(e) => setEsterilizado(e.target.checked)}
            className="w-5 h-5 accent-emerald-600"
          />
          <span className="text-slate-700">¿La mascota está esterilizada?</span>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="bg-primary text-white rounded-xl px-6 py-3 font-semibold hover:bg-primary-container transition"
          >
            🐾 Guardar mascota
          </button>

          <button
            type="button"
            onClick={onCerrar}
            className="bg-slate-100 text-slate-700 rounded-lg px-6 py-3 hover:bg-slate-200 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistroMascota;
