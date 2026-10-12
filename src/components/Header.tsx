interface HeaderProps {
  onAgregar: () => void;
  total: number;
}

function Header({ onAgregar, total }: HeaderProps) {
  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-surface border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center text-2xl">
              🐾
            </div>

            <div>
              <h2 className="text-primary font-bold text-lg">
                Huellitas de Esperanza
              </h2>
              <p className="text-stone-500 text-xs">Refugio y rescate animal</p>
            </div>
          </div>

          <span className="hidden sm:block text-secondary font-medium text-sm">
            Un hogar para cada huellita
          </span>
        </div>
      </nav>

      {/* Banner principal */}
      <header className="bg-surface px-6 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-surface-container rounded-3xl p-7 md:p-12 relative overflow-hidden">
            {/* Decoración */}
            <div className="absolute -right-16 -bottom-20 w-72 h-72 bg-secondary-light/40 rounded-full" />
            <div className="absolute right-20 -top-16 w-32 h-32 bg-amber-200/30 rounded-full" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block bg-white text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                🐾 Refugio & Rescate
              </span>

              <h1 className="text-3xl md:text-5xl font-extrabold text-primary mt-6 leading-tight">
                Cada patita merece un hogar lleno de amor.
              </h1>

              <p className="text-stone-600 mt-5 text-base md:text-lg leading-relaxed">
                Conectamos corazones rescatados con familias conscientes y
                responsables. Cada nueva adopción representa una segunda
                oportunidad.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={onAgregar}
                  className="bg-primary-container text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-primary transition-all hover:-translate-y-0.5"
                >
                  + Registrar nueva mascota de rescate
                </button>

                <span className="text-stone-600 text-sm font-medium">
                  {total} mascotas registradas
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
