import { calculerOffset } from '../utils/pagination'

describe('test de pagination', () => {
    test('calcule correctement offset pour la page 1', () => {
        const resultat = calculerOffset(1,3)

        expect(resultat).toBe(0)
    })

    test('calcule correctement offset pour la page 3', async () => {
        const resultat = calculerOffset(3,3)

        expect(resultat).toBe(6)
    })
})