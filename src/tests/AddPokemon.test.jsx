import { render, screen } from '@testing-library/react'
import AddPokemon from '../pages/AddPokemon'
import userEvent from '@testing-library/user-event'
import backendApi from '../services/backendApi'

jest.mock('../services/backendApi', () => ({
    post: jest.fn()
}))

describe('Composant AddPokemon', () => {
    test('affiche le titre du formulaire', () => {

        render(<AddPokemon />)

        const titre = screen.getByText('Ajouter un Pokémon')

        expect(titre).toBeInTheDocument()
    })

    test('permet de saisir le nom et le type du Pokémon', async () => {
        const user = userEvent.setup()

        render(<AddPokemon />)

        const champNom = screen.getByLabelText('Nom :')
        const champType = screen.getByLabelText('Type :')

        await user.type(champNom, 'Carapuce')
        await user.type(champType, 'Eau')

        expect(champNom).toHaveValue('Carapuce')
        expect(champType).toHaveValue('Eau')
    })

    test('envoie un Pokémon au backend', async () => {
        const user = userEvent.setup()

        backendApi.post.mockResolvedValue({
            data: {
                message: 'Pokémon enregistré avec succès'
            }
        })

        render(<AddPokemon />)

        const champNom = screen.getByLabelText('Nom :')
        const champType = screen.getByLabelText('Type :')
        const bouton = screen.getByRole('button', { name: 'Ajouter'})

        await user.type(champNom, 'Carapuce')
        await user.type(champType, 'Eau')
        await user.click(bouton)

        expect(backendApi.post).toHaveBeenCalledWith('/pokemon', {
            name: 'Carapuce',
            type: 'Eau'
        })
    })
})