import axios from "axios";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../../base";

class PostComment extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            rating: 5
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    submitHandler = (e) => {
        axios.post(`${apiUrl}review`, {
            'movieId': this.props.id,
            'userId': localStorage.getItem('userId'),
            'userName': localStorage.getItem('userName'),
            'comment': this.state.comment,
            'rating': this.state.rating
        }).then(res => {
            localStorage.setItem('comment-changed', JSON.stringify(this.state))
            alert('change')
        }).catch(err => {
            alert(err)
        })
    }

    render() {
        return (
            <>
            <section>
                <div class="container text-dark">
                
                        <div class="card">
                        <div class="card-body p-4">
                            <div class="d-flex flex-start w-100">
                            
                            <div class="w-100">
                                <h5>Add a comment</h5>
                                <div class="form-outline">
                                <textarea name="comment" onChange={this.changeHandler} class="form-control" id="textAreaExample" rows="7"></textarea>
                                <label class="form-label" for="textAreaExample"
                                    >What is your view?</label
                                >
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                <button onClick={this.submitHandler} type="button" class="btn btn-success">Post Comment</button>
                                
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
    return <PostComment id={props.id}/>
}