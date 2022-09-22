
const initialState = {
    types: [],
    pokemons: [],
    details: [],
    pokemonsFiltered: [],
    aux: 0
  };
  
  const rootReducer = (state = initialState, action) => {
      

      if (action.type === "GET_TYPES") {
        return {
          ...state,
          types: action.payload,
        }
      }
      if (action.type === "POST_POKEMON") {
        return {
          ...state,
        }
      }
      if (action.type === "GET_POKEMONS" || action.type ==="REFRESH") {
        return {
          ...state,
          pokemons: action.payload,
        }
      }
      if (action.type === "SORT_POKEMONS") {
        
        if(action.payload === "A-Z") {
          return {
            ...state,
            pokemonsFiltered: state.pokemons.sort((a, b) => {
              if(a.name > b.name) {
                return 1;
              }
              if(a.name < b.name) {
                return -1;
              }
              return 0;
            }),
            aux: 0
          }
        }
        if(action.payload === "Z-A") {
          
          return {
            ...state,
            pokemonsFiltered: state.pokemons.sort((a, b) => {
              if(a.name > b.name) {
                return -1;
              }
              if(a.name < b.name) {
                return 1;
              }
              return 0;
            }),
            aux: 0
          }
        }
        if(action.payload === "attackpositive") {
          
          return {
            ...state,
            pokemonsFiltered: state.pokemons.sort((a, b) => {
              if(a.attack > b.attack) {
                return -1;
              }
              if(a.attack < b.attack) {
                return 1;
              }
              return 0;
            }),
            aux: 0
          }
        }
        if(action.payload === "attacknegative") {
          
          return {
            ...state,
            pokemonsFiltered: state.pokemons.sort((a, b) => {
              if(a.attack > b.attack) {
                return 1;
              }
              if(a.attack < b.attack) {
                return -1;
              }
              return 0;
            }),
            aux: 0
          }
        }

      }
      if (action.type === "GET_DETAILS") {
        return {
          ...state,
          details: action.payload,
        }
      }

      if (action.type === "FILTER_BY_TYPE") {
        
        const pokemonsFilteredDB = state.pokemons.filter(pokemon => pokemon.types.map(type => type.name).includes(action.payload))

        const pokemonsFilterdAPI = state.pokemons.filter(pokemon => pokemon.types.includes(action.payload))
        return {
          ...state,
          pokemonsFiltered: pokemonsFilteredDB.concat(pokemonsFilterdAPI)
        }
      }

      if(action.type==="PAGINADO") {
       /*  console.log(action.payload, "paginado") */
        return {
          ...state,
          pokemonsFiltered: action.payload
        }
      }
      if(action.type==="GET_POKEMON_BY_NAME") {
        if(action.payload[0]){
          action.payload=action.payload[0]
        }
        if(action.payload.length===0){
          return {
            ...state,
            pokemonsFiltered: action.payload
          }
        }
        return {
          ...state,
          pokemonsFiltered: [action.payload]
        }
      }
      if (action.type === "FILTER_BY_TYPE_DB") {
        const pokemonsBD = state.pokemons.filter(pokemon => pokemon.image? null : pokemon)
       
        return {
          ...state,
          pokemons: pokemonsBD,
          pokemonsFiltered: pokemonsBD
        }
      }
      if(action.type==="FILTER_BY_TYPE_API") {
        const pokemonsAPI = state.pokemons.filter(pokemon => pokemon.image? pokemon : null)
        
        return {
          ...state,
          pokemons: pokemonsAPI,
          pokemonsFiltered: pokemonsAPI
        }
      }

      if(action.type==="REFRESH") {
        
        return {
          ...state,
          pokemons: action.payload
        }
      }

      if (action.type==="CURRENT_PAGE"){
        return {
          ...state,
          aux: action.payload
        }
      }

      return state;
    }
  
  export default rootReducer;
  