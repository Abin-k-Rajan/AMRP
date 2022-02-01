import axios from "axios";
import { useEffect, useState } from "react";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../base";
import './Styles/Poster.css'

class Comment extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
          comment: '',
          rating: 5,
          newComment: false
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
          localStorage.setItem('comment-changed', JSON.stringify(res))
          this.setState({newComment: true})
          window.location.reload()
      }).catch(err => {
          alert(err)
      })
  }


    deleteComment = (e) => {
      document.getElementById(`comment${e.target.name}`).style.display = 'none';
      axios.delete(`${apiUrl}review/delete/${e.target.name}/${localStorage.getItem('userId')}`)
    }

    


    render() {
        return (
            <>
            <div className="col">
            <div className="comment-div" style={{"height": "60vh", "overflow-y": "scroll", "overflow-x": "hidden"}}>
            {
                this.props.reviews.map((review, index) => (
                    <section id={`comment${review.id}`}>
                    <div class="container text-dark">
                      <div class="row d-flex justify-content-center">
                          <div class="d-flex flex-start mb-4">
                            
                            <div class="card w-100">
                              <div class="card-body p-4">
                                <div class="">
                                  <h5>{review.userName}</h5>
                                  <p class="small">{review.lastUpdatedOn}</p>
                                  <p>
                                    {review.comment}
                                  </p>
                                  <button name={review.id} onClick={this.deleteComment} className={`btn btn-sm-outline del-button-${localStorage.getItem('userId') == review.userId ? 'show' : 'hide'}`}>Delete Comment</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          
                        </div>
                      </div>
                  </section>
                ))
            }
            </div>
            </div>



            <div className="col">
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
            </div>
            </>
        );
    }
}


export default function(props){
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}review/${props.id}`)
            .then(res => res.json())
            .then((result) => {
                setReviews(result)
                console.log(result)
            })
    }, [])
    return <Comment reviews={reviews} id={props.id}/>
}