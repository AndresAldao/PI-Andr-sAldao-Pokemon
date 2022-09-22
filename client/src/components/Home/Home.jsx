import Nav from "../Nav/Nav.jsx";
import React from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState} from "react";
import { filterPokemons, filterPokemonsAPI, filterPokemonsDB, getPokemons, getTypes, paginado, sortPokemons } from "../../Redux/actions/index.js";
import PokemonCard from "../PokemonCard/PokemonCard.js";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Home.scss";



const Home = () => {
    const pokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();
    const [order, setOrder] = useState("asc");
    const [filter, setFilter] = useState("");
    const [display, setDisplay] = useState("Loading...");
    const pokemonspage= useSelector(state => state.pokemonsFiltered);

    
    const Types = useSelector(state => state.types);
    
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        dispatch (paginado([...pokemons].splice(0, 12)));
    }, [dispatch]);

    const refrescar = (e) => {
        dispatch(getPokemons());
        setOrder(e);
        setDisplay("Loading...");
        dispatch(paginado([...pokemons].splice(0, 12)));
    };

    const ordenar = (e) => {
        e.preventDefault();
        if ((order !== e.target.value)) {
            setOrder(e.target.value);
            dispatch(sortPokemons(e.target.value))
            dispatch(paginado([...pokemons].slice(0, 12)));
            display === "Loading..." ? setDisplay("Loading...") : setDisplay("Loading...");
        }
    }

    const PokemonsBD = (e) => {
        getPokemons();
        e.preventDefault();
        dispatch(filterPokemonsDB(e.target.value))
        setDisplay("Pokemons not Found. Please Refresh pokemon list and try again")
    }

    

    const PokemonsApi = (e) => {
        getPokemons()
        e.preventDefault();
        dispatch(filterPokemonsAPI(e.target.value))
        setDisplay("Pokemons not Found. Please Refresh pokemon list and try again")
        dispatch(paginado(pokemons.splice(0, 12)))
    }
    
    const handleSelect = (e) => {
        setFilter(e.target.value);

        dispatch(filterPokemons(e.target.value));
        setDisplay("There are no pokemon of this type");
    };
    useEffect(() => {
    }, [order]);

    useEffect(() => {
    }, [filter, order]);
    
    return (
        <div
        //https://wallpaperaccess.com/full/8094982.gif
        style={{backgroundImage: "url(https://wallpaperaccess.com/full/8094982.gif)",
        backgroundSize: "cover",
        }}
        >   <div>
                <div>
                    <Nav />
                </div>
                <div>
                    <SearchBar />
                    <button onClick={PokemonsBD}>
                        Pokemons BD
                    </button>
                    <button onClick={PokemonsApi}>
                        Pokemons API
                    </button>
                    <button onClick={refrescar}>
                        Refresh Pokemons list
                    </button>
                    <select className="select-menu" onChange={ordenar}>
                        <option>Sort By</option>
                        <option className="option" value="A-Z">A-Z</option>
                        <option className="option" value="Z-A">Z-A</option>
                        <option className="option" value="attackpositive">Attack ↑</option>
                        <option className="option" value="attacknegative">Attack ↓</option>
                    </select>
                    <select onChange={handleSelect}>
                        <option>Filter by Type...</option>
                        {Types.map((t) => (
                            <option value={t.name}>{t.name}</option>
                        ))}
                    </select>
                    </div>
            </div>
                        <div className="grid-card">
                            {
                                pokemonspage.length?pokemonspage.map(pokemon => {
                                    return <PokemonCard 
                                    key={pokemon.id}
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.image? pokemon.image : pokemon.img}
                                    types={pokemon.types} 
                                />
                                }): <h1>{display}</h1>
                                }
                        </div>
                

                    <div>
                        {
                            pokemons.length? <Paginado pokemons={pokemons}/>: null
                        }
                    </div>
        </div>
    )
}

export default Home;