import './PokemonDetails.css'
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";
import url from '../../images/loader5.gif'

export default function PokemonDetails(props){
  const dispatch = useDispatch();

  useEffect(()=>{dispatch(getPokemonDetail(props.match.params.id))},[dispatch])

  const pokemon = useSelector(state=>(state.pokemonDetail));

  const background = useSelector(state=>(state.backgroundStyle));
  return(
  <div>

      {pokemon.id == props.match.params.id?

      <div className={ background ? 'lightBackgroundDetails' : 'darkBackgroundDetails'}>
        <h1 className='nameDetails'>{(pokemon.name.toString().toUpperCase() + "!")}</h1>
        <img src={pokemon.img} alt={"Imagen desaparecida!"} width={"400"} height={"400px"}/>
        <h2 className='nameDetails'>Health points!: {pokemon.hp}</h2>
        <h2 className='nameDetails'>Attack points!: {pokemon.attack}</h2>
        <h2 className='nameDetails'>Deffense points!: {pokemon.defense}</h2>
        <h2 className='nameDetails'>Speed points!: {pokemon.speed}</h2>
        <h2 className='nameDetails'>Height!: {pokemon.height} feets</h2>
        <h2 className='nameDetails'>Weight!: {pokemon.weight} kg</h2>
        <h2 className='nameDetails'>Types!: {pokemon.types.map(element=>"-"+element.name.toString()+"-")}</h2>
        <Link to='/home' className='linkHome'>
        <button className='homeButton'>Home</button>
        </Link>
      </div> 
        :
        <div className='loader2'>
          <img src={url} alt={"Still Loading..."}/>
          <div className='loadingTitle'>-Loading-</div>
        </div>
    }
    </div>
  )
}
