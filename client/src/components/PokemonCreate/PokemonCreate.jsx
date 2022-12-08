import React, {useState, useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {postPokemon,getTypes} from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'

function validate(input){
    let errors={};
    if(input.name.length > 12){errors.name = 'Name is required to be a text with 12 characters maximum'}
    else if(input.hp < 0 || input.hp > 100 || !parseInt(input.hp)>0){errors.name = 'Health Points must be a number between 1 and 100'}
    else if(input.attack < 0 || input.attack > 100 || !parseInt(input.attack)>0){errors.name = 'Attack Points must be a number between 1 and 100'}
    else if(input.defense < 0 || input.defense > 100 || !parseInt(input.defense)>0){errors.name = 'Defense Points must be a number between 1 and 100'}
    else if(input.speed < 0 || input.speed > 100 || !parseInt(input.speed)>0){errors.name = 'Speed Points must be a number between 1 and 100'}
    else if(input.height < 0 || input.height > 30 || !parseInt(input.height)>0){errors.name = 'Height Points must be a number between 1 and 30'}
    else if(input.weight < 0 || input.weight > 500 || !parseInt(input.weight)>0){errors.name = 'Weight Points must be a number between 1 and 500'}
    return errors;
}

let typeCount =0;

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state)=> state.types);
    const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        img:"",
        createdInDb:true,
        types:[]
    })

    function handleChange(element){

        setInput({
            ...input,
            [element.target.name]: element.target.value
        })

        setErrors(validate({
            ...input,
            [element.target.name]: element.target.value
        }))
    }

    function handleSelect(element){
        setInput({
            ...input,
            types:[...input.types, {name: element.target.value}]
        })

        typeCount += 1;
    }

    function handleSubmit(element){
        try{
            element.preventDefault();
            dispatch(postPokemon(input))
            setInput({
            name:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            img:"",
            types:[]
        })}catch(error){alert("Fatal Error.")}
        history.push('/home');
    }

    function handleDelete(element){
        setInput({
            ...input,
            types: input.types.filter(type => type !== element)
        })
        typeCount -=1
    }

    useEffect(()=>{
        dispatch(getTypes());
    },[dispatch]);

    return(
        <div className="containerCreate">
        <div className="bodyCreate">

            <Link to= '/home'><button className="buttonCreate1">Home!</button></Link>
            
            <h1 className="h1Create">Create your own Pokemon!</h1>

            {input.name && (
                <p className="requirements">
                {errors.name}
                </p>
                )
            }

            {<form className="formBody" onSubmit={(element)=> handleSubmit(element)}>
               
               <div>
                    <label className="labelCreate">Name:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.name}
                    name='name'
                    placeholder="Required (- 12 characters)"
                    onChange={
                        (element)=>handleChange(element)}

                    />   
                </div>

                {input.name&&<div>
                    <label className="labelCreate">Health Points:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.hp}
                    name='hp'
                    placeholder="1-100"
                    onChange={
                        (element)=>handleChange(element)
                    }
                    />
                </div>}

                {input.hp&&<div>
                    <label className="labelCreate">Image (URL):</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.img}
                    name='img'
                    placeholder="url"
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>}

                {input.img&&<div>
                    <label className="labelCreate">Attack Points:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.attack}
                    name='attack'
                    placeholder="1-100"
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>}

                {input.attack&&<div>
                    <label className="labelCreate">Defense Points:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.defense}
                    name='defense'
                    placeholder="1-100"
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>}

                {input.defense&&<div>
                    <label className="labelCreate">Speed Points:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.speed}
                    name='speed'
                    placeholder="1-100"
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>}

                {input.speed&&<div>
                    <label className="labelCreate">Height:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.height}
                    name='height'
                    placeholder="1-30 Feets"
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>}

                {input.height&&<div>
                    <label className="labelCreate">Weight:</label>
                    <input className="inputCreate"
                    type='text'
                    value= {input.weight}
                    name='weight'
                    placeholder="1-500"
                    onChange={(element)=>handleChange(element)}
                    />   
                </div>}

                {input.weight&&
                
                <select 
                className="buttonCreate1"
                onChange={(element)=>handleSelect(element)}>

                <option>Choose 3 Types!</option>

                    {types.map((element)=>(
                        <option 
                        key={Math.random()} 
                        name ='types' 
                        value={element.name}>{element.name}</option>
                    ))}
                </select>}

                <ul>
                    <div>
                        {input.types.map((element)=>
                        <li 
                        className="chosenTypes" 
                        key={Math.random()} 
                        onClick={()=>handleDelete(element)
                            }>
                            {(element.name.toString())}                            
                        </li>)
                        }
                    </div>
                </ul>

                {!errors.name && input.name &&typeCount < 4 &&
                (<button  className="buttonCreate2"types='submit'>Crear!</button>)}

            </form>}
        </div>
        </div>
    )
}

