import "../scss/pokemon-card.scss"
import { typeHandlerSpan } from "../utils/PokemonType";

const PokemonCard = ({ name, image, types }) => {
    return (
        <div className="poke-card">
            <div className="info">
                <span>{name}</span>
            </div>
            <img src={image} alt={name} />
            <div className="type">
                {typeHandlerSpan(types)}
            </div>
        </div>
    )
}

export { PokemonCard }