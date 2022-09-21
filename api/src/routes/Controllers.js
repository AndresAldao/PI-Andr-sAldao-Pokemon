
const axios = require('axios');
const { Pokemon, Types } = require('../db');

const getPokemonsDB = async function(pokemonName){
    const array = [];
   if(pokemonName === undefined){
       const pokemons = await Pokemon.findAll(
          { 
               include: {
               model: Types,
               attributes: ['name'],
               through: {
                   attributes: []
               }
           }
       } );
         pokemons.forEach(pokemon => {
              array.push(pokemon.dataValues);
         });
       return array;
   }
   if(pokemonName){

       const pokemon = await Pokemon.findAll({
             where: {
                 name: pokemonName
             },
             include: {
                 model: Types,
                 attributes: ['name'],
                 through: {
                     attributes: []
                 }
             }
         });
         if(pokemon.length === 0){
             return null;
         }
            pokemon.forEach(pokemon => {
                array.push(pokemon.dataValues);
            });

       return array;
       } 
   }


const getPokemonsapi = async function(pokemonName){
    if(pokemonName === undefined){
        const allpokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=41');
        const allUrl = allpokemon.data.results.map(pokemon => pokemon.url);
        promises = await Promise.all(allUrl.map(url => axios.get(url))); 
        const pokemons = promises.map(pokemon => {
            return {
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default,
                types: pokemon.data.types.map(type => type.type.name),
                attack: pokemon.data.stats[1].base_stat,
                id: pokemon.data.id
            }
        }); 
        return pokemons;

    }else{
        try {
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const pokemonData = {
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default,
                types: pokemon.data.types.map(type => type.type.name),
                attack: pokemon.data.stats[1].base_stat,
                id: pokemon.data.id
            }
            return pokemonData;
        } catch (error) {
            return null;
        }
    }
}

    /* axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); */
/*     if (poke.status === 200){
        const pokemon = {
            name: poke.data.name,
            image: poke.data.sprites.other.dream_world.front_default,
            types: poke.data.types.map(t => t.type.name),
        }
        console.log(pokemon);
        return pokemon;
    }
    return null;
} */

const getPokemonsByID = async function(id){
    try {
        if(id !== null){
            const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon = {
                id: poke.data.id,
                name: poke.data.name,
                image: poke.data.sprites.other.dream_world.front_default,
                types: poke.data.types.map(t => t.type.name),
                status: {
                    hp: poke.data.stats[0].base_stat,
                    attack: poke.data.stats[1].base_stat,
                    defense: poke.data.stats[2].base_stat,
                    speed: poke.data.stats[5].base_stat,
                },
                height: poke.data.height,
                weight: poke.data.weight
            }
            return pokemon;
        }
    }catch (error) {
        return null;
    }  
}

const getPokemonsDBbyID = async function(id){
    if(id !== null){
        if(id !== null){
            const pokemon = await Pokemon.findByPk(id, {
                include: {
                    model: Types,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            if(pokemon === null){
                return null;
            }
            return pokemon.dataValues;
        }
    } else {
        return null;
    }
}

    
module.exports = {
    getPokemons: async function(pokemonName){
        
        const pokemonapi = await getPokemonsapi(pokemonName);
        
        const pokemonDB = await getPokemonsDB(pokemonName); 

            if(pokemonDB === null){  
                return pokemonapi;
             }
            if(pokemonapi === null){
                return pokemonDB;
            }
            if (pokemonapi === null && pokemonDB=== null){
                 throw new Error('Pokemon not found');
            }
        const pokemons= pokemonapi.concat(pokemonDB);  
        return pokemons; 
    },
    getPokemonsByID: async function(id){
        const pokemonapi = await getPokemonsByID(id);
        /* console.log(pokemonapi,'pokemonapi'); */
        if (pokemonapi!== null){
            return pokemonapi;
        }
       /*  console.log("estoy"); */
        const pokemonDB = await getPokemonsDBbyID(id);
       /*  console.log("estoy2");
        console.log(pokemonDB,'pokemonDB'); */
        if(pokemonDB !== null){
            return pokemonDB;
        }
    },

    getTypes: async function(){
        const types = await axios.get('https://pokeapi.co/api/v2/type');
        const allTypes = types.data.results.map(type => type.name);
        return allTypes;
    }
}