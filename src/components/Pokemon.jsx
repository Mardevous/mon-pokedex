import { Link } from 'react-router-dom'

function Pokemon({id, nom, element, image}) {
    return (
        <div>
            <img src={image} alt={nom}/>
            <h3>{nom}</h3>
            <p>{element}</p>
            <Link to={`/poke/${id}`}>
            Voir détails
            </Link>
        </div>
    );
};
export default Pokemon