import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";

export default function PokemonDetails(props){
  const dispatch = useDispatch();

  useEffect(()=>{dispatch(getPokemonDetail(props.match.params.id))},[dispatch])

  const pokemon = useSelector(state=>(state.pokemonDetail));
  
  console.log(pokemon)
  return(
    <div>
      {pokemon.id == props.match.params.id?
      <div>
        <h1>{(pokemon.name.toString().toUpperCase() + "!")}</h1>
        <img src={pokemon.img} alt={"Imagen desaparecida!"} width={"400"} height={"400px"}/>
        <h2>Puntos de Vida!: {pokemon.hp}</h2>
        <h2>Puntos de Ataque!: {pokemon.attack}</h2>
        <h2>Puntos de Defensa!: {pokemon.defense}</h2>
        <h2>Puntos de Velocidad!: {pokemon.speed}</h2>
        <h2>Alto!: {pokemon.height} pies</h2>
        <h2>Peso!: {pokemon.weight} kg</h2>
        <h2>Tipos!: {pokemon.types.map(element=>"-"+element.name.toString()+"-")}</h2>
      </div> : <p>Loading...</p>
    }
    <Link to='/home'>
      <button>Inicio</button>
    </Link>
    </div>
  )
}
