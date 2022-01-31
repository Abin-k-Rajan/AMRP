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
    }


    deleteComment = (e) => {
      axios.delete(`${apiUrl}review/delete/${e.target.name}/${localStorage.getItem('userId')}`).then(res => {
        alert('Comment removed')
        window.location.reload()
      })
    }

    render() {
        return (
            <>
            <div className="comment-div" style={{"height": "60vh", "overflow-y": "scroll", "overflow-x": "hidden"}}>
            {
                this.props.reviews.map((review, index) => (
                    <section>
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
    return <Comment reviews={reviews}/>
}