import { useState, useEffet } from 'react'
import backendApi from '../services/backendApi'

function MesPokemons() {
    const [pokemons, setPokemons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [erreur, setErreur] = useState(null)

    useEffect(() => {
        backendApi.get('/pokemons')
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

if (isLoading) {
    return <p>Chargement des Pokémons...</p>
}

if (erreur) {
    return <p>{erreur}</p>
}

return (
    <div>
        <h1> Mes Pokémons </h1>

        {pokemons.length === 0 ? (
            <p>Aucun Pokémon enregistré</p>
        ) : (
            pokemons.map((pokemon) => (
                <div key={pokemon.id}>
                    <h2>{pokemon.name}</h2>
                    <p>Type : {pokemon.type}</p>
                 </div>
            ))
        )
    }
    </div>
   
)
}

export default MesPokemons