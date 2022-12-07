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

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemons
};