import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({id,name,img,types,height}) {
  return (
    <div className="card">
          <div className="card-body" key={id}>
            <Link to= {`/details/${id}`}>
              <h1 className="card-title">{name}</h1>
              </Link>
          <img 
          src={img} alt={"Imagen desaparecida!"} width={height*15+"px"} height={height*15+"px"}/>
          <p className="types">{types.map(element=> element.name +"\n")}</p>
          </div>
    </div>
  );
};