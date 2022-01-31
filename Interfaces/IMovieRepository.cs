using AMRP.Models;

namespace AMRP.Interfaces
{
    public interface IMovieRepository
    {
        Task<IEnumerable<Movies>> GetMoviesAsync();
        Task<Movies> GetMovieById(int id);
        bool AddMovie(Movies movie);
        void DeleteMovie(int id);
    }
}