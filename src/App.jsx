import { useState, useEffect } from 'react'
import Pokemon from './components/Pokemon.jsx'


function App() {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=3")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération")
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
        })

    }, [])

    return (
        <div>
            <h1>Mon Pokédex</h1>

            {pokemons.length === 0 ? (
                <p>Aucun pokemon disponible.</p>
            ) : (
            pokemons.map((pokemon) => (
            <Pokemon 
            key={pokemon.id}
            nom={pokemon.nom}
            element={pokemon.element} 
            />
            ))
        )}
   
        </div>

         )};
    

export default App