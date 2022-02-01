import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from '../base.js'

class Login extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        this.setState({loading: true})
        axios.post(apiUrl + 'account/login', this.state).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userName', res.data.userName)
            localStorage.setItem('userId', res.data.userId)
            this.props.navigate('/')
            this.setState({loading: false})
            alert(`Welcome, ${res.data.userName}`)
        }).catch(err => {
            if (err.response.status === 401)
                alert('Credentials do not match')
            else
                alert(`Trouble connecting to server, thank you for your patience`)
            this.setState({loading: false})
        })
    }

    render() {
        return (
            <>
            <section className="vh-80 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="email" onChange={this.changeHandler} type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="xyz@gmail.com" />
                        <label style={{"color": "black"}} className="form-label" for="typeEmailX">Email</label>
                    </div>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="password" onChange={this.changeHandler} type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="********" />
                        <label style={{"color": "black"}} className="form-label" for="typePasswordX">Password</label>
                    </div>

                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                    <button onClick={this.submitHandler} className="btn btn-outline-light btn-lg px-5" type="submit">Login
                        {this.state.loading ?
                                    <div class="d-flex justify-content-center float-end mx-2">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    </div> :
                                    <div className="mx-2"></div>
                        }
                    </button>
                    </div>

                    <div>
                    <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link></p>
                    </div>

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

export default function(props) {
    const navigate = useNavigate()
    return <Login navigate={navigate}/>;
};