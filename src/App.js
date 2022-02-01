import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetails';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import Login from './components/Login';
import PostCrew from './components/Post/PostCrew';
import Register from './components/Post/Register';
import NavBar from './NavBar';
import PostCast from './components/Post/PostCast';
import Post from './components/Post/Post';
import PersonalDetails from './components/Details/PersonalDetails';
import Footer from './components/Footer';

const App = () => {

	return (
		<>
		{
		<Router>
			<NavBar userName='login' />
			{/* <div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
</div> */}
			<Routes>
				<Route path='/' exact element={<Home />} />
				<Route path='/detail/:id' exact element={<MovieDetail/>} />
				<Route path='/login' exact element={<Login />} />
				<Route path='/post' exact element={<Post />} />
				<Route path='/register' exact element={<Register/>} />
				<Route path='/actor/:id' exact element={<PersonalDetails designation='actor' />} />
				<Route path='/director/:id' exact element={<PersonalDetails designation='director' />} />
				<Route path='/producer/:id' exact element={<PersonalDetails designation='producer' />} />
				<Route path='/writer/:id' exact element={<PersonalDetails designation='writer' />} />
			</Routes>
			<div style={{"height": "100px"}}></div>
			<Footer />
		</Router>
	}
	</>
	);
};

export default App;
