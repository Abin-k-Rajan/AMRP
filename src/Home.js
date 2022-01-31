import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import { apiUrl } from './base';

const Home = () => {
	const [movies, setMovies] = useState([]);



	useEffect(() => {
		fetch(`${apiUrl}movie`).then(res => res.json()).then((result) => {
			setMovies(result)
			localStorage.setItem('react-movie-app-movies', JSON.stringify(result))
		})
	}, []);


	return (
		<>
		<div className='container-fluid movie-app'>
		<div className="container p-5 h-100">
			<div className='row'>
				<MovieList
					movies={movies}
				/>
			</div>
			</div>
		</div>
		</>
	);
};

export default Home;
