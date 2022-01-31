using AMRP.Models;

namespace AMRP.Interfaces
{
    public interface ICrewInterface
    {
        Task<IEnumerable<Crew>> GetCrewAsync();
        void AddCrew(Crew crew);
        Task<Crew> GetCrewByCrewId(int crewId);
    }
}