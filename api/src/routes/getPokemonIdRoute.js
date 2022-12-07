const { Router } = require('express');
const router = Router();
const {getAllPokemons} = require('../controllers/getPokemonsController')
const axios = require ('axios');

let reqInstance = axios.create({
    headers: {
        "Accept-Encoding": "null"
      }
    }
);

router.get('/:id', async(req,res)=>{
    const {id} = req.params;
            try{
            const allPokemonsId = await getAllPokemons();
            let pokemonById = allPokemonsId.filter(element => element.id == id);
            if(pokemonById.length){
                return res.status(200).send(pokemonById[0])
            }else{
                const pokemon= await reqInstance.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if(pokemon){
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
                    return res.status(201).send(pokemonInfo);  
                }  
            }
        }catch(error){
            res.status(400).send({error:error.message})
        };
    }
);

module.exports=router;