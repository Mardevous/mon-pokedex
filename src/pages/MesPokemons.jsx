import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import backendApi from '../services/backendApi.js'
import '../css/MesPokemons.css'

function MesPokemons() {
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [erreurSuppression, setErreurSuppression] = useState(null)

  const [pokemonASupprimer, setPokemonASupprimer] = useState(null)
  const [suppressionEnCours, setSuppressionEnCours] = useState(null)

  useEffect(() => {
    backendApi.get('/pokemon')
      .then((response) => {
        setPokemons(response.data)
      })
      .catch((error) => {
        console.error(error)
        setErreur('Impossible de récupérer les Pokémons')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const supprimerPokemon = async (id) => {
    setErreurSuppression(null)
    setSuppressionEnCours(id)

    try {
      await backendApi.delete(`/pokemon/${id}`)

      setPokemons((anciensPokemons) =>
        anciensPokemons.filter(
          (pokemon) => pokemon.id !== id
        )
      )

      setPokemonASupprimer(null)
    } catch (error) {
      console.error('Erreur lors de la suppression :', error)
      setErreurSuppression('Impossible de supprimer le Pokémon')
    } finally {
      setSuppressionEnCours(null)
    }
  }

  return (
    <div className="collection-page">

      <section className="collection-hero">
        <span className="collection-hero-label">
          ✦ MA COLLECTION
        </span>

        <h1>Mes Pokémons</h1>

        <p>
          Retrouve tous les Pokémon que tu as enregistrés
          et organise ta collection personnelle.
        </p>
      </section>

      <section className="collection-section">

        <div className="collection-heading">
          <div>
            <h2>Ma collection</h2>
            <p>Les Pokémon enregistrés dans ton Pokédex.</p>
          </div>

          {!isLoading && !erreur && (
            <span className="collection-count">
              {pokemons.length} Pokémon
              {pokemons.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {erreurSuppression && (
          <p className="collection-error" role="alert">
            {erreurSuppression}
          </p>
        )}

        {isLoading ? (
          <p className="collection-message" role="status">
            Chargement des Pokémon...
          </p>
        ) : erreur ? (
          <p className="collection-error" role="alert">
            {erreur}
          </p>
        ) : pokemons.length === 0 ? (
          <div className="collection-empty">
            <span className="collection-empty-icon" aria-hidden="true">
              ✦
            </span>

            <h3>Ta collection est vide</h3>

            <p>
              Ajoute ton premier Pokémon pour commencer
              ta collection !
            </p>

            <Link to="/add" className="collection-add-button">
              + Ajouter un Pokémon
            </Link>
          </div>
        ) : (
          <div className="collection-grid">
            {pokemons.map((pokemon, index) => (
              <article
                key={pokemon.id}
                className="collection-card"
              >
                <div className="collection-card-top">
                  <span
                    className="collection-card-icon"
                    aria-hidden="true"
                  >
                    ✦
                  </span>

                  <span className="collection-card-number">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="collection-card-name">
                  {pokemon.name}
                </h3>

                <span className="collection-card-type">
                  {pokemon.type}
                </span>

                <div className="collection-card-divider" />

                {pokemonASupprimer === pokemon.id ? (
                  <div className="collection-confirm">
                    <p>Confirmer la suppression ?</p>

                    <div className="collection-confirm-actions">
                      <button
                        type="button"
                        className="collection-cancel-button"
                        disabled={suppressionEnCours !== null}
                        onClick={() => setPokemonASupprimer(null)}
                      >
                        Annuler
                      </button>

                      <button
                        type="button"
                        className="collection-confirm-button"
                        disabled={suppressionEnCours !== null}
                        onClick={() => supprimerPokemon(pokemon.id)}
                      >
                        {suppressionEnCours === pokemon.id
                          ? 'Suppression...'
                          : 'Confirmer'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="collection-delete-button"
                    disabled={suppressionEnCours !== null}
                    onClick={() => {
                      setErreurSuppression(null)
                      setPokemonASupprimer(pokemon.id)
                    }}
                  >
                    Supprimer
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default MesPokemons