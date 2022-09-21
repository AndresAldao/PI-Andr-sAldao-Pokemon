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

    
    const handleChange = (e) => {
        e.preventDefault();
        setInput({
           ...input,
           [e.target.name]: e.target.value
        });
     };
    
     const handleSelect = (e) => {
        
       
        setInput({
              ...input,
              types: e.map(type => type.value)
            });
        };
        console.log(input);
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
            </p>
            <p>
                <label>HP: </label>
                <input type="number" name="hp" onChange={(e)=> handleChange(e)} value={input.hp}/>
            </p>
            <p>
                <label>Attack: </label>
                <textarea type="number" name="attack" onChange={(e)=> handleChange(e)} value={input.attack} />
            </p>
            <p>
                <label>Defense: </label>
                <input type="text" name="defense" onChange={(e)=> handleChange(e)} value={input.defense}/>
            </p>
            <p>
                <label>Speed: </label>
                <input type="number" name="speed" onChange={(e)=> handleChange(e)} value={input.speed}/>
            </p>
            <p>
                <label>Height: </label>
                <input type="number" name="height" onChange={(e)=> handleChange(e)} value={input.height}/>
            </p>
            <p>
                <label>Weight: </label>
                <input type="number" name="weight" onChange={(e)=> handleChange(e)} value={input.weight}/>
            </p>
            <p>
                <label>Image: </label>
                <input type="text" name="img" onChange={(e)=> handleChange(e)} value={input.img}/>
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

                 {/*    <select onChange={handleSelect} multiple>
                        <option>Filter by Type...</option>
                        {Types.map((t) => (
                        <option value={t.name}>{t.name}</option>
                        ))}
                    </select> */}

            </p>
           <button type="submit">Create Pokemon</button>
        </form>
      </div>
    ); 
  };
 
  export default CreatePokemon;