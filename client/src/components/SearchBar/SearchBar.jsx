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
        <div>
            <input type = 'text' placeholder = 'Buscar'
            onChange = {(element)=> handleInputChange(element)}/>
                <button className="button" type = 'submit'
                onClick={(element) =>handleSubmit(element)}>
                    Buscar!
                </button>
        </div>
    )
}