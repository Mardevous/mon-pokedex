import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PokeDetails from './pages/PokeDetails.jsx'
import AddPokemon from './pages/AddPokemon.jsx'
import MesPokemons from './pages/MesPokemons'


function App() {

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/add">Ajouter un Pokémon</Link>
                <Link to="/mes-pokemons">Mes Pokémons</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/poke/:id" element={<PokeDetails />} />
                <Route path="/add" element={<AddPokemon />} />
                <Route path="/mes pokemons" element={<MesPokemons />} />
            </Routes>
        </div>

         )};
    

export default App