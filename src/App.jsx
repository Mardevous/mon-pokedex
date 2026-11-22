import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home.jsx'))
const PokeDetails = lazy(() => import('./pages/PokeDetails.jsx'))
const AddPokemon = lazy(() => import('./pages/AddPokemon.jsx'))
const MesPokemons = lazy(() => import('./pages/MesPokemons.jsx'))

function App() {
    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/add">Ajouter un Pokémon</Link>
                <Link to="/mes-pokemons">Mes Pokémons</Link>
            </nav>

            <Suspense fallback={<p>Chargement de la page...</p>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/poke/:id" element={<PokeDetails />} />
                    <Route path="/add" element={<AddPokemon />} />
                    <Route path="/mes-pokemons" element={<MesPokemons />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App