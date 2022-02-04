import imageSearchGoogle from 'image-search-google';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl, GOOGLE_CUSTOM_SEARCH_API_KEY, GOOGLE_CUSTOM_SEARCH_ENGINE, NO_IMAGE_AVAILABLE } from '../base';
import Cast from './Cast';
import Character from './Characters';
import Comment from './Comment';
import ImageCarousel from './ImageCarousel';
import LoadingComponent from './LoadingComponent';
import PostComment from './Post/PostComment';
import './Styles/MovieDetail.css'


const MovieDetail = (props) => {

    const client = new imageSearchGoogle(GOOGLE_CUSTOM_SEARCH_ENGINE, GOOGLE_CUSTOM_SEARCH_API_KEY);
    const options = {page: 1}
    const [detail, setDetail] = useState('')
    const [producer, setPoducer] = useState('')
    const [director, setDirector] = useState('')
    const [writer, setWriter] = useState('')
    const [cast, setCast] = useState([])
    const [reviews, setReviews] = useState([])
    const [images, setImages] = useState([])
    const {id} = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0)
        fetch(`${apiUrl}movie/${id}`)
            .then(res => res.json())
            .then((result) => {
                setDetail(result)
                fetch(`${apiUrl}crew/crew/${result.crewId}`)
                    .then(res => res.json())
                    .then((result) => {
                        setLoading(false)
                        fetch(`${apiUrl}crew/writer/${result.writerId}`).then(res => res.json()).then((result) => setWriter(result))
                        fetch(`${apiUrl}crew/producer/${result.producerId}`).then(res => res.json()).then((result) => setPoducer(result))
                        fetch(`${apiUrl}crew/director/${result.directorId}`).then(res => res.json()).then((result) => setDirector(result)) 
                        fetch(`${apiUrl}crew/cast/${result.crewId}`).then(res => res.json()).then((result) => {
                            setCast(result)
                            setLoading(false)
                        })
                    })
                client.search(result.movieName, options)
                .then(res => {
                    setImages(res)
                })
                setImages(['1', '2']);
            }
        );

        fetch(`${apiUrl}review/${id}`)
            .then(res => res.json())
            .then((result) => {
                setReviews(result)
            })

    }, [])


    
    useEffect(() => {
        console.log('change')
    }, [localStorage.getItem('comment-changed')])


	return (
		<>
            {
                loading ? 
                    <LoadingComponent /> :
                    <>
            <div className='row'>
                <div className='col-sm-4 p-5'>
                    <img className='img-fluid' src={detail.posterLink === '' ? NO_IMAGE_AVAILABLE : detail.posterLink} alt={`AMRP ${detail.movieName}`} />
                    <ImageCarousel images={images} />
                </div>
                <div className='col-sm-8'>
                    <div className='p-5'>
                    <h1>{detail.movieName}</h1>
                    <h2>{detail.genre}</h2>
                    <h2>{detail.year}</h2>
                    <p>{detail.synopsis}</p>
                    <br></br>
                    <div className='row'>
                        <div className='row'>
                            <div className='col'>
                            <Cast id={producer.producerId} name={producer.name} src={producer.mediaLink} address={producer.address} designation="Producer" />
                            </div>
                            <div className='col'>
                            <Cast id={director.directorId} name={director.name} src={director.mediaLink} address={director.address} designation="Director" />
                            </div>
                            <div className='col'>
                            <Cast id={writer.writerId} name={writer.name} src={writer.mediaLink} address={writer.address} designation="Writer" />
                            </div>
                            
                            <br></br>

                            <h2>Cast</h2>

                            {cast.map((movie, index) => (
                                <Character id={movie.actorId} character={movie.character} description={movie.description} actorName={movie.name} mediaLink={movie.mediaLink} designation={movie.designation} />   
                            ))}
                    </div>
                    </div>
                    
                </div>
                </div>
            </div>

            
            
            <h1 style={{"marginLeft": "20px", "marginBottom": "40px"}}>Comments</h1>
            <div className='container m-6'>
                <div className='row'>
                        <Comment id={id}/>  
                </div>
            </div>
            </>
            }
		</>
	);
};

export default MovieDetail;