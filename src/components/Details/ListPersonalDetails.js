import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";
import LoadingComponent from "../LoadingComponent";

class ListPersonalDetails extends Component
{
    constructor (props) 
    {
        super(props)
    }
    render() {
        return (
            <>
            {this.props.details.map((detail, index) => (
				<div class="movies card" style={{"width": "18rem", "backgroundColor": "transparent"}}>
				<Link to={this.props.designation === 'actor' ? `/actor/${detail.actorId}` : this.props.designation === 'director' ? `/director/${detail.directorId}` : this.props.designation === 'producer' ? `/producer/${detail.producerId}` : `/writer/${detail.writerId}`}>
				<div className='image-container d-flex justify-content-start m-3'>
					<img className='card-img-top embed-responsive-item' style={{"height": "100%"}} src={detail.mediaLink} alt='movie'></img>
					<div
						className='overlay d-flex align-items-center justify-content-center'
					>
						<p className='p-tag'>{detail.name} <p className='p-tag'>{this.props.designation}</p></p>
						
					</div>
				</div>
				</Link>
				</div>
			))}
            </>
        );
    }
}

export default function(prop){
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)

    

    useEffect(() => {
        setLoading(true)
        if (localStorage.getItem(`${prop.designation}s`))
        {
            setDetails(JSON.parse(localStorage.getItem(`${prop.designation}s`)))
            setLoading(false)
        }
        else {
            fetch(`${apiUrl}crew/getall${prop.designation}s`).then(res => res.json()).then((result) => {
                setDetails(result)
                localStorage.setItem(`${prop.designation}s`, JSON.stringify(result));
                setLoading(false)
            })
        }
    }, [prop.designation])

    return (
        <>
        {
            loading ? <LoadingComponent /> :
            <>
                <div className='container-fluid movie-app'>
                <div className="container p-5 h-100">
                    <div className='row'>
                        <ListPersonalDetails details={details} designation={prop.designation} />
                    </div>
                </div>
                </div>
        </>
        }  
        </>    
        );;
}