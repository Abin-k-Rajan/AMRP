using AMRP.Models;
using AMRP.Dtos;

namespace AMRP.Interfaces
{
    public interface ICastInterface
    {
        Task<IEnumerable<Cast>> GetCastAsync();
        void AddCast(Cast cast);
        Task<IEnumerable<Cast>> GetCastFromCrewId(int crewId);
        Task<IEnumerable<object>> GetCastAndActorFromCrewId(int crewId);
        IEnumerable<Movies> GetMoviesForActor(int actorId);
        IEnumerable<Movies> GetMoviesForDirector(int directorId);
        IEnumerable<Movies> GetMoviesForProducer(int producerId);
        IEnumerable<Movies> GetMoviesForWriter(int writerId);
    }
}