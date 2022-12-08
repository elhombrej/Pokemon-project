import React from "react";
import { Link } from "react-router-dom";
import './About.css'

export default function About(){
    return(
        <div className="aboutBody">

            <h1>About</h1>
            <h5>...</h5>

            <h2>Page developed by Padron Joaquin</h2>
            <h3>Individual project for 'Henry' bootcamp</h3>
            <h5>...</h5>

            <ul>Used technologies for development:
                <li></li>
                <li>"node": "12.18.3"</li>
                <li>"npm": "6.14.6"</li>
                <li>"axios": "1.2.0"</li>
                <li>"express": "4.18.2"</li>
                <li>"sequelize": "6.25.8"</li>
                <li>"react": "17.0.2"</li>
                <li>"react-dom": "17.0.2"</li>
                <li>"react-redux": "7.2.3"</li>
                <li>"react-router-dom": "5.2.0"</li>
                <li>"react-scripts": "5.0.1"</li>
                <li>"redux": "4.0.5"</li>
                <li>"redux-thunk": "2.3.0"</li>
                <li>"react-app"</li>
                <li>JavaScript ECMASript 6</li>
                <li>Visual Studio Code</li>
                <li>pgAdmin4</li>
                <li>Postman</li>
                <li>Bash</li>
                <li>Zsh</li>
                <li>Firefox explorer</li>
            </ul>
            <h5>...</h5>

            <h3>GitHub: elhombrej</h3>
            <h3>Mail: Joaquinpadron@outlook.com</h3>
            <h3>Full-Stack development</h3>
            <h5>...</h5>

            <h5>CP 8400, San Carlos De Bariloche, Rio Negro, Argentina</h5>
            <h5>2022</h5>
            <h5>Without Full-Stack developers all webs would look like this tab.</h5>
            <h5>...</h5>
            <Link to='/home'>GO HOME!</Link>

            <h5>...</h5>

        </div>
    )

}