import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../Redux/actions";
import Nav from "../Nav/Nav";

/* const PokemonDetails = () => {
    console.log("me creé")
    const dispatch = useDispatch();
    const {id} = useParams();
    
    
    useEffect(() => {
        dispatch(getDetails(id));
        return () => {;
           console.log("me morí")
        }
    }, [dispatch, id]);

    const details = useSelector(state => state.details);
    console.log(details);
  return (
    <div>
        <h1>{details.name}</h1>
        <img src={details.image} alt={details.name} />
        <p>Height: {details.height}</p>
        <p>Weight: {details.weight}</p>
        <p>Types: {details.types}</p>
    </div>
  );

} */

const PokemonDetails= (props) => {
  const dispatch = useDispatch();
  console.log("me renderizo");
  const pokemon = useSelector((state) => state.details);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);
  console.log(pokemon);


  return (
    <div>

      <Nav/>
      {
        pokemon.status? (
          <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((type)=>{
              return <p>{type}</p>
            })}</p>
            
            <p>Attack: {pokemon.status.attack}</p>
            <p>Defense: {pokemon.status.defense}</p>
            <p>HP: {pokemon.status.hp}</p>
            <p>Speed: {pokemon.status.speed}</p>
          </div>
        ) : (
          <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types? pokemon.types.map(type=>
            <p>{type.name}</p> 
          ) : null}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>HP: {pokemon.hp}</p>
          <p>Speed: {pokemon.speed}</p>
        </div>
        )
      }
    </div>
  );
};


export default PokemonDetails;