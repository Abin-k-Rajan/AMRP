using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class ActorRepository : IActorInterface
    {
        private readonly DataContext dc;
        public ActorRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddActor(Actor actor)
        {
            dc.actors.AddAsync(actor);
        }

        public async Task<IEnumerable<Actor>> GetActorAsync()
        {
            return await dc.actors.ToListAsync();
        }

        public async Task<Actor> GetActorFromActorId(int id)
        {
            return await dc.actors.FirstAsync(x => x.actorId == id);
        }
    }
}