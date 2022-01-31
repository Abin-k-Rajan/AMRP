import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            userName: '',
            password: ''    
        }
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = () => {
        axios.post(`${apiUrl}account/register`, this.state).then(res => {
            this.props.navigate('/login')
            alert(`User added`)
        }).catch(err => {
            if (err.response.status === 400)
                alert('User already exist in the database')
            else
                alert(`Trouble connecting to server, thank you for your patience`)
        })
    }

    render () {
    return (
        <>
            <section className="vh-80 gradient-custom">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-white-50 mb-5">Join us</p>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="email" type="email" id="typeEmailX" onChange={this.changeHandler} className="form-control form-control-lg" placeholder="xyz@gmail.com" />
                        <label style={{"color": "black"}} className="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div className="form-floating form-white mb-4">
                        <input name="userName" type="texct" id="userNameX" onChange={this.changeHandler} className="form-control form-control-lg" placeholder="********" />
                        <label style={{"color": "black"}} className="form-label" for="userNameX">User Name</label>
                    </div>
                    

                    <div className="form-floating form-white mb-4">
                        <input name="password" type="password" id="typePasswordX" onChange={this.changeHandler} className="form-control form-control-lg" placeholder="********" />
                        <label style={{"color": "black"}} className="form-label" for="typePasswordX">Password</label>
                    </div>
                    <div>
                    <p className="mb-0"><Link to="/login" className="text-white-50 fw-bold">Sign In</Link></p>
                    </div>
                    

                    <br></br>
                    <button onClick={this.submitHandler} className="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
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
    return <Register navigate={navigate}/>;
};