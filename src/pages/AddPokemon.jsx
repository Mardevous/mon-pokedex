import { useState } from 'react'
import backendApi from '../services/backendApi'
import '../css/AddPokemon.css'

function AddPokemon() {
  const [nom, setNom] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLoading) return

    const nouveauPokemon = {
      name: nom.trim(),
      type: type.trim()
    }

    if (!nouveauPokemon.name || !nouveauPokemon.type) {
      setMessage('Merci de remplir tous les champs.')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await backendApi.post(
        '/pokemon',
        nouveauPokemon
      )

      console.log('Pokémon enregistré :', response.data)

      setMessage('Pokémon enregistré avec succès !')
      setIsSuccess(true)
      setNom('')
      setType('')
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du Pokémon :",
        error
      )

      setMessage("Erreur lors de l'enregistrement du Pokémon.")
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="add-page">
      <section className="add-hero">
        <span className="add-hero-label">
          ✦ MA COLLECTION
        </span>

        <h1>Ajouter un Pokémon</h1>

        <p>
          Enrichis ta collection personnelle en ajoutant
          un nouveau Pokémon.
        </p>
      </section>

      <section className="add-card">
        <div className="add-card-heading">
          <span className="add-icon" aria-hidden="true">
            +
          </span>

          <div>
            <h2>Nouveau Pokémon</h2>
            <p>Renseigne les informations ci-dessous.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="add-form">
          <div className="add-field">
            <label htmlFor="nom">
              Nom du Pokémon
            </label>

            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => {
                setNom(e.target.value)
                setMessage('')
              }}
              placeholder="Ex. Pikachu"
              autoComplete="off"
              required
              maxLength={100}
            />
          </div>

          <div className="add-field">
            <label htmlFor="type">
              Type du Pokémon
            </label>

            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setMessage('')
              }}
              placeholder="Ex. Électrique"
              autoComplete="off"
              required
              maxLength={100}
            />
          </div>

          <button
            type="submit"
            className="add-submit"
            disabled={isLoading}
          >
            {isLoading
              ? 'Enregistrement en cours...'
              : '+ Ajouter à ma collection'}
          </button>

          {message && (
            <p
              className={
                isSuccess
                  ? 'add-message success'
                  : 'add-message error'
              }
              role={isSuccess ? 'status' : 'alert'}
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </div>
  )
}

export default AddPokemon