import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import './components/Styles/NavBar.css'
import React, { useState } from "react";

function NavBar(){
    const [click, setClick] = useState(false);
    const [user, setUser] = useState('LOGIN');
    
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


        return (
            <>

            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className="navbar-logo" style={{"textDecoration": "none", "color": "white"}} onClick={closeMobileMenu}>
                        AMRP MOVIES
                    </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/post' className='nav-links' onClick={closeMobileMenu}>
                            Post
                        </Link>
                    </li>


                    <li className='nav-item'>
                    <Link to='/actors' className='nav-links' onClick={closeMobileMenu}>
                        Actors
                    </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/directors' className='nav-links' onClick={closeMobileMenu}>
                            Directors
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/producers' className='nav-links' onClick={closeMobileMenu}>
                            Producers
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/writers' className='nav-links' onClick={closeMobileMenu}>
                            Writers
                        </Link>
                    </li>

                </ul>
                    </div>
            </nav>


            <div className="nav-full-screen">

                <div className='container-fluid movie-app sticky-to p-4 mt-2 nav-ba'>
                <div className='row d-flex align-items-center'>
                    <MovieListHeading heading='AMRP MOVIES' />
                    <SearchBox />
                </div>
                </div>
            </div>
            </>
        );
}

export default NavBar;