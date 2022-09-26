import React, { useState } from "react";
import Select from "react-select";
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from "react";
import {getTypes, createPokemon} from "../../Redux/actions/index.js";
import Nav from "../Nav/Nav.jsx";
import "./CreatePokemons.scss";

const CreatePokemon = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);
    const Types = useSelector(state => state.types);
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
        types: "",
    });

    function InputValidator(input) {
        let err = {};
        if (!input.name || typeof input.name !== "string") {
          err.name = "Please type a name!";
        } else if (!input.hp || input.hp < 0 || input.hp > 500) {
          err.hp = "Please enter a value between 0 and 500!";
        } else if (!input.attack || input.attack < 0 || input.attack > 200) {
          err.attack = "Please enter a value between 0 and 200!";
        } else if (!input.defense || input.defense < 0 || input.defense > 100) {
          err.defense = "please enter a value between 0 and 100!";
        } else if (!input.speed || input.speed < 0 || input.speed > 100) {
          err.speed = "Please enter a value between 0 and 100!";
        } else if (!input.height || input.height < 0 || input.height > 100) {
          err.height = "Please enter a value between 0 and 100!";
        } else if (!input.weight || input.weight < 0 || input.weight > 1000) {
          err.weight = "¡Please enter a value between 0 and 1000!";
        } else if (!input.img) {
          err.img = "Please enter an image url";
        }if (!input.types) {
          err.types = "¡Please enter types!";
        }
        setDisabled(false);
        return err;
      }

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
           ...input,
           [e.target.name]: e.target.value
        })
        setError(
            InputValidator({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
     };
    
     const handleSelect = (e) => {
        setInput({
              ...input,
              types: e.map(type => type.value)
            });
        setError(
            InputValidator({
                ...input,
                types: e.map(type => type.value),
                })
            );
        };
     const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(input));
        alert("Pokemon created");
        setInput({
            name: "",
            hp: "",
            attack: "",
            defense:  "",
            speed:  "",
            height: "",
            weight: "",
            img: "",
            types: "",
        });
    };
    return (
        <div className="fondo">
            <Nav />
         <form className="form" onSubmit={(e)=>handleSubmit(e)}>
            <p>Name:</p>
              <input className="inputs" type="text" name="name" onChange={(e)=> handleChange(e)} value={input.name}/>
                {error.name && <p className="alert">{error.name}</p>}
            <p>Type:</p>
               <Select 
               className="input-select"
               isMulti
               placeholder="Select types"
               options={Types.map((t) => ({
                        value: t.name,
                        label: t.name,
               }))}
                onChange={(e) => handleSelect(e)}
               />
                {error.types && <p className="alert">{error.types}</p>}
            <p>HP:</p>
              <input className="inputs" type="number" name="hp" onChange={(e)=> handleChange(e)} value={input.hp}/>
                {error.hp && <p className="alert">{error.hp}</p>}
            <p>Attack: </p>
              <input className="inputs" type="number" name="attack" onChange={(e)=> handleChange(e)} value={input.attack} />
                {error.attack && <p className="alert">{error.attack}</p>}
            <p>Defense:</p>
            <input className="inputs" type="number" name="defense" onChange={(e)=> handleChange(e)} value={input.defense}/>
                <p></p>{error.defense && <p className="alert">{error.defense}</p>}
            <p>Speed:</p>
              <input className="inputs" type="number" name="speed" onChange={(e)=> handleChange(e)} value={input.speed}/>
                {error.speed && <p className="alert">{error.speed}</p>}
            <p>Height:</p>
              <input className="inputs" type="number" name="height" onChange={(e)=> handleChange(e)} value={input.height}/>
                {error.height && <p className="alert">{error.height}</p>}
            <p>Weight:</p>
              <input className="inputs" type="number" name="weight" onChange={(e)=> handleChange(e)} value={input.weight}/>
                {error.weight && <p className="alert">{error.weight}</p>}
            <p>Image:</p>
                <input className="inputs" type="text" name="img" onChange={(e)=> handleChange(e)} value={input.img}/>
                {error.img && <p className="alert">{error.img}</p>}
            <p className="center-content">
              <button className="btn btn-green" type="submit" disabled={disabled === false && Object.entries(error).length === 0 ? false: true}>Create Pokemon</button>
            </p>
        </form>
      </div>
    ); 
  };
 
  export default CreatePokemon;