import { Link } from "react-router-dom";
import './LandingPage.css'

function LandingPage(){

    return (
        <div className="landingBody">
            <div className="elementsLand">
            <h1 className="titleLand">Project Pokemon Seek</h1>
            <h5 className="titleLand">By Joaquinpadron@outlook.com</h5>
            <Link to= "/home"><button className= "buttonLanding">Ingresar!</button> </Link>
            </div>
        </div>
    )
};


export default LandingPage;