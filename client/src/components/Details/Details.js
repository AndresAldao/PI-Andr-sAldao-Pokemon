import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../Redux/actions";
import Nav from "../Nav/Nav";
import "./Details.scss";


const PokemonDetails= (props) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.details);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);
  console.log(pokemon);


  return (
  <div className="fondodetails">
    <Nav/>
      <div>
      {
        pokemon.status? (
          <div className="card-details">
            <div className="card-landing">
              <img className="card-landing-img" src={pokemon.image} alt={pokemon.name} />
              <h1 className="card-landing-h1">{pokemon.name}</h1>
            </div>
            <div className="card-info">
                <div className="card-description">
                  <p className="card-title">Name: {pokemon.name}</p>
                  <p className="content">Height: {pokemon.height}</p>
                  <p className="content">Weight: {pokemon.weight}</p>
                  <p className="content">Types: {pokemon.types.map((type)=>{
                    return <span className="type">{type}</span>
                  })}</p>
                  <p className="content">Attack: {pokemon.status.attack}</p>
                  <p className="content">Defense: {pokemon.status.defense}</p>
                  <p className="content">HP: {pokemon.status.hp}</p>
                  <p className="content">Speed: {pokemon.status.speed}</p>
                </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="card-details">
              <div className="card-landing">
                <img className="card-landing-img" src={pokemon.img} alt={pokemon.name} />
                <h1 className="card-landing-h1">{pokemon.name}</h1>
              </div>
              <div className="card-info">
                <div className="card-description">
                  <p className="card-title">Name: {pokemon.name}</p>
                  <p className="content">Height: {pokemon.height}</p>
                  <p className="content">Weight: {pokemon.weight}</p>
                  <p className="content">Types: {pokemon.types? pokemon.types.map(type=>
                      <span className="type">{type.name}</span> 
                    ) : null}</p>
                  <p className="content">Attack: {pokemon.attack}</p>
                  <p className="content">Defense: {pokemon.defense}</p>
                  <p className="content">HP: {pokemon.hp}</p>
                  <p className="content">Speed: {pokemon.speed}</p>
                </div>
              </div>
            </div>
        </div>
        )
      }

    </div>
  </div>
)};


export default PokemonDetails;