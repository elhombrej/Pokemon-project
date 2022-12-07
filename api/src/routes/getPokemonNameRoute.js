const { Router } = require('express');
const router = Router();
const {getAllPokemons} = require('../controllers/getPokemonsController');
const axios = require ('axios');

let reqInstance = axios.create({
    headers: {
        "Accept-Encoding": "null"
      }
    }
);

router.get('/', async(req,res)=>{
    const {name} = req.query;
            try{
            const allPokemonsNames = await getAllPokemons();
            let pokemonByName = allPokemonsNames.filter(element => element.name.toLowerCase() == name.toLowerCase());
            if(pokemonByName.length){
            res.status(200).send(pokemonByName[0])
            }else{
                const pokemon= await reqInstance.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const pokemonInfo = {
                    id: pokemon.data.id,
                    name: pokemon.data.name,
                    hp: pokemon.data.stats[0].base_stat,
                    attack: pokemon.data.stats[1].base_stat,
                    defense: pokemon.data.stats[2].base_stat,
                    speed: pokemon.data.stats[5].base_stat,
                    height: pokemon.data.height,
                    weight: pokemon.data.weight,
                    types: pokemon.data.types.map(element=>{
                        return ({
                            name: element.type.name
                        })
                    }),
                    img: pokemon.data.sprites.other.dream_world.front_default,
                }
                res.status(201).send(pokemonInfo)    
            }
        }catch(error){
            res.status(400).send('ERROR: No existe pokemon con dicho nombre')
        };
    }
);

module.exports=router;