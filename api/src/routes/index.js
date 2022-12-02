const { Router } = require('express');
const router = Router();
// const bodyparse = require('body-parser');

// router.use(bodyparse.json());
// router.use(bodyparse.urlencoded({extended:true}));


const axios = require ('axios');
const {Type, Pokemon} = require ('../db');

let reqInstance = axios.create({
    headers: {
        "Accept-Encoding": "null"
      }
    }
);

//Funcion de obtencion de 40 Pokemons de la api

const getApiInfo = async ()=>{
    let apiUrl = "https://pokeapi.co/api/v2/pokemon"
    let pokemons = [];
    do{
        let info = await reqInstance.get(apiUrl)
        let pokemonsApi = info.data;
        //console.log(pokemonsApi)
        let auxPokemons = pokemonsApi.results?.map(element =>{
            return{
                name: element.name,
                url: element.url
            }
        })
        pokemons.push(...auxPokemons);
        apiUrl = pokemonsApi.next;
    }while(apiUrl != null && pokemons.length < 40);

    //console.log(pokemons);

    let pokemonsData = await Promise.all(pokemons.map(async element =>{
        let pokemon = await reqInstance.get(element.url);

        return{
            id: pokemon.data.id,
            name: pokemon.data.name,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            types: pokemon.data.types.map(element=> element.type),
            img: pokemon.data.sprites.other.dream_world.front_default,
            createdInDb: false,    
        }    
    }));
    return pokemonsData;
};

//Funcion de obtencion de pokemons de la base de datos

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

//Funcion de obtencion de pokemons de la api y la base de datos para concatenarlos

const getAllPokemons = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = dbInfo.concat(apiInfo);
    return allPokemon;
}

//Ruta de obtencion de los primeros pokemones de la api y base de datos para la ruta principal

router.get('/pokemons', async (req,res) =>{
    let pokemonsTotal = await getAllPokemons();
    pokemonsTotal ?
    res.status(200).send(pokemonsTotal) :
    res.status(404).send(error);
})

//Busco el pokemon por ID proveniente por parametro

router.get('/pokemon/:id', async(req,res)=>{
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

//Busco el pokemon por nombre proveniente por query

router.get('/pokemon?', async(req,res)=>{
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


//Ruta de creacion de pokemon

router.post('/pokemon', async (req,res)=> {

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
                console.log(typesArray)
                const typeDataBase = await Type.findAll({
                    where: {name:typesArray}
                });
                await pokemonCreated.addType(typeDataBase);
                console.log(pokemonCreated)
                return res.status(201).send(pokemonCreated);
            }
            return res.status(404).send('ERROR: Este Pokemon ya existe!');
        }
    }catch(error){
        !name ? 
        res.status(404).send("ERROR: El necesario que escriba el nombre") :
        res.status(404).send(error);
    }
}
);

//Ruta de obtencion de Tipos

router.get('/types',async (req,res)=>{
    let apiTypeUrl = await reqInstance.get('https://pokeapi.co/api/v2/type');
    let apiTypeInfo = apiTypeUrl.data;
    let types = apiTypeInfo.results.map(element => element);

    types.forEach(element =>{
        Type.findOrCreate({
            where: {
                name: element.name,
            }
        });
    });
    const allTypes = await Type.findAll();
    return res.status(200).send(allTypes)
});

module.exports = router;
 