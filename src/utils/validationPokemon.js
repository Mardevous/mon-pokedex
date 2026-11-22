export function validerPokemon(nom, type) {
    if (!nom.trim() || !type.trim()) {
        return false
    }
    return true
}