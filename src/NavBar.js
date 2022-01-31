import { Component } from "react/cjs/react.production.min";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import './components/Styles/NavBar.css'

class NavBar extends Component
{
    render() {
        return (
            <>
                <div className='container-fluid movie-app sticky-top p-4 mt-2 nav-bar'>
                <div className='row d-flex align-items-center'>
                    <MovieListHeading heading='AMRP MOVIES' />
                    <SearchBox />
                </div>
                </div>
            </>
        );
    }
}

export default function(props) {
    return <NavBar />;
}