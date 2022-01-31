import { Component } from "react"
import { Link } from "react-router-dom";



class Cast extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <>
                <h2>{this.props.designation}</h2>
                <Link to={`/${this.props.designation}/${this.props.id}`}>
                <div className='image-container d-flex justify-content-start m-3'>
					<img className="img-fluid" src={this.props.src} alt='movie'></img>
					<div
						className='overlay d-flex align-items-center justify-content-center'
					>
						<p className='p-tag'>{this.props.name} <p className='p-tag'>{this.props.address}</p></p>
						
					</div>
				</div>
                </Link>
            </>
        )
    }
}

export default Cast;