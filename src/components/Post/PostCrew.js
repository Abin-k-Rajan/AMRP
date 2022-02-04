import axios from "axios";
import React from "react";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";



class PostCrew extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            designation: '',
            mediaLink: '',
            description: ''
        }

        this.data = []
    }


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        console.log(this.state)
        axios.post(`${apiUrl}crew/${this.props.designation}`, this.state).then(res => {
            alert(`${this.props.designation} added  `)
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
            <div className="col-sm-5 p-4">
                <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Add {this.props.designation}</h2>
                    <p className="text-white-50 mb-5">Add {this.props.designation} details to database</p>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="name" type="tel" id="typeNameX" className="form-control form-control-lg" placeholder="XYZ" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="typeNameX">{this.props.designation} Name</label>
                    </div>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="designation" type="text" id="designationX" className="form-control form-control-lg" placeholder="7788" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="designationX">Designation</label>
                    </div>


                    <div className="form-floating form-white mb-4">
                        <input name="mediaLink" type="url" id="MediaX" className="form-control form-control-lg" placeholder="7788" onChange={this.changeHandler}/>
                        <label style={{"color": "black"}} className="form-label" for="mediaX">Media</label>
                    </div>

                    <div class="form-floating form-white mb-4">
                    <textarea name="description" class="form-control" placeholder="Description" id="floatingTextarea2" style={{"height": "100px"}} onChange={this.changeHandler}></textarea>
                    <label style={{"color": "black"}} for="floatingTextarea2">Description</label>
                    </div>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={this.submitHandler}>Post</button>
                    </div>

                </div>
                </div>
            </div>


        
        </>
    );
    }
}

export default PostCrew;