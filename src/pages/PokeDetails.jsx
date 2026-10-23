import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../services/api.js'

function PokeDetails() {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [erreur, setErreur] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setErreur(null)
        setPokemon(null)
        api.get(`/pokemon/${id}`)
            .then ((response) => {
                setPokemon(response.data)
            })
            .catch((error) => {
            console.error(error)
            setErreur("Impossible de récupérer ce Pokémon")
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [id])

        if (isLoading) {
    return <p>Chargement du Pokémon...</p>
}

if (erreur) {
    return <p>{erreur}</p>
}

if (!pokemon) {
    return <p>Aucun Pokémon trouvé.</p>
}

return (
    <div>
        <h1>{pokemon.name}</h1>

        <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
        />

        <p>
            Type : {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>

        <p>Taille : {pokemon.height / 10} m</p>

        <p>Poids : {pokemon.weight / 10} kg</p>
    </div>
)

}

export default PokeDetails