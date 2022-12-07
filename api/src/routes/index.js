const { Router } = require('express');
const router = Router();

const routerGetAllPokemons = require('./getAllPokemonRoute');
const routerPokemonId = require('./getPokemonIdRoute');
const routerGetPokemonName = require('./getPokemonNameRoute');
const routerGetPokemonTypes = require('./getPokemonTypesRoute');
const { route } = require('./postPokemonRoute');
const routerPostPokemon = require('./postPokemonRoute');

router.use('/pokemons',routerGetAllPokemons)
router.use('/pokemon',routerPokemonId)
router.use('/pokemon?',routerGetPokemonName)
router.use('/types',routerGetPokemonTypes)
router.use('/pokemon',routerPostPokemon)
router.use(function(req,res){
    res.status(404).send("The page you are looking for can not be found.");
})

module.exports = router;
 