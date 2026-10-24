const express = require('express')
const cors = require ('cors')
const fs = require('node:fs/promises')
const path = require('node:path')
const { ransomUUID } = require('node:crypto')

const app = express()
const PORT = 3000
const fichierPokemons = path.join(__dirname, 'pokemon.json')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Pokémon')
})
app.post('/pokemon', (req, res) => {
    const nouveauPokemon = req.body || {}

    

    console.log('Pokemon reçu:', nouveauPokemon)

    res.status(201).json({
        message: 'Pokemon reçu avec succès',
        pokemon: nouveauPokemon
    })
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
})