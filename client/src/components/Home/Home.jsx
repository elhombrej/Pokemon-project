import React from "react";
import "./Home.css";
import { getPokemons, getTypes, filterCreated, orderByName, orderByAttack, filterTypes, backgroundStyle, cardSize, loadingStatus } from "../../redux/actions";
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import SearchBar from "../SearchBar/SearchBar";
import url from '../../images/loader4.gif'


export default function Home(){

    //constante para despachar acciones:

    const dispatch = useDispatch();

    //trae el estado de los pokemos:

    const allPokemons = useSelector((state) => state.pokemons);

    const pokemonTypes = useSelector((state) => state.types);

    const backgroundTheme = useSelector((state) => state.backgroundStyle);

    const load = useSelector((state) => state.loadingStatus);

    //const pokemonsNoFilter = useSelector((state) => state.pokemonsAuxNoFilter);


    //Estado local sobre el paginado:

    const [currentPage, setCurrentPage] = useState(1);

    const [pokemonsPerPage,setPokemonsPerPage] = useState(12);

    const [oreder,setOrder] = useState('');

    const indexOfLastPokemon = currentPage * pokemonsPerPage;

    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon);

    //despacho las acciones:

        useEffect(()=>{
            dispatch(getPokemons())
        },[dispatch])
    
        useEffect(()=>{
            dispatch(getTypes())
        },[dispatch])        

    //Despacho la accion getPokemons al hacer recargo de Pokemons:

    function handleClick(element){
        element.preventDefault();
        dispatch(loadingStatus())
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
        setOrder(element.target.value)
    }

    function handleSortAttack(element){
        element.preventDefault();
        dispatch(orderByAttack(element.target.value))
        setCurrentPage(1);
        setOrder(element.target.value)
    }

    function handleBackground(element){
        element.preventDefault();
        dispatch(backgroundStyle(element));
    }

    function handleSize(element){
        element.preventDefault();
        dispatch(cardSize());
    }

    const paging = (pageNumber)=>{
        setCurrentPage(pageNumber)
    };

    return(

        <div className="home" key={Math.random()}>

        {currentPokemons.length && load?  
        
        <div>      
        
        <h1 className="title">Project Pokemon Seek!</h1>

        <h5 className="title">Search Pokemon information and create your own!</h5>

        <div className="searchBar"><SearchBar/></div>
        
        <hr/>

        <p className="pHome">Options:</p>
        
        <button className="button" onClick={element=>{handleClick(element)}}>Reload home!</button>

        <Link to= '/pokemon/create'><button className="button">Create Pokemon!</button></Link>

        <button className="button" onClick={element => handleBackground(element)}>Change Theme!</button>

        <button className="button" onClick={element => handleSize(element)}>Cards Size!</button>

        <hr/>

        <p className="pHome">Filters:</p>

    {/*Ordenamiento Ascendente y Descendente, orden alfabetico y por ataque*/}

            <select className="button"
             onChange={element => handleSortName(element)}>
                <option>Sort Alphabetically!</option>
                <option value = 'asc'>A - Z!</option>
                <option value = 'desc'>Z - A!</option>
            </select>

    {/*Ordenamiento por ataque*/}

            <select className="button"
            onChange={element => handleSortAttack(element)}>
                <option>Sort By Attack!</option>
                <option value = 'asc'>Low Attack!</option>
                <option value = 'desc'>High Attack!</option>
            </select>

    {/*Filtro por API o Base de Datos*/}

            <select className="button" 
            onChange={element => handleFilterCreated(element)}
            >
                <option>Filter original or created!</option>
                <option value='all'>All Pokemons!</option>
                <option value='api'>Original Pokemons!</option>
                <option value='created'>Created Pokemons!</option>
            </select>

    {/*Filtro por Tipo*/}

            <select className="button"
             onChange={(element)=>handleFilterTypes(element)}>
                    <option>Filter By Types!</option>
                    {pokemonTypes.map((element)=>(
                        <option key={Math.random()} name ='types' value={element.name}>{element.name}</option>
                    ))}
                </select>

            <hr/>

        {/*Renderizo las cartas para el menu*/}
            
            <div className={backgroundTheme ? 'lightBackground' : 'darkBackground'}>
                <div className="container">
        
                    {currentPokemons.map((element)=>{

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
                        }    
                        )}     
                </div>

                <div className="pagingBody">

                <hr/>

                <div>
                    Page: {currentPage}
                </div>

                {/*Renderizo las cartas de los pokemon en Home*/}

                <div className="paging">

                  <Paging
                  pokemonsPerPage={pokemonsPerPage}
                  allPokemons={allPokemons.length}
                  paging = {paging}
                  current={currentPage}>    
                  </Paging>

                </div>

                <p className="aboutHome"><Link to='/about'>About</Link></p>

                <hr/>

                </div>

            </div>

        </div>
        : 
            <div className="loader1">
            <img src={url} alt={"Still Loading..."}/>
            <div className="title">-Loading-</div>
            <p className="homeAux" onClick={element=>{handleClick(element)}}>Reload home!</p>
            </div>        
            
        }
            
        </div>
    )
    
}
