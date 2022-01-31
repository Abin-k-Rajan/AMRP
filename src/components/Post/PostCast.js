import axios from "axios";
import React, { useEffect, useState } from "react";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";



class PostCast extends Component {

    constructor(props){
        super(props)
        this.state = {
            character: '',
            description: '',
            actorId: '',
            crewId: ''
        }
    }


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        console.log(this.state)
        axios.post(apiUrl + 'crew/cast', this.state).then(res => {
            alert('Character added')
            window.location.reload()
        }).catch(err => {
            if(err.response.status === 400)
            {
                alert('Please fill all the details.')
            }
            else
            {
                alert(`Server fault`)
            }
        })
    }


    render() {
    return (
        <>
           <section className="vh-80 gradient-custom">
            <div className="container py-5 h-100">
            <div className="col">
                <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Add Cast</h2>
                    <p className="text-white-50 mb-5">Add cast details to database</p>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="character" type="text" id="chracterX" className="form-control form-control-lg" placeholder="character" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="characterX">Character</label>
                    </div>

                    <div class="form-floating form-white mb-4">
                    <textarea name="description" class="form-control" placeholder="Description" id="floatingTextarea2" style={{"height": "100px"}} onChange={this.changeHandler}></textarea>
                    <label style={{"color": "black"}} for="floatingTextarea2">Description</label>
                    </div>

                    <div class="form-floating">
                    <select name="actorId" onChange={this.changeHandler} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Choose the Actor</option>
                        {this.props.actors.map((actor, index) => (
                            <option value={actor.actorId}>{actor.name} - {actor.actorId}</option>
                        ))};
                    </select>
                    <label for="floatingSelect" style={{"color": "black"}}>Actor</label>
                    </div>
                    <br></br>

                    <div class="form-floating">
                    <select name="crewId" onChange={this.changeHandler} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Choose the Crew</option>
                        {this.props.crews.map((crew, index) => (
                            <option value={crew.crewId}>{crew.crewName} - {crew.crewId}</option>
                        ))};
                    </select>
                    <label for="floatingSelect" style={{"color": "black"}}>Crew</label>
                    </div>
                    <br></br>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={this.submitHandler}>Post</button>
                    </div>

                    

                </div>
                </div>
            </div>

            </div>

        </section>
        
        </>
    );
    }
}

export default function(props){
    const [actors, setActors] = useState([])
    const [crews, setCrews] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}actor`).then(res => res.json()).then((result) => 
            result.sort(function(a, b){return a.name.localeCompare(b.name);})
        ).then(res => setActors(res))
        fetch(`${apiUrl}crew`).then(res => res.json()).then((result) => setCrews(result))
    }, [])

    return <PostCast actors={actors} crews={crews}/>;
};