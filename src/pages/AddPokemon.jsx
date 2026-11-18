import {useState} from 'react'
import backendApi from '../services/backendApi'

function AddPokemon () {
    const [nom, setNom] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const nouveauPokemon = {
            name: nom,
            type: type
        }

        try {
            const response = await backendApi.post('/pokemon', nouveauPokemon)
            console.log('Pokémon enregistré :', response.data)

            setNom('')
            setType('')
        } catch (error) {
            console.error("Erreur lors de l'ajout du Pokémon :", error)
        }
        
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