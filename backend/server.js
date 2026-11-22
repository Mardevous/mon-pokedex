const express = require('express')
const cors = require ('cors')
const fs = require('node:fs/promises')
const path = require('node:path')
const { randomUUID } = require('node:crypto')

const app = express()
const PORT = port.env.PORT || 3000
const fichierPokemons = path.join(__dirname, 'pokemons.json')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Pokémon')
})
app.post('/pokemon', async (req, res) => {
    const { name, type } = req.body || {}

    if (
        typeof name !== 'string' ||
        typeof type !== 'string' ||
        !name.trim() ||
        !type.trim()
    ) {
        return res.status(400).json({
            message: 'Le nom et le type sont obligatoires'
        })
    }

    try {
        const contenu = await fs.readFile(fichierPokemons, 'utf8')
        const pokemons = JSON.parse(contenu)
    

    const nouveauPokemon = {
        id: randomUUID(),
        name: name.trim(),
        type: type.trim()
    }

    pokemons.push(nouveauPokemon)

    await fs.writeFile(
        fichierPokemons,
        JSON.stringify(pokemons, null, 2),
        'utf8'
    )

    res.status(201).json({
        message: 'Pokemon reçu avec succès',
        pokemon: nouveauPokemon
    })

} catch (error) {
    console.error(error)

    res.status(500).json({
        message: "Erreur lors de l'enregistrement du Pokémon"
    })
}
})

app.get('/pokemon', async (req, res) => {
    try {
        const contenu = await fs.readFile(fichierPokemons, 'utf8')
        const pokemons = JSON.parse(contenu)

        res.status(200).json(pokemons)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: 'Erreur lors de la récupération des Pokémons'
        })
    }
})

app.delete('/pokemon/:id', async (req, res) => {
    const {id} = req.params

    try {
        const contenu = await fs.readFile(fichierPokemons, 'utf8')
        const pokemons = JSON.parse(contenu)

        const nouveauxPokemons = pokemons.filter(
            (pokemon) => pokemon.id !== id
        )

        if (nouveauxPokemons.length === pokemons.length) {
            return res.status(404).json({
                message: 'Pokemon introuvable'
            })
        }
        
        await fs.writeFile(
            fichierPokemons,
            JSON.stringify(nouveauxPokemons, null, 2),
            'utf8'
        )

        res.status(200).json({
            message: 'Pokemon supprimé avec succès'
        })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Erreur lors de la suppresion du Pokémon'
            })
        }
    }
)

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Serveur démarré sur le port ${PORT}`)
    })
}

module.exports = app