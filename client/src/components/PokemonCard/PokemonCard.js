import React from "react";
import { Link } from "react-router-dom";
import "./PokemonsCard.scss";

const PokemonCard = ({name , image, types, id}) => {
    
    return (

        <div className="flip-card">
            <Link to={`/pokemon/${id}`}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="flip-card-front-image" src={image} alt={name} />
                    </div>
                        <div className="flip-card-back">
                        <h3>{name.toUpperCase()}</h3>
                        {   
                            types.map((type) => {
                                return (
                                    <td>
                                    {type.name? type.name : type}
                                </td>
                            )})
                        }   
                        </div>
                    </div>
                </Link>
            </div>
    );
}

export default PokemonCard;
