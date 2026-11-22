import { lazy, Suspense, useState, useEffect } from 'react'
import {
  Routes,
  Route,
  NavLink,
  useLocation
} from 'react-router-dom'

const Home = lazy(() => import('./pages/Home.jsx'))
const PokeDetails = lazy(() => import('./pages/PokeDetails.jsx'))
const AddPokemon = lazy(() => import('./pages/AddPokemon.jsx'))
const MesPokemons = lazy(() => import('./pages/MesPokemons.jsx'))

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Fermer le menu après un changement de page
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'

  return (
    <div className="app-container">
      <header className="header">

        <NavLink to="/" className="logo">
          <span className="logo-icon">✦</span>
          Pokédex<span className="logo-dot">.</span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={`navbar ${menuOpen ? 'navbar-open' : ''}`}
          aria-label="Navigation principale"
        >
          <NavLink to="/" end className={navClass}>
            Accueil
          </NavLink>

          <NavLink to="/add" className={navClass}>
            Ajouter un Pokémon
          </NavLink>

          <NavLink to="/mes-pokemons" className={navClass}>
            Mes Pokémons
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Suspense
          fallback={
            <div className="loading-page" role="status">
              Chargement de la page...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poke/:id" element={<PokeDetails />} />
            <Route path="/add" element={<AddPokemon />} />
            <Route
              path="/mes-pokemons"
              element={<MesPokemons />}
            />
          </Routes>
        </Suspense>
      </main>

      <footer className="footer">
        Mon Pokédex — Projet React
      </footer>
    </div>
  )
}

export default App