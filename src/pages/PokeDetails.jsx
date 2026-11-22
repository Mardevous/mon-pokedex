import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../services/api.js'
import '../css/PokeDetails.css'

function PokeDetails() {
  const { id } = useParams()

  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setErreur(null)
    setPokemon(null)

    api.get(`/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data)
      })
      .catch((error) => {
        console.error(error)
        setErreur('Impossible de récupérer ce Pokémon')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return (
      <p className="details-message" role="status">
        Chargement du Pokémon...
      </p>
    )
  }

  if (erreur) {
    return (
      <p className="details-message" role="alert">
        {erreur}
      </p>
    )
  }

  if (!pokemon) {
    return (
      <p className="details-message">
        Aucun Pokémon trouvé.
      </p>
    )
  }

  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default

  return (
    <div className="details-page">

      <Link to="/" className="details-back">
        ← Retour au Pokédex
      </Link>

      <div className="details-card">

        <div className="details-image-section">
          <img
            src={image}
            alt={pokemon.name}
            className="details-image"
          />
        </div>

        <div className="details-info">

          <span className="details-number">
            POKÉMON N°{String(pokemon.id).padStart(3, '0')}
          </span>

          <h1 className="details-name">
            {pokemon.name}
          </h1>

          <div className="details-types">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="details-type"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="details-divider"></div>

          <h2 className="details-subtitle">
            Caractéristiques
          </h2>

          <div className="details-stats">

            <div className="details-stat">
              <span>Taille</span>
              <strong>{pokemon.height / 10} m</strong>
            </div>

            <div className="details-stat">
              <span>Poids</span>
              <strong>{pokemon.weight / 10} kg</strong>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PokeDetails