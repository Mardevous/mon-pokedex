import {useState} from 'react'
import backendApi from '../services/backendApi'

function AddPokemon () {
    const [nom, setNom] = useState('')
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const nouveauPokemon = {
            name: nom,
            type: type
        }

        try {
            const response = await backendApi.post('/pokemon', nouveauPokemon)
            console.log('Pokémon enregistré :', response.data)
            setMessage('Pokémon enregistré avec succès !')

            setNom('')
            setType('')
        } catch (error) {
            console.error("Erreur lors de l'ajout du Pokémon :", error)
            setMessage("Erreur lors de l'enregistrement du Pokémon.")
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
            {message && <p>{message}</p>}
        </div>
    )
}

export default AddPokemon