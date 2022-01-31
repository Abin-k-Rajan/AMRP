using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class ReviewRepository : IReviewInterface
    {
        private readonly DataContext dc;
        public ReviewRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<Review> GetReview(int userId, int movieId)
        {
            return await dc.review.FirstAsync(x => x.userId == userId && x.movieId == movieId);
        }

        public async Task<IEnumerable<Review>> GetReviewAsync()
        {
            return await dc.review.ToListAsync();
        }

        public async Task<Review> GetReviewFromReviewId(int reviewId, int userId)
        {
            return await dc.review.Where(x => x.id == reviewId && x.userId == userId).SingleAsync<Review>();
        }

        public async Task<IEnumerable<Review>> GetReviewsFromMovieId(int movieId)
        {
            return await dc.review.Where(x => x.movieId == movieId).OrderByDescending(
                x => x.LastUpdatedOn
            ).ToListAsync();
        }

        public async Task<IEnumerable<Review>> GetReviewsFromMovieIdAndUserId(int movieId, int userId)
        {
            return await dc.review.Where(x => x.movieId == movieId && x.userId == userId).ToListAsync();
        }

        public void PostReview(Review review)
        {
            dc.review.AddAsync(review);
        }

        public void RemoveReview(Review review)
        {
            dc.review.Remove(review);
        }
    }
}