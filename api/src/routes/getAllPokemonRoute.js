const { Router } = require('express');
const router = Router();
const {getAllPokemons} = require('../controllers/getPokemonsController')

router.get('/', async (req,res) =>{
    let pokemonsTotal = await getAllPokemons();
    pokemonsTotal ?
    res.status(200).send(pokemonsTotal) :
    res.status(404).send(error);
})

module.exports=router;