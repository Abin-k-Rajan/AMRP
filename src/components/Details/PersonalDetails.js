import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";
import MovieList from "../MovieList";
import LoadingComponent from '../LoadingComponent';

class PersonalDetails extends Component
{

    constructor(props)
    {
        super(props)
    }

    render() {
        return (
            <>
        
                <div className='row'>
                    <div className='col-sm-4 m-5'>
                        <img className='img-fluid' src={this.props.detail.mediaLink === '' ? 'https://t3.ftcdn.net/jpg/01/84/81/64/360_F_184816468_sXO2m7Xhy2xqENls5YxrKlmFg3Ii82Mr.jpg' : this.props.detail.mediaLink} alt={'movie'} />
                    </div>
                    <div className="col-sm-7">
                        <div className='my-5'>
                        <h2>{this.props.detail.name}</h2>
                        <h5>{this.props.detail.designation}</h5>
                        <p>{this.props.detail.description}</p>
                        </div>
                        {
                            this.props.designation === 'actor' ? 
                            <h1>{this.props.detail.name}'s Films</h1> : <h1>{this.props.designation} of</h1>
                        }
                        <div className='container-fluid movie-app'>
                        <div className="container p-5 h-100">
                            <div className='row'>
                                <MovieList
                                    movies={this.props.movies}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default function(props){
    const {id} = useParams()
    const [person, setPerson] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0)
        fetch(props.designation === 'actor' ? `${apiUrl}${props.designation}/${id}` : `${apiUrl}crew/${props.designation}/${id}`)
            .then(res => res.json())
            .then((result) => {
                setPerson(result)
                setLoading(false)
            })
        fetch(`${apiUrl}crew/${props.designation}inmovies/${id}`)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setMovies(result)
            })
    }, [])


    return <> { loading ? <LoadingComponent /> : <PersonalDetails detail={person} movies={movies} designation={props.designation} />} </>;
};