using AMRP.Models;

namespace AMRP.Interfaces
{
    public interface IActorInterface
    {
        Task<IEnumerable<Actor>> GetActorAsync();
        void AddActor(Actor actor);
        Task<Actor> GetActorFromActorId(int id);
    }
}