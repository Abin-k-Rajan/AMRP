using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;
using AutoMapper;

namespace AMRP.Controllers;

public class ReviewController : BaseController
{
    private readonly IUnitOfWork uow;

    public ReviewController(IUnitOfWork uow)
    {
        this.uow = uow;
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


    [HttpPut]
    public async Task<IActionResult> UpdateReview(Review review)
    {
        var rvw = await uow.ReviewRepository.GetReview(review.userId, review.movieId);
        if (rvw == null)
        {
            uow.ReviewRepository.PostReview(review);
        }
        else
        {
            rvw.comment = review.comment;
            rvw.rating = review.rating;
            rvw.LastUpdatedOn = DateTime.Now;
        }
        await uow.SaveAsync();
        return Ok(review);
    }

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