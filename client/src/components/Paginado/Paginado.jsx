import { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentPage, paginado } from '../../Redux/actions';
import React from 'react';




const Paginado = ({pokemons}) => {
    console.log(pokemons)
    const pokemonspage= useSelector(state => state.pokemons);
    const pokemons1= useSelector(state => state.pokemonsFiltered);
    const dispatch = useDispatch();
    const [items, setItems] = useState(pokemons1.length?[...pokemons1].slice(0, 12):[...pokemonspage].slice(0, 12));
    const [currentPage, setCurrentPage] = useState(0);
    let current = useSelector (state => state.aux);

    
    useEffect(() => {
        dispatch(paginado(items))
    }, [dispatch, items, currentPage]);
    
    const nextPage = () => {
        const total = pokemonspage.length;
        const nextPage = current + 1;
        const firstpage = nextPage * 12;
        
        
        if (firstpage >= total) {
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
            <button onClick={prevPage}>Prev Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
    )
}

export default Paginado;