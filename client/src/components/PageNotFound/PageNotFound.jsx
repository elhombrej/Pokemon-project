import React from 'react';
import './PageNotFound.css'
import url from '../../images/404.gif'
import { Link } from 'react-router-dom';

export default function PageNotFound(){
    return(
	<div className='body404'>
		<h1>404 Error</h1>
        <img src={url} alt={"Still Loading..."}/>
		<h1>The page you are looking for can not be found.</h1>
		<Link to='/home' className='linkHome404'>
      <button className='homeButton'>Home</button>
    </Link>
	</div>)
}
