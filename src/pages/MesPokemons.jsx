import { useState, useEffect } from 'react'
import backendApi from '../services/backendApi.js'

function MesPokemons() {
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [erreur, setErreur] = useState(null)
    const [erreurSuppression, setErreurSuppression] = useState(null)

    useEffect(() => {
        backendApi.get('/pokemon')
            .then((response) => {
                setPokemons(response.data)
            })
            .catch((error) => {
                console.error(error)
                setErreur('Impossible de récupérer les Pokémons')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const supprimerPokemon = async (id) => {
    setErreurSuppression(null)

    try {
        await backendApi.delete(`/pokemon/${id}`)

        setPokemons((anciensPokemons) =>
            anciensPokemons.filter((pokemon) => pokemon.id !== id)
        )
    } catch (error) {
        console.error('Erreur lors de la suppression :', error)
        setErreurSuppression('Impossible de supprimer le Pokémon')
    }
}

if (isLoading) {
    return <p>Chargement des Pokémons...</p>
}

if (erreur) {
    return <p>{erreur}</p>
}

return (
    <div>
        <h1> Mes Pokémons </h1>

        {erreurSuppression && (
    <p role="alert">{erreurSuppression}</p>
)}

        {pokemons.length === 0 ? (
            <p>Aucun Pokémon enregistré</p>
        ) : (
            pokemons.map((pokemon) => (
                <div key={pokemon.id}>
                    <h2>{pokemon.name}</h2>
                    <p>Type : {pokemon.type}</p>

                    <button onClick={() => supprimerPokemon(pokemon.id)}>
                        Supprimer
                    </button>
                 </div>
            ))
        )
    }
    </div>
   
)
}

export default MesPokemons