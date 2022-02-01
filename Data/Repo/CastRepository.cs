using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;
using AMRP.Dtos;
using System.Data.Entity.Core.Objects;

namespace AMRP.Data.Repo
{
    public class CastRepository : ICastInterface
    {
        private readonly DataContext dc;
        public CastRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddCast(Cast cast)
        {
            dc.casts.AddAsync(cast);
        }

        public async Task<IEnumerable<object>> GetCastAndActorFromCrewId(int crewId)
        {
            return await dc.casts.Where(x => x.crewId == crewId).Join(
                dc.actors,
                cast => cast.actorId,
                actor => actor.actorId,
                (cast, actor) => new
                {
                    actorId = actor.actorId,
                    name = actor.name,
                    designation = actor.designation,
                    mediaLink = actor.mediaLink,
                    description = cast.description,
                    character = cast.character
                }
            ).ToListAsync();
        }



        public async Task<IEnumerable<Cast>> GetCastAsync()
        {
            return await dc.casts.ToListAsync<Cast>();
        }

        public async Task<IEnumerable<Cast>> GetCastFromCrewId(int crewId)
        {
            return await dc.casts.Where(x => x.crewId == crewId).ToListAsync();
        }

        private List<Movies> GetMoviesForCrew(List<int> crew)
        {
            return dc.movies.Where(x => crew.Contains(x.crewId)).ToList();
        }


        /// HAVE TO MAKE THIS AN ASYNC FUNCTION 
        public IEnumerable<Movies> GetMoviesForActor(int actorId)
        {
            var list = dc.casts.Where(x => x.actorId == actorId).Select(m => m.crewId).Distinct().ToList();
            return GetMoviesForCrew(list);
        }

        public IEnumerable<Movies> GetMoviesForDirector(int directorId)
        {
            var list = dc.crew.Where(x => x.directorId == directorId).Select(m => m.crewId).ToList();
            return GetMoviesForCrew(list);
        }

        public IEnumerable<Movies> GetMoviesForProducer(int producerId)
        {
            var list = dc.crew.Where(x => x.producerId == producerId).Select(m => m.crewId).ToList();
            return GetMoviesForCrew(list);
        }

        public IEnumerable<Movies> GetMoviesForWriter(int writerId)
        {
            var list = dc.crew.Where(x => x.writerId == writerId).Select(m => m.crewId).ToList();
            return GetMoviesForCrew(list);
        }
    }
}