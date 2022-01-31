import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Poster.css'

const MovieList = (props) => {

	return (
		<>
			{props.movies.map((movie, index) => (
				<div class="movies card" style={{"width": "18rem", "backgroundColor": "transparent"}}>
				<Link to={`/detail/${movie.movieId}`}>
				<div className='image-container d-flex justify-content-start m-3'>
					<img className='card-img-top embed-responsive-item' style={{"height": "100%"}} src={movie.posterLink} alt='movie'></img>
					<div
						className='overlay d-flex align-items-center justify-content-center'
					>
						<p className='p-tag'>{movie.movieName} <p className='p-tag'>{movie.genre}</p></p>
						
					</div>
				</div>
				</Link>
				</div>
			))}
		</>
	);
};

export default MovieList;
