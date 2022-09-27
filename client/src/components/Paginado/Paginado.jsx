import { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentPage, paginado } from '../../Redux/actions';
import React from 'react';
import "./Paginado.scss";


const Paginado = ({pokemons}) => {
    /* console.log(pokemons) */
    let pokemonspage= useSelector(state => state.pokemonsaux);
    const pokemons1= useSelector(state => state.pokemonsFiltered);
    const dispatch = useDispatch();
    const [items, setItems] = useState(pokemons1.length?[...pokemons1].slice(0, 12):[...pokemonspage].slice(0, 12));
    const [currentPage, setCurrentPage] = useState(0);
    let current = useSelector (state => state.aux);
    
    if(pokemons1.length>12){
        pokemonspage=pokemons1;
        dispatch(paginado([...pokemonspage].splice(0, 12)))
    }
   /*  console.log(pokemonspage, "pokemonspage") */
/*     if(pokemonspage.length===0){ 
        console.log("entro")
        dispatch(getPokemons())
    }
 */
    useEffect(() => {
        dispatch(paginado(items))
    }, [dispatch, items, currentPage]);
    
    const nextPage = () => {
        const total = pokemonspage.length;
        const nextPage = current + 1;
        const firstpage = nextPage * 12;
        
        
        if (firstpage > total) {
            return;
        }
    
        setItems([...pokemonspage].splice(firstpage, 12));

        dispatch(CurrentPage(nextPage))
        setCurrentPage(nextPage);
        
    }
    const prevPage = () => {
        const prevPage = current - 1;
        const firstpage = prevPage * 12;

        if (firstpage < 0) {
            return;
        }
        
        setItems([...pokemonspage].splice(firstpage, 12)); 
        dispatch(CurrentPage(prevPage))
        setCurrentPage(prevPage);
        
    }

    return (
        <div>
            <button className='btn1 btn1--1' onClick={prevPage}>Prev Page</button>
            <button className='btn2 btn2--2' onClick={nextPage}>Next Page</button>
        </div>
    )
}

export default Paginado;