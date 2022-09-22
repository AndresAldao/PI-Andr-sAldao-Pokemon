import React, { useState } from "react";
import Select from "react-select";
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from "react";
import {getTypes, createPokemon} from "../../Redux/actions/index.js";
import Nav from "../Nav/Nav.jsx";

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
          err.name = "please type a name!";
        } else if (!input.hp || input.hp < 0 || input.hp > 500) {
          err.hp = "¡please enter a value between 0 and 500!";
        } else if (!input.attack || input.attack < 0 || input.attack > 200) {
          err.attack = "¡please enter a value between 0 and 200!";
        } else if (!input.defense || input.defense < 0 || input.defense > 100) {
          err.defense = "¡please enter a value between 0 and 100!";
        } else if (!input.speed || input.speed < 0 || input.speed > 100) {
          err.speed = "¡please enter a value between 0 and 100!";
        } else if (!input.height || input.height < 0 || input.height > 100) {
          err.height = "¡please enter a value between 0 and 100!";
        } else if (!input.weight || input.weight < 0 || input.weight > 1000) {
          err.weight = "¡please enter a value between 0 and 1000!";
        } else if (!input.img) {
          err.img = "please enter an image url";
        }if (!input.types) {
            err.types = "¡please enter types!";
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
        <div>
        <div>
            <Nav />
        </div>
         <form onSubmit={(e)=>handleSubmit(e)}>
            <p>
                <label>Name: </label>
                <input type="text" name="name" onChange={(e)=> handleChange(e)} value={input.name}/>
                {error.name && <span>{error.name}</span>}
            </p>
            <p>
                <label>HP: </label>
                <input type="number" name="hp" onChange={(e)=> handleChange(e)} value={input.hp}/>
                {error.hp && <span>{error.hp}</span>}
            </p>
            <p>
                <label>Attack: </label>
                <textarea type="number" name="attack" onChange={(e)=> handleChange(e)} value={input.attack} />
                {error.attack && <span>{error.attack}</span>}
            </p>
            <p>
                <label>Defense: </label>
                <input type="text" name="defense" onChange={(e)=> handleChange(e)} value={input.defense}/>
                {error.defense && <span>{error.defense}</span>}
            </p>
            <p>
                <label>Speed: </label>
                <input type="number" name="speed" onChange={(e)=> handleChange(e)} value={input.speed}/>
                {error.speed && <span>{error.speed}</span>}
            </p>
            <p>
                <label>Height: </label>
                <input type="number" name="height" onChange={(e)=> handleChange(e)} value={input.height}/>
                {error.height && <span>{error.height}</span>}
            </p>
            <p>
                <label>Weight: </label>
                <input type="number" name="weight" onChange={(e)=> handleChange(e)} value={input.weight}/>
                {error.weight && <span>{error.weight}</span>}
            </p>
            <p>
                <label>Image: </label>
                <input type="text" name="img" onChange={(e)=> handleChange(e)} value={input.img}/>
                {error.img && <span>{error.img}</span>}
            </p>
            <p>
               <Select 
               isMulti
               options={Types.map((t) => ({
                        value: t.name,
                        label: t.name,
               }))}
                onChange={(e) => handleSelect(e)}
               />
                {error.types && <span>{error.types}</span>}
            </p>
           <button type="submit" disabled={disabled === false && Object.entries(error).length === 0 ? false: true}>Create Pokemon</button>
        </form>
      </div>
    ); 
  };
 
  export default CreatePokemon;