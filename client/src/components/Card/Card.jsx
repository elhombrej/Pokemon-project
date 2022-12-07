import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Card({id,name,img,types,height}) {

  const sizeSwitch = useSelector(state =>state.cardSize);

const size = sizeSwitch ? 
height*15+"px":
'200px'

  return (
    <div className="card">
          <div className="card-body" key={id}>
          <Link className="linkCard" to= {`/details/${id}`}>
              <h1 className="card-title">{name.toUpperCase()}</h1>
          <img 
          src={img} alt={"No image!"} width={size} height={size}/>
          <p className="types">{types.map(element=> element.name +"\n")}</p>
          </Link>
          </div>
    </div>
  );
};