import axios from "axios";
import { useEffect, useState } from "react";
import { Component } from "react/cjs/react.production.min";
import { apiUrl } from "../base";
import Rating from "./Rating";
import './Styles/Poster.css'

function Comments(props)
{
    const [reviews, setReviews] = useState([])
    const [update, setUpdate] = useState(true)
    const [Comment, setComment] = useState({comment: '', rating: 0})

    const clearStars = () => {
      Comment.rating = 0;
      Comment.comment = '';
      document.getElementById('textAreaExample').value = '';
      for (var i = 0; i < 5; i++)
        document.getElementById(`stars-buttons-${i+1}`).style.color = 'black';
    }

    useEffect(() => {
        fetch(`${apiUrl}review/${props.id}`)
            .then(res => res.json())
            .then((result) => {
                setReviews(result)
            })
            clearStars()
    }, [update]);
    



    const changeHandler = (e) => {
      setComment({[e.target.name]: e.target.value})
    }


  const submitHandler = (e) => {
      axios.post(`${apiUrl}review`, {
          'movieId': props.id,
          'userId': localStorage.getItem('userId'),
          'userName': localStorage.getItem('userName'),
          'comment': Comment.comment,
          'rating': Comment.rating
      }).then(res => {
            setUpdate(!update)
            alert('Thank you for your feedback!')
          //  HAVE TO LOAD COMMENT WITHOUT RELOAD
          //window.location.reload()
      }).catch(err => {
          alert(err)
      })
  }


    const deleteComment = (e) => {
      axios.delete(`${apiUrl}review/delete/${e.target.name}/${localStorage.getItem('userId')}`).then(res => setUpdate(!update))
    }

    const toggle = () => {
        setUpdate(!update)
    }



    const getStars = (e) => {
      Comment.rating = +e.target.name;
      for (var i = 0; i < 5; i++)
        document.getElementById(`stars-buttons-${i+1}`).style.color = 'black';
      for (var i = 0; i < +e.target.name; i++)
        document.getElementById(`stars-buttons-${i+1}`).style.color = 'rgba(181, 255, 85, 1)';
    }

    


        return (
            <div class="my-3">
            <Rating id={props.id} update={update}/>
            <div class="d-flex">
              <h1 style={{"marginLeft": "20px", "marginBottom": "0px"}}>Comments</h1>
              <button class={`fa fa-refresh mx-2 btn bg-transparent btn-lg refresh-button`} style={{color: "white"}} onClick={toggle}></button>
            </div>
            <div style={{margin: "20px"}}>

            </div>
            <div className="col">
            <div className="comment-div" style={{"height": "60vh", "overflow-y": "scroll", "overflow-x": "hidden"}}>
            {
                reviews.map((review, index) => (
                    <section id={`comment${review.id}`}>
                    <div class="container text-dark">
                      <div class="row d-flex justify-content-center">
                          <div class="d-flex flex-start mb-4">
                            
                            <div class="card w-100">
                              <div class="card-body p-4">
                                <div class="">
                                  <h5>{review.userName}</h5>
                                  <div class='d-flex flex-row justify-content-between'>
                                    <p class="p-0 small">{review.lastUpdatedOn}</p>
                                    <div class="p-0">
                                      {
                                        review.rating == 0 ? 
                                          <p>Not Rated</p> :
                                          <div class="ratings text-center"> <span class="badge bg-success"> {review.rating} <i class="fa fa-star-o"></i></span> </div>
                                      }
                                  </div>
                                  </div>
                                  <p>
                                    {review.comment}
                                  </p>
                                  <button name={review.id} onClick={deleteComment} className={`btn btn-sm-outline del-button-${localStorage.getItem('userId') == review.userId ? 'show' : 'hide'}`}>Delete Comment</button>
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



            <div className="col my-5">
            <section>
                <div class="container text-dark">
                
                        <div class="card">
                        <div class="card-body p-4">
                            <div class="d-flex flex-start w-100">
                            
                            <div class="w-100">
                                <h5>Add a comment</h5>
                                
                                <div class="form-outline">
                                <textarea name="comment" onChange={changeHandler} class="form-control" id="textAreaExample" rows="7"></textarea>
                                <label class="form-label" for="textAreaExample"
                                    >What is your view?</label
                                >
                                </div>

                                <div>
                                  <button id="stars-buttons-1" name='1' class="fa fa-star mx-2 stars btn bg-transparent" onClick={getStars}></button>
                                  <button id="stars-buttons-2" name='2' class="fa fa-star mx-2 stars btn bg-transparent" onClick={getStars}></button>
                                  <button id="stars-buttons-3" name='3' class="fa fa-star mx-2 stars btn bg-transparent" onClick={getStars}></button>
                                  <button id="stars-buttons-4" name='4' class="fa fa-star mx-2 stars btn bg-transparent" onClick={getStars}></button>
                                  <button id="stars-buttons-5" name='5' class="fa fa-star mx-2 stars btn bg-transparent" onClick={getStars}></button>
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                <button onClick={submitHandler} type="button" class="btn btn-success">Post Comment</button>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> 
                    
            </section>
            </div>
            </div>
        );
}

export default Comments;
