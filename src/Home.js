import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import { apiUrl } from './base';
import LoadingComponent from './components/LoadingComponent';


const Home = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true)



	useEffect(() => {
		localStorage.setItem('comment-changed', false)
		setLoading(true)
		fetch(`${apiUrl}movie`).then(res => res.json()).then((result) => {
			setMovies(result)
			localStorage.setItem('react-movie-app-movies', JSON.stringify(result))
			setLoading(false)
		})
	}, []);


	return (
		<>
		{	loading ?

			<LoadingComponent /> :
		
			<div className='container-fluid movie-app'>
			<div className="container p-5 h-100">
				<div className='row'>
					<MovieList
						movies={movies}
					/>
				</div>
				</div>
			</div>
		}
		</>
	);
};

export default Home;
