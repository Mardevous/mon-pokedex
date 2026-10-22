import Pokemon from './components/Pokemon.jsx'

const pokemons = [
]


function App() {

    return (
        <div>
            <h1>Mon Pokédex</h1>

            {pokemons.length === 0 ? (
                <p>Aucun pokemon disponible.</p>
            ) : (
            pokemons.map((pokemon) => (
            <Pokemon 
            key={pokemon.id}
            nom={pokemon.nom}
            element={pokemon.element} 
            />
            ))
        )}
   
        </div>

         )};
    

export default App