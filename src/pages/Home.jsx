import { useState, useEffect } from 'react'
import Pokemon from '../components/Pokemon.jsx'
import api from '../services/api.js'
import Pagination from '../components/Pagination.jsx'
import { calculerOffset } from '../utils/pagination.js'
import usePokemonStore from '../store/usePokemonStore.js'
import '../css/HomePage.css'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [hasNext, setHasNext] = useState(true)

  const page = usePokemonStore((state) => state.page)
  const setPage = usePokemonStore((state) => state.setPage)

  const limit = 3
  const offset = calculerOffset(page, limit)

  useEffect(() => {
    setIsLoading(true)
    setErreur(null)

    api.get(`/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.data)
      .then((data) => {
        setHasNext(data.next !== null)

        const requetes = data.results.map((pokemon) =>
          api.get(pokemon.url).then((response) => response.data)
        )

        return Promise.all(requetes)
      })
      .then((details) => {
        setPokemons(details)
      })
      .catch((error) => {
        console.error(error)
        setErreur(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [page, offset])

  return (
    <div className="home-page">

      <section className="home-hero">
        <span className="hero-label">
          ✦ TON UNIVERS POKÉMON
        </span>

        <h1>Mon Pokédex</h1>

        <p>
          Explore les Pokémon, découvre leurs caractéristiques
          et construis ta propre collection !
        </p>
      </section>

      <section className="pokemon-section">
        <div className="section-heading">
          <div>
            <h2>Explorer les Pokémon</h2>
            <p>Découvre les Pokémon de ton Pokédex.</p>
          </div>

          <span className="page-indicator">
            Page {page}
          </span>
        </div>

        {isLoading ? (
          <p className="state-message" role="status">
            Chargement des Pokémon...
          </p>
        ) : erreur ? (
          <p className="state-message" role="alert">
            Erreur : {erreur}
          </p>
        ) : pokemons.length === 0 ? (
          <p className="state-message">
            Aucun Pokémon disponible.
          </p>
        ) : (
          <div className="pokemon-grid">
            {pokemons.map((pokemon) => (
              <Pokemon
                key={pokemon.id}
                id={pokemon.id}
                nom={pokemon.name}
                element={pokemon.types
                  .map((t) => t.type.name)
                  .join(', ')}
                image={
                    pokemon.sprites.other['official-artwork'].front_default
                    || pokemon.sprites.front_default
                }
              />
            ))}
          </div>
        )}

        <div className="pagination-container">
          <Pagination
            page={page}
            setPage={setPage}
            hasNext={hasNext}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  )
}

export default Home