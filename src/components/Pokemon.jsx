import { Link } from 'react-router-dom'

function Pokemon({ id, nom, element, image }) {
  return (
    <article className="pokemon-card">
      <div className="pokemon-image-container">
        <img
          src={image}
          alt={nom}
          className="pokemon-image"
          loading="lazy"
        />
      </div>

      <div className="pokemon-info">
        <span className="pokemon-number">
          #{String(id).padStart(3, '0')}
        </span>

        <h3 className="pokemon-name">{nom}</h3>

        <p className="pokemon-type">{element}</p>

        <Link
          to={`/poke/${id}`}
          className="pokemon-button"
        >
          Voir détails →
        </Link>
      </div>
    </article>
  )
}

export default Pokemon