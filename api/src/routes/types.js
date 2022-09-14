const { Router }= require('express');
const { getTypes } = require('./Controllers');
const { Pokemon, Types } = require('../db');
const router = Router();

module.exports = router;

router.get('/types', async function(req, res){
    
    try{
        const types = await getTypes();
        types.forEach(type => {
            Types.findOrCreate({
                where: {
                    name: type
                }
            })
        });
        let typesDB = await Types.findAll();
        res.status(200).send(typesDB);
    }catch(error){
        res.status(404).send({error: 'Types not found'});
    }
});
