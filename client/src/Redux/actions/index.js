import axios from 'axios';

export const createPokemon = (payload) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:3001/pokemons', payload);
        return dispatch({
            type: 'POST_POKEMON',
            payload: res.data,
            });
    } catch (error) {
        console.log(error);
    }
};

export const getTypes = () => {
    return async function(dispatch){
        try {
            const resTypes = await axios.get("http://localhost:3001/types");
            const types = resTypes.data;
            return dispatch({
                type: "GET_TYPES",
                payload: types
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getPokemons = () => {
    return async function(dispatch){
        try {
            const resPokemons = await axios.get("http://localhost:3001/pokemons");
            const pokemons = resPokemons.data;
            return dispatch({
                type: "GET_POKEMONS",
                payload: pokemons
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const sortPokemons = (payload) => {
    /* console.log(payload , "action"); */
    return {
        type: "SORT_POKEMONS",
        payload
    }
}

export const getDetails = (id) => {
    return async function(dispatch){
        try {
            const resDetails = await axios.get(`http://localhost:3001/pokemons/${id}`);
            const details = resDetails.data;
            return dispatch({
                type: "GET_DETAILS",
                payload: details
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const filterPokemons = (payload) => {
    return {
        type: "FILTER_BY_TYPE",
        payload: payload
    }
}

export const paginado = (payload) => {
    /* console.log(payload) */
    return {
        type: "PAGINADO",
        payload: payload
    }
}

export const getPokemonsByName = (name) => {
    console.log(name)
    return async function(dispatch){
        try {
            const resPokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            const pokemon = resPokemon.data;
            return dispatch({
                type: "GET_POKEMON_BY_NAME",
                payload: pokemon
            })
        } catch (error) {
            return dispatch({
                type: "GET_POKEMON_BY_NAME",
                payload: [],
                /* console.log(error); */
            })
        }
    }
}

export const filterPokemonsDB = (payload) => {
    return {
        type: "FILTER_BY_TYPE_DB",
        payload: payload
    }
}

export const filterPokemonsAPI = (payload) => {
    return {
        type: "FILTER_BY_TYPE_API",
        payload: payload
    }
}

export const Refresh = (payload) => {
    return {
        type: "REFRESH",
        payload: payload
    }
}
export const CurrentPage = (payload) => {
    return {
        type: "CURRENT_PAGE",
        payload: payload
    }
}