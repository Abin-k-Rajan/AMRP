using AMRP.Models;
using AMRP.Dtos;

namespace AMRP.Interfaces
{
    public interface IReviewInterface
    {
        Task<IEnumerable<Review>> GetReviewAsync();
        void PostReview(Review review);
        Task<IEnumerable<Review>> GetReviewsFromMovieId(int movieId);
        Task<IEnumerable<Review>> GetReviewsFromMovieIdAndUserId(int movieId, int userId);
        Task<Review> GetReview(int userId, int movieId);
        Task<Review> GetReviewFromReviewId(int reviewId, int userId);
        void RemoveReview(Review review);

        Task<IEnumerable<Rating>> GetRatingInfo(int movieId);
        Task<IEnumerable<RatingInfo>> GetAvgCountRatingInfor(int movieId);
    }
}