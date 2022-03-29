import React, { Component, useEffect, useState } from "react";
import './Styles/Rating.css'
import { apiUrl } from '../base'


class Rating extends Component 
{
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <>
            <div class="container my-3">
            <div class="card rating-panel">
                <div class="row no-gutters">
                    <div class="col-md-4 border-right">
                        <div class="ratings text-center p-4 py-5"> <span class={`badge ${this.props.average >= 3 ? 'bg-success' : 'bg-warning'}`}>{parseFloat(this.props.average).toFixed(1)} <i class="fa fa-star-o"></i></span> <span class="d-block about-rating">{
                            this.props.average > 3 ? `VERY GOOD` : this.props.average < 2 ? `BAD` :  `AVERAGE`
                        }</span> <span class="d-block total-ratings">{this.props.total} ratings</span> </div>
                    </div>
                    
                    <div class="col-md-8">
                        <div class="rating-progress-bars p-3">
                            <div class="progress-1 align-items-center">
                                <div class="progress rating-panel">
                                    <div class="progress-bar bg-success" role="progressbar" style={{width: `${Math.trunc((this.props.fiveStar / this.props.total) * 100)}%`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{this.props.fiveStar}</div>
                                </div>
                                <div class="progress rating-panel">
                                    <div class="progress-bar bg-custom" role="progressbar" style={{width: `${Math.trunc((this.props.fourStar / this.props.total) * 100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.props.fourStar}</div>
                                </div>
                                <div class="progress rating-panel">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: `${Math.trunc((this.props.threeStar / this.props.total) * 100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.props.threeStar}</div>
                                </div>
                                <div class="progress rating-panel">
                                    <div class="progress-bar bg-warning" role="progressbar" style={{width: `${Math.trunc((this.props.twoStar / this.props.total) * 100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.props.twoStar}</div>
                                </div>
                                <div class="progress rating-panel">
                                    <div class="progress-bar bg-danger" role="progressbar" style={{width: `${Math.trunc((this.props.oneStar / this.props.total) * 100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.props.oneStar}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </>
        );
    }
}


export default function(props) {

    const [average, setAverage] = useState(0)
    const [total, setTotal] = useState(0)
    const [oneStar, setOneStar] = useState(0)
    const [twoStar, setTwoStar] = useState(0)
    const [threeStar, setThreeStar] = useState(0)
    const [fourStar, setFourStar] = useState(0)
    const [fiveStar, setFiveStar] = useState(0)
    const [totalStars, setTotalStars] = useState(0)
    const [ratingChange, setRatingChange] = useState(true)

    useEffect(() => {
        fetch(`${apiUrl}review/ratinginfo/${props.id}`).then(
            res => { res.json().then((result) => {
                if (res.status == 200) {
                    setTotal(result.totalRating)
                    setAverage(result.average)
                }
                else
                {
                    setTotal(0)
                    setAverage(0)
                }
            })
            }).then(
            fetch(`${apiUrl}review/rating/${props.id}`).then(
                res => res.json().then((result) => {
                    console.log(result.oneStar)
                    setOneStar(result.oneStar)
                    setTwoStar(result.twoStar)
                    setThreeStar(result.threeStar)
                    setFourStar(result.fourStar)
                    setFiveStar(result.fiveStar)
                    setTotalStars(result.oneStar + 2 * result.twoStar + 3 * result.threeStar + 4 * result.fourStar + 5 * result.fiveStar)
                })
            )
        )
    }, [props.update])

    const clickMe = (e) => {
        setRatingChange(!ratingChange)
    }
    return (
        <>
        <div class="d-flex">
            <h1 style={{"marginLeft": "20px", "marginBottom": "0px"}}>Rating</h1>
            <button class={`fa fa-refresh mx-2 btn bg-transparent btn-lg refresh-button`} style={{color: "white"}} onClick={clickMe}></button>
        </div>
            <Rating total={total} average={totalStars / total} oneStar={oneStar} twoStar={twoStar} threeStar={threeStar} fourStar={fourStar} fiveStar={fiveStar} />
        </>
    );
}
