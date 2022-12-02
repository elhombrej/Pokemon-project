import React from "react";
import "./Paging.css"

export default function Paging({pokemonsPerPage, allPokemons,paging}){
    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allPokemons/pokemonsPerPage);i++){
        pageNumbers.push(i)
    };

    return(
        <nav>
            <ul className="unOrderedList">
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="pages" key={number}>
                    <a className="number" onClick={()=> paging(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}