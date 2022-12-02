import { Link } from "react-router-dom";

function LandingPage(){

    return (
        <div>
            <h2>Landing Page</h2>
            <Link to= "/home"><button className= "boton-home">Ingresar!</button> </Link>
        </div>
    )
};

export default LandingPage;