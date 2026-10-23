import { useState, useEffect } from 'react'
import Pokemon from './components/Pokemon.jsx'


function App() {

    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [erreur, setErreur] = useState(null)

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=3")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération")
            }
            return response.json()
        })
        .then((data) => {
            const requetes = data.results.map((pokemon) =>
            fetch(pokemon.url).then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors des détails")
                }
                return response.json()
            }))
            return Promise.all(requetes)
        })
        .then((details) => {
            console.log(details)
            setPokemons(details)
        })
        .catch((error) => {
            console.error(error)
            setErreur(error.message)
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [])

    return (
        <div>
            <h1>Mon Pokédex</h1>

            {isLoading ? (
                <p>Chargement des Pokémons...</p>
            ) : erreur ? (
                <p>Erreur : {erreur}</p>
            ) : pokemons.length === 0 ? (
                <p>Aucun pokemon disponible.</p>
            ) : (
            pokemons.map((pokemon) => (
            <Pokemon 
            key={pokemon.id}
            nom={pokemon.name}
            element={pokemon.types.map((t) => t.type.name).join(", ")}
            image={pokemon.sprites.front_default} 
            />
            ))
        )}
   
        </div>

         )};
    

export default App