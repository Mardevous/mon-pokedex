import {useState} from 'react'

function AddPokemon () {
    const [nom, setNom] = useState('')
    const [type, setType] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const nouveauPokemon = {
            name: nom,
            type: type
        }
        api.post('/pokemon', nouveauPokemon)
    }

    return (
        <div>
            <h1>Ajouter un Pokémon</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom :</label>
                    <input
                        id="nom"
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="type">Type :</label>
                    <input
                        id="type"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}

export default AddPokemon