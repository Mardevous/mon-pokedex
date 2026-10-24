import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PokeDetails from './pages/PokeDetails.jsx'
import AddPokemon from './pages/AddPokemon.jsx'

function App() {

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/add">Ajouter un Pokémon</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/poke/:id" element={<PokeDetails />} />
                <Route path="/add" element={<AddPokemon />} />
            </Routes>
        </div>

         )};
    

export default App