using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class MovieRepository : IMovieRepository
    {
        private readonly DataContext dc;
        public MovieRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public bool AddMovie(Movies movie)
        {
            try
            {
                dc.movies.AddAsync(movie);
                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error");
            }
            return false;
        }

        public void DeleteMovie(int id)
        {
            var movie = dc.movies.Find(id);
            if (movie != null)
                dc.movies.Remove(movie);    
        }

        public async Task<Movies> GetMovieById(int id)
        {
            return await dc.movies.FirstAsync(x => x.movieId == id);
        }

        public async Task<IEnumerable<Movies>> GetMoviesAsync()
        {
            return await dc.movies.ToListAsync();
        }
    }
}