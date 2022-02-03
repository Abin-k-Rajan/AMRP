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
        Task<IEnumerable<Movies>> GetMoviesForActor(int actorId);
        Task<IEnumerable<Movies>> GetMoviesForDirector(int directorId);
        Task<IEnumerable<Movies>> GetMoviesForProducer(int producerId);
        Task<IEnumerable<Movies>> GetMoviesForWriter(int writerId);
        Task<IEnumerable<GeneralCount>> GetGeneralCount();
    }
}