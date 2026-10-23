import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PokeDetails from './pages/PokeDetails.jsx'

function App() {

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/poke/:id" element={<PokeDetails />} />
            </Routes>
        </div>

         )};
    

export default App