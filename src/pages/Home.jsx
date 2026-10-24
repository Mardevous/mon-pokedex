import { useState, useEffect } from 'react'
import Pokemon from '../components/Pokemon.jsx'
import api from '../services/api.js'
import Pagination from '../components/Pagination.jsx'


function Home() {

    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [erreur, setErreur] = useState(null)
    const [page, setPage] = useState(1)
    const [hasNext, setHasNext] = useState(true)

    const limit = 3
    const offset = (page - 1) * limit

    useEffect(() => {
        setIsLoading(true)
        setErreur(null)

        api.get(`/pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => {
            return response.data
        })
        .then((data) => {
            setHasNext(data.next !== null)
            const requetes = data.results.map((pokemon) =>
            api.get(pokemon.url).then((response) => {
                return response.data
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

    }, [page])

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
            id ={pokemon.id}
            />
            ))
        )}
            <Pagination
            page={page}
            setPage={setPage}
            hasNext={hasNext}
            isLoading={isLoading}
            />
   
        </div>

         )};
    

export default Home