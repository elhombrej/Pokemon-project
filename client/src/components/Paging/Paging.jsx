import React from "react";
import "./Paging.css"

export default function Paging({pokemonsPerPage, allPokemons,paging,current}){

    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(allPokemons/pokemonsPerPage);i++){
        pageNumbers.push(i)
    };

    return(
        <>

            <ul className="unOrderedList">

                {(current>1)?
                <li className="pages">                    
                    <button className="number" 
                        onClick={()=> paging(current -1)}>
                            BACK
                    </button>
                </li>
                :
                <></>
                }

                {pageNumbers.length>1&&
                pageNumbers.map(number =>(
                    <div key={number}>
                    <li className='pages'
                        key={number}>
                    <button 
                        className={
                            number==current? 
                            "currentButton":
                            "number"
                        }
                        onClick={()=> paging(number)}>
                            {number}
                    </button>

                    </li>
                    </div>
                ))}

                {(current < pageNumbers.length)?
                <li className="pages">                    
                    <button className="number" 
                        onClick={()=> paging(current +1)}>
                        FOWARD
                    </button>
                </li>
                :
                <></>
                }


            </ul>

        </>
    )
}