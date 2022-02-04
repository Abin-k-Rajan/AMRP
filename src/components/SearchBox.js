import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchBox = (props) => {
	const [userName, setUserName] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('userName'))
		{
			setUserName(localStorage.userName)
		}
		else
		{
			setUserName('Login')
		}
	}, [localStorage.getItem('userName')])

	const loginHandler = () => {
		if (localStorage.getItem('token'))
		{
			localStorage.removeItem('token')
			localStorage.removeItem('userName')
			localStorage.removeItem('userId')
			alert('Logging out')
			setUserName('Login')
		}
		else
		{
			navigate('/login')
		}
	}


	const searchHandler = (e) => {
		navigate('/')
		let input = e.target.value
    	input=input.toLowerCase();
		let x = document.getElementsByClassName('movies');

		for (let i = 0; i < x.length; i++) { 
			if (!x[i].innerHTML.toLowerCase().includes(input)) {
				x[i].style.display="none";
			}
			else {
				x[i].style.display="initial";                 
			}
		}
	}


	return (
		<>
		<div className='col'>
			<div className='form-floating'>
			<input
				onChange={searchHandler}
				className='form-control'
				value={props.value}
				placeholder='Type to search...'
			></input>
			<label style={{"color": "black"}} className="form-label" for="typeEmailX">Type to search</label>
			</div>
		</div>
		<div className='col float-end'>
			<div>
			<button onClick={loginHandler} className="btn btn-outline-light btn-sm px-5 float-end mx-5" type="submit">{userName}</button>
			<Link className='float-end hover-underline-animation' to={`/post`} style={{"textDecoration": "none", "color": "white"}}>
				Post
			</Link>
			</div>
		</div>
		</>
	);
};

export default SearchBox;
