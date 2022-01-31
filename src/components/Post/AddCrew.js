import axios from "axios";
import React, { useEffect, useState } from "react";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";



class AddCrew extends Component {

    constructor(props){
        super(props)
        this.state = {
            crewName: '',
            directorId: '',
            producerId: '',
            writerId: ''
        }
    }


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        console.log(this.state)
        axios.post(apiUrl + 'crew/crew', this.state).then(res => {
            alert('Crew added')
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

                    <h2 className="fw-bold mb-2 text-uppercase">Add Crew</h2>
                    <p className="text-white-50 mb-5">Add crew details to database</p>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="crewName" type="text" id="chracterX" className="form-control form-control-lg" placeholder="character" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="characterX">Crew Name</label>
                    </div>

                    <div class="form-floating">
                    <select name="directorId" onChange={this.changeHandler} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Choose the Director</option>
                        {this.props.directors.map((director, index) => (
                            <option value={director.directorId}>{director.name} - {director.directorId}</option>
                        ))};
                    </select>
                    <label for="floatingSelect" style={{"color": "black"}}>Director</label>
                    </div>
                    <br></br>

                    <div class="form-floating">
                    <select name="producerId" onChange={this.changeHandler} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Choose the Producer</option>
                        {this.props.producers.map((producer, index) => (
                            <option value={producer.producerId}>{producer.name} - {producer.producerId}</option>
                        ))};
                    </select>
                    <label for="floatingSelect" style={{"color": "black"}}>Producer</label>
                    </div>
                    <br></br>

                    <div class="form-floating">
                    <select name="writerId" onChange={this.changeHandler} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Choose the Writer</option>
                        {this.props.writers.map((writer, index) => (
                            <option value={writer.writerId}>{writer.name} - {writer.writerId}</option>
                        ))};
                    </select>
                    <label for="floatingSelect" style={{"color": "black"}}>Writer</label>
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
    const [directors, setDirectors] = useState([])
    const [producers, setProducers] = useState([])
    const [writers, setWriters] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}crew/director`).then(res => res.json()).then((result) => 
            result.sort(function(a, b){return a.name.localeCompare(b.name);})
        ).then(res => setDirectors(res))
        fetch(`${apiUrl}crew/producer`).then(res => res.json()).then((result) => 
            result.sort(function(a, b){return a.name.localeCompare(b.name);})
        ).then(res => setProducers(res))
        fetch(`${apiUrl}crew/writer`).then(res => res.json()).then((result) => 
        result.sort(function(a, b){return a.name.localeCompare(b.name);})
    ).then(res => setWriters(res))
    }, [])

    return <AddCrew directors={directors} producers={producers} writers={writers}/>;
};