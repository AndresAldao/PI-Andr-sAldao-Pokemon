
const { Router }= require('express');
const { getPokemons , getPokemonsByID } = require('./Controllers');
const { Pokemon, Types } = require('../db');
const router = Router();

module.exports = router;
router.get('/pokemons', async function(req, res){
    const { name } = req.query;
    try{
        const pokemons = await getPokemons(name);
        res.status(200).json(pokemons);
    }catch(error){
        res.status(404).json({error: 'Pokemon not found'});
    } 
});

router.get('/pokemons/:idpokemon', async function(req, res){
    const { idpokemon } = req.params;
    try{
        const pokemon = await getPokemonsByID(idpokemon);
        res.status(200).json(pokemon);
    }catch(error){
        res.status(404).json({error: 'Pokemon not found'});
    }
});

router.post('/pokemons', async function(req, res){
    const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;
    try{
        const newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        });
         const typesDB = await Types.findAll({
            where: {
                name: types
            }
        }); 
         newPokemon.addTypes(typesDB.map(t => t.id)); 
        res.status(200).send('Pokemon created');
    }catch(error){
        res.status(404).send(error);
    }
});


/* router.delete('/pokemons/:idpokemon', async function(req, res){
    const { idpokemon } = req.params;
    try{
        const pokemon = await Pokemon.findByPk(idpokemon);
        await pokemon.destroy();
        res.status(200).send('Pokemon deleted');
    }catch(error){
        res.status(404).send(error);
    }
}); */