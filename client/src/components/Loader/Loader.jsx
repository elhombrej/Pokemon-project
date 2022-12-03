import React from "react";
import url from '../../images/loader.gif'

const Loader = () => {
  return (
    <div>
      <p>Cargando!</p>
      <img src={url}/>
    </div>
  );
};

export default Loader;
