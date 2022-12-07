import './SearchBar.css'
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions"

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    
    function handleInputChange(element){
        element.preventDefault();
        setName(element.target.value)
    }

    function handleSubmit(element){
        element.preventDefault();
        dispatch(getPokemonByName(name));
    }

    return(
        <div className='searchBody'>
            <input 
            className="input"
            type = 'text'
            placeholder = 'Pokemon Search'
            onChange = {(element)=> handleInputChange(element)}/>
            <button 
                className="button2" 
                type = 'submit'
                onClick={(element) =>handleSubmit(element)}>
                Search!
            </button>
        </div>
    )
}