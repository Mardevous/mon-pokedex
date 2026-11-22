import { validerPokemon } from '../utils/validationPokemon'

describe('Validation des Pokémons', () => {
    test('accepte un Pokémon avec un nom et un type', () => {
        const resultat = validerPokemon('Carapuce', 'Eau')

        expect(resultat).toBe(true)
    })

    test('refuse un Pokémon sans nom', () => {
        const resultat = validerPokemon('', 'Eau')

        expect(resultat).toBe(false)
    })

    test('refuse un Pokémon avec uniquement des espaces', () => {
        const resultat = validerPokemon('   ', 'Eau')

        expect(resultat).toBe(false)
    })
})