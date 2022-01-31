using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class DirectorRepository : IDirectorInterface
    {
        private readonly DataContext dc;
        public DirectorRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddDirector(Director director)
        {
            dc.director.AddAsync(director);
        }

        public async Task<IEnumerable<Director>> GetDirectorAsync()
        {
            return await dc.director.ToListAsync();
        }

        public async Task<Director> GetDirectorById(int id)
        {
            return await dc.director.FirstAsync(x => x.directorId == id);
        }
    }
}