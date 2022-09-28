import Nav from "../Nav/Nav.jsx";
import React from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState} from "react";
import { filterPokemons, filterPokemonsAPI, filterPokemonsDB, getPokemons, getTypes, paginado, Refresh, sortPokemons } from "../../Redux/actions/index.js";
import PokemonCard from "../PokemonCard/PokemonCard.js";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Home.scss";
import carga from "./cargar.svg";



const Home = () => {
    const pokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();
    const [order, setOrder] = useState("asc");
    const [filter, setFilter] = useState("");
    let display = useSelector(state => state.display);
    const pokemonspage= useSelector(state => state.pokemonsFiltered);
    const [remove, setRemove] = useState("");
    const [removetype, setRemovetype] = useState("");

    const Types = useSelector(state => state.types);
    
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch]);

    const refrescar = (e) => {
        dispatch(getPokemons());
        setOrder(e);
        dispatch(paginado([...pokemons].splice(0, 12)));
        dispatch(Refresh(e));
        remove.selected = true;
        removetype.selected = true;
    };

    const ordenar = (e) => {
        e.preventDefault();
        setRemove(e.target[0]);
        if ((order !== e.target.value)) {
            setOrder(e.target.value);
            dispatch(sortPokemons(e.target.value))
        }
    }

    const PokemonsBD = (e) => {
        getPokemons();
        e.preventDefault();
        dispatch(filterPokemonsDB(e.target.value))
    }

    const PokemonsApi = (e) => {
        getPokemons()
        e.preventDefault();
        dispatch(filterPokemonsAPI(e.target.value))
    }
    
    const handleSelect = (e) => {
        setFilter(e.target.value);
        dispatch(filterPokemons(e.target.value));
        setRemovetype(e.target[0]);
    };



    useEffect(() => {
    }, [order]);

    useEffect(() => {
    }, [filter, order ]);
    
    return (
        <div className="principal">   
            <div>
                <div>
                    <Nav />
                </div>
                <div>
                    <SearchBar />
                
                    <button className="button1 button1--1" onClick={PokemonsBD}>
                        Pokemons BD
                    </button>
                    <button className="button3 button3--3" onClick={PokemonsApi}>
                        Pokemons API
                    </button>
                    <button className="button2 button2--2"  onClick={refrescar}>
                        Refresh Pokemons list
                    </button>
                    <select className="select-menu" onChange={ordenar}>
                        <option disabled selected className="select-menu-inner">Sort By</option>
                        <option className="select-menu-inner" value="A-Z">A-Z</option>
                        <option className="select-menu-inner" value="Z-A">Z-A</option>
                        <option className="select-menu-inner" value="attackpositive">Attack ↑</option>
                        <option className="select-menu-inner" value="attacknegative">Attack ↓</option>
                    </select>
                    <select className="select-menu-1" onChange={handleSelect}>
                        <option disabled selected>Filter by Type...</option>
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
                                }): <h1 className="Display">{(display==="Loading...")? <img src={carga} alt="Carga" />: display}</h1>
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