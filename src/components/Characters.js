import { Component } from "react"
import { Link } from "react-router-dom";



class Character extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <>
            <Link to={`/actor/${this.props.id}`} style={{"textDecoration": "none", "color": "white"}}>
                <div className="image-container comment mt-4 text-justify"> <img src={this.props.mediaLink === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRucpvmQPFPFFQ2PomrKQh9zw7AV_OROfs6pg&usqp=CAU' : this.props.mediaLink} alt="" class="rounded-circle float-end" width="80" height="80"/>
                    <h4>{this.props.character}</h4> <span>Played by - {this.props.actorName} ( {this.props.designation} )</span> <br></br>
                    <p>{this.props.description}</p>
                </div>
            </Link>
                <br></br>
            </>
        )
    }
}

export default Character;