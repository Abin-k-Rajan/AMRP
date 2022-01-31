import React from "react";
import { Component } from "react/cjs/react.production.min";


class ImageCarousel extends Component {
    
    render() {
    return (
        <>
        <div className="container h-100 mt-5">
        <div
        id="carouselBasicExample"
        class="carousel slide"
        data-bs-ride="carousel"
        >
        
        
        <div class="carousel-inner">
        {
            this.props.images.map((image, index) => (
				<div className={`carousel-item${index === 0 ? ' active': ''}`}>
					<img className='d-block w-100' src={image.url} alt='movie'></img>
					<div class="carousel-caption d-none d-md-block">
                    <p>
                    {image.snippet}
                    </p>
                </div>
				</div>
            ))
        }
        </div>
        <button data-bs-target="#carouselBasicExample"
            class="carousel-control-prev"
            type="button"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button data-bs-target="#carouselBasicExample"
            class="carousel-control-next"
            type="button"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
        </div>
        
        </>
    );
    }
}


export default ImageCarousel;