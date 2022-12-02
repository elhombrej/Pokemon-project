import React from "react";
// import { connect } from "react-redux";
import "./Home.css";
import { getPokemons, getTypes, filterCreated, orderByName, orderByAttack, filterTypes } from "../../redux/actions";
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import SearchBar from "../SearchBar/SearchBar";
//import Loader from "../Loader/Loader";

export default function Home(){

    //constante para despachar acciones:

    const dispatch = useDispatch();

    //trae el estado de los pokemos:

    const allPokemons = useSelector((state) => state.pokemons);

    const pokemonTypes = useSelector((state) => state.types);


    //Estado local sobre el paginado:

    const[currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage,/*setPokemonsPerPage*/] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon);
    const[/*order*/, setOrder] = useState('');

    const paging = (pageNumber)=>{
        setCurrentPage(pageNumber)
    };

    //despacho la accion getPokemons

    useEffect(()=>{
        dispatch(getPokemons())
    },[dispatch])

    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])

    //Despacho la accion getPokemons a lhacer click

    function handleClick(element){
        element.preventDefault();
        dispatch(getPokemons());
    }

    //Filtro para api o base de datos:

    function handleFilterCreated(element){
        element.preventDefault();
        dispatch(filterCreated(element.target.value))
    }

    //Filtro para tipos:

    function handleFilterTypes(element){
        element.preventDefault();
        dispatch(filterTypes(element.target.value))
    }

    function handleSortName(element){
        element.preventDefault();
        dispatch(orderByName(element.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${element.target.value}`)
    }

    function handleSortAttack(element){
        element.preventDefault();
        dispatch(orderByAttack(element.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${element.target.value}`)
    }


    return(

        <div className="home" key={Math.random()}>

        <SearchBar/>

        <h1>Web Pokedex</h1>

        <hr/>

        <button className="button" onClick={element=>{handleClick(element)}}>
        Volver a cargar Pokemons!
        </button>
        <Link to= '/pokemon/create'><button className="button">Crear Pokemon!</button></Link>
        <div className="background">

            {/*Ordenamiento Ascendente y Descendente, orden alfabetico y por ataque*/}

            <select className="button"
             onChange={element => handleSortName(element)}>
                <option>Orden alfabetico</option>
                <option value = 'asc'>A - Z!</option>
                <option value = 'desc'>Z - A!</option>
            </select>

            {/*Ordenamiento por ataque*/}

            <select className="button"
             onChange={element => handleSortAttack(element)}>
                <option>Orden por ataque</option>
                <option value = 'asc'>Mayor ataque!</option>
                <option value = 'desc'>Menor ataque!</option>
            </select>

            {/*Filtro por API o Base de Datos*/}

            <select className="button" 
            onChange={element => handleFilterCreated(element)}
            >
                <option>Filtro API o Base de datos</option>
                <option value='all'>Pokemon API y Base de datos!</option>
                <option value='api'>Pokemons API!</option>
                <option value='created'>Pokemons Base de datos!</option>
            </select>

            {/*Filtro por Tipo*/}

            <select className="button"
             onChange={(element)=>handleFilterTypes(element)}>
                    <option>Tipos</option>
                    {pokemonTypes.map((element)=>(
                        <option key={Math.random()} name ='types' value={element.name}>{element.name}</option>
                    ))}
                </select>

            <hr/>

            {/*Renderizo las cartas de los pokemon en Home*/}
            <div className='container' >{
                currentPokemons?.map((element)=>{
                    return(
                        <div className="cards" key={element.id}>
                            <Card 
                            key={element.id}
                            id={element.id}
                            name={element.name} 
                            img={element.img}
                            types={element.types}
                            height={element.height}
                            />
                    </div>
                    );
                })
            }                    
            </div>
            <div className="paging">
            <Paging
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paging = {paging}>    
            </Paging>
            </div>
        </div>

        </div>
    )
    
}
