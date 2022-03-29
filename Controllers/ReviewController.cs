using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;
using AMRP.Dtos;
using AutoMapper;
using AMRP.Middlewares;

namespace AMRP.Controllers;

public class ReviewController : BaseController
{
    private readonly IUnitOfWork uow;
    private readonly RatingMiddleware ratingMiddleware;

    public ReviewController(IUnitOfWork uow)
    {
        this.uow = uow;
        this.ratingMiddleware = new RatingMiddleware();
    }

    [HttpGet("{movieId}")]
    public async Task<IActionResult> GetReviews(int movieId)
    {
        var reviews = await uow.ReviewRepository.GetReviewsFromMovieId(movieId);
        return Ok(reviews);
    }
    [HttpGet("{movieId}/{userId}")]
    public async Task<IActionResult> GetActor(int movieId, int userId)
    {
        var reviews = await uow.ReviewRepository.GetReview(userId, movieId);
        return Ok(reviews);
    }
    [HttpPost]
    public async Task<IActionResult> PostReview(Review review)
    {
        review.LastUpdatedOn = DateTime.Now;
        uow.ReviewRepository.PostReview(review);
        await uow.SaveAsync();
        return Ok(review);
    }


    // [HttpPut]
    // public async Task<IActionResult> UpdateReview(Review review)
    // {
    //     var rvw = await uow.ReviewRepository.GetReview(review.userId, review.movieId);
    //     if (rvw == null)
    //     {
    //         uow.ReviewRepository.PostReview(review);
    //     }
    //     else
    //     {
    //         rvw.comment = review.comment;
    //         rvw.rating = review.rating;
    //         rvw.LastUpdatedOn = DateTime.Now;
    //     }
    //     await uow.SaveAsync();
    //     return Ok(review);
    // }

    [HttpGet("check/{userId}/{movieId}")]
    public async Task<IActionResult> GetReviewFromUserIdAndMovieId(int userId, int movieId)
    {
        var rvw = await uow.ReviewRepository.GetReview(userId, movieId);
        if (rvw == null)
        {
            return NotFound();
        }
        return Ok();
    }


    [HttpGet("rating/{movieId}")]
    public async Task<IActionResult> GetRating(int movieId)
    {
        var ratings = await uow.ReviewRepository.GetRatingInfo(movieId);

        RatingDto res = this.ratingMiddleware.getRatingDtoFromIEnumerable(ratings);
        if (res == null)
        {
            return NotFound();
        }
        return Ok(res);
    }

    [HttpGet("ratinginfo/{movieId}")]
    public async Task<IActionResult> GetRatingInfo(int movieId)
    {
        var ratings = await uow.ReviewRepository.GetAvgCountRatingInfor(movieId);
        RatingInfo res = this.ratingMiddleware.getRatingInfoFromIEnumerable(ratings);
        if (res == null)
        {
            return NotFound();
        }
        return Ok(res);
    }


    [HttpDelete("delete/{reviewId}/{userId}")]
    public async Task<IActionResult> DeleteReview(int reviewId, int userId)
    {
        var rvw = await uow.ReviewRepository.GetReviewFromReviewId(reviewId, userId);
        if (rvw == null)
        {
            return NotFound();
        }
        uow.ReviewRepository.RemoveReview(rvw);
        await uow.SaveAsync();
        return Ok();
    }
}