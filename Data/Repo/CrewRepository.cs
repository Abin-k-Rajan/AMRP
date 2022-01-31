using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class CrewRepository : ICrewInterface
    {
        private readonly DataContext dc;
        public CrewRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddCrew(Crew crew)
        {
            dc.crew.AddAsync(crew);
        }

        public async Task<IEnumerable<Crew>> GetCrewAsync()
        {
            return await dc.crew.ToListAsync();
        }

        public async Task<Crew> GetCrewByCrewId(int crewId)
        {
            return await dc.crew.FirstAsync(x => x.crewId == crewId);
        }
    }
}