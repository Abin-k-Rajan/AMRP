import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/MovieListHeading.css'

const MovieListHeading = (props) => {
	return (
		<div className='col-6'>
			<div className='d-flex justify-content-evenly align-middle'>
			<Link to='/' style={{"textDecoration": "none"}}>
				<div>
					<h4 style={{"color": "white", textDecoration: "none"}}>{props.heading}</h4>
				</div>
			</Link>
			<Link to={'/actors'} style={{"textDecoration": "none"}}> <p class="hover-underline-animation">Actors</p></Link>
			<Link to={'/directors'} style={{"textDecoration": "none"}}> <p class="hover-underline-animation">Directors</p></Link>
			<Link to={'/producers'} style={{"textDecoration": "none"}}> <p class="hover-underline-animation">Producers</p></Link>
			<Link to={'/writers'} style={{"textDecoration": "none"}}> <p class="hover-underline-animation">Writers</p></Link>
			</div>
		</div>
	);
};

export default MovieListHeading;
