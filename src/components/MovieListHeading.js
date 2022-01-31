import React from 'react';
import { Link } from 'react-router-dom';

const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<Link to='/' style={{"textDecoration": "none"}}>
				<div>
					<h4 style={{"color": "white", textDecoration: "none"}}>{props.heading}</h4>
				</div>
			</Link>
		</div>
	);
};

export default MovieListHeading;
