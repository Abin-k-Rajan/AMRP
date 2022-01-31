import axios from "axios";
import React, { useEffect, useState } from "react";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";




class PostMovie extends Component {

    constructor(props){
        super(props)
        this.state = {
            movieName: '',
            genre: '',
            posterLink: '',
            crewId: '',
            year: '',
            synopsis: ''
        }
        this.genre = ['Literary genres', 'Action', 'Adventure', 'Comedy', 'Crime and mystery', 'Fantasy', 'Historical', 'Historical fiction', 'Horror', 'Romance', 'Satire', 'Science fiction', 'Cyberpunk and derivatives', 'Speculative', 'Thriller', 'Western', 'Other', 'Film and television genres', 'Scripted', 'Action and adventure', 'Animation', 'Comedy', 'Drama', 'Historical', 'Horror', 'Science fiction', 'Western', 'Unscripted',  'Action and adventure', 'Action', 'Adventure and action-adventure', 'Role-playing game', 'Simulation', 'Strategy', 'Other']
    }
    


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        console.log(this.state)
        axios.post(apiUrl + 'movie/add', this.state, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            alert('Movie added')
            window.location.reload()
        }).catch(err => {
            if(err.response.status === 400)
            {
                alert('Please fill all the details.')
            }
            else if (err.response.status === 401)
            {
                alert('Unauthorized, please login.')
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

                    <h2 className="fw-bold mb-2 text-uppercase">Add Movie</h2>
                    <p className="text-white-50 mb-5">Add movie to database</p>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="movieName" type="text" id="movieNameX" className="form-control form-control-lg" placeholder="character" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="movieNameX">movieName</label>
                    </div>

                    <div class="form-floating">
                    <select name="genre" onChange={this.changeHandler} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Choose the Genre</option>
                        {this.genre.map((genre, index) => (
                            <option value={genre}>{genre}</option>
                        ))};
                    </select>
                    <label for="floatingSelect" style={{"color": "black"}}>Genre</label>
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


                    <div className="form-floating form-white mb-4">
                        <input name="posterLink" type="text" id="movieNameX" className="form-control form-control-lg" placeholder="character" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="movieNameX">posterLink</label>
                    </div>


                    <div className="form-floating form-white mb-4">
                        <input name="year" type="text" id="movieNameX" className="form-control form-control-lg" placeholder="character" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="movieNameX">Release Year</label>
                    </div>


                    <div class="form-floating form-white mb-4">
                    <textarea name="synopsis" class="form-control" placeholder="Description" id="floatingTextarea2" style={{"height": "100px"}} onChange={this.changeHandler}></textarea>
                    <label style={{"color": "black"}} for="floatingTextarea2">Synopsis</label>
                    </div>
                    
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

    return <PostMovie actors={actors} crews={crews}/>;
};