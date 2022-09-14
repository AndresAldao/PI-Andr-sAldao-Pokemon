const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemons.js');
const typesRouter = require('./types.js');
const router = Router();

// Configurar los routers

// Ejemplo: router.use('/auth', authRouter);
router.use(pokemonRouter);
router.use(typesRouter);



module.exports = router;
