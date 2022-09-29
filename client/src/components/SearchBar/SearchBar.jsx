import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsByName } from "../../Redux/actions";
import "./SearchBar.scss";
//import lupa from "./lupa.svg";


const SearchBar = () => {

    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value.toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonsByName(e.target.value));
        setInput("");
    };

  return (
    
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={input}
                    onChange={(e) => handleChange(e)}
                    className="search-txt"
                />
                
                <button className="search-bnt" value={input} onClick={(e) => handleSubmit(e)}>
                   {/*  <img className="iconlupa" src={lupa} alt="lupa"/> */}
                   Pok
                </button>
            </div>
  );
};

export default SearchBar;