// const axios = require ('axios');
import axios from "axios";

// let reqInstance = axios.create({
//     headers: {
//         "Accept-Encoding": "null"
//       }
//     }
// );


export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("/pokemons");
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      return { error: error.message};
    }
  };
};

export function getTypes(){
  return async function(dispatch) {
    try {
      const info = await axios.get("/types",{});
      return dispatch({
        type: "GET_TYPES",
        payload: info.data,
      });
    } catch (error) {
      return { error: error.message};
    }
  };
};

export const postPokemon = (payload) => {
  return async () => {
    try {
      const json = await axios.post("/pokemon", payload);
      alert('Pokemon creation succesfull!');
      return json;
    } catch (error) {
      return  alert('Error creating Pokemon.');
    }
  };
};

export function filterCreated(payload){
    return{
      type: 'FILTER_CREATED',
      payload
    }
};

  export function filterTypes(payload){
    return{
      type: 'FILTER_TYPES',
      payload
    }
};  

export function orderByName(payload){
    return{
      type: 'ORDER_BY_NAME',
      payload
    }
};

export function orderByAttack(payload){
    return{
      type: 'ORDER_BY_ATTACK',
      payload
    }
  };
  
export function getPokemonByName(payload){
  return async function(dispatch){
    try{
      var json = await axios.get("/pokemon?name=" + payload);
      return dispatch({
        type:"GET_POKEMON_BY_NAME",
        payload: json.data
      })
    }catch(error) {alert('Unknown Pokemon.')}
  }
}

export function getPokemonDetail(payload){
  return async function (dispatch){
    try{
      var json = await axios.get("/pokemon/" + payload)
      return dispatch({
        type: "GET_POKEMON_DETAIL",
        payload: json.data
      })
    }catch(error){
      return{error: error.message};
    }
  }
}

export function backgroundStyle(payload){
  return{
    type: "BACKGROUND_STYLE",
    payload
  }
}

export function cardSize(payload){
  return{
    type: "CARD_SIZE",
    payload
  }
}
