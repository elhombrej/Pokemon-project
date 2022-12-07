const { Router } = require('express');
const router = Router();
const {getAllPokemons} = require('../controllers/getPokemonsController')
const {Type, Pokemon} = require ('../db');

router.post('/', async (req,res)=> {

    const{
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        types
    }=req.body;

    try{
        if (name) {
            const allPokemons = await getAllPokemons();
            const pokemonExists = allPokemons.find(element => element.name.toLowerCase() === name.toLowerCase());
            if(!pokemonExists){

                const pokemonCreated = await Pokemon.create({
                    name,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img,
                    types
                });

                const typesArray = types.map(element => element.name)
                const typeDataBase = await Type.findAll({
                    where: {name:typesArray}
                });
                await pokemonCreated.addType(typeDataBase);
                return res.status(201).send(pokemonCreated);
            }
            return res.status(404).send(alert('ERROR: Pokemon Already Exists!'));
        }
    }catch(error){
        !name ? 
        res.status(404).send("ERROR: Name Is Required!") :
        res.status(404).send({error:error.message});
    }
}
);

module.exports=router;