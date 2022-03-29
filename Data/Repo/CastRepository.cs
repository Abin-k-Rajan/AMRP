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
        private bool prodEnv = true;
        public CastRepository(DataContext dc)
        {
            this.dc = dc;
            prodEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production" ? true : false;
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


        /// HAVE TO MAKE THIS AN ASYNC FUNCTION 
        //  USING SQL STORED PROCEDURE TO 
        public async Task<IEnumerable<Movies>> GetMoviesForActor(int actorId)
        {
            if (!prodEnv)
            {
                return await dc.movies.FromSqlInterpolated($"EXEC GETMOVIESFORACTORID @actorId = {actorId};").ToListAsync();    
            }
            return await dc.movies.FromSqlInterpolated($"CALL GETMOVIESFORACTORID({actorId});").ToListAsync();
        }

        public async Task<IEnumerable<Movies>> GetMoviesForDirector(int directorId)
        {
            if (!prodEnv)
            {
                return await dc.movies.FromSqlInterpolated($"EXEC GETMOVIESFORDIRECTORID @directorId = {directorId};").ToListAsync();
            }
            return await dc.movies.FromSqlInterpolated($"CALL GETMOVIESFORDIRECTORID({directorId});").ToListAsync();
        }

        public async Task<IEnumerable<Movies>> GetMoviesForProducer(int producerId)
        {
            if (!prodEnv)
            {
                return await dc.movies.FromSqlInterpolated($"EXEC GETMOVIESFORPRODUCERID @producerId = {producerId};").ToListAsync();
            }
            return await dc.movies.FromSqlInterpolated($"CALL GETMOVIESFORPRODUCERID({producerId});").ToListAsync();
        }

        public async Task<IEnumerable<Movies>> GetMoviesForWriter(int writerId)
        {
            if (!prodEnv)
            {
                return await dc.movies.FromSqlInterpolated($"EXEC GETMOVIESFORWRITERID @writerId = {writerId};").ToListAsync();
            }
            return await dc.movies.FromSqlInterpolated($"CALL GETMOVIESFORWRITERID({writerId});").ToListAsync();
        }

        public async Task<IEnumerable<GeneralCount>> GetGeneralCount()
        {
            if (!prodEnv)
            {
                return await dc.GENERALCOUNT.FromSqlInterpolated($"EXEC SELECTGENERALCOUNT;").ToListAsync();
            }
            return await dc.GENERALCOUNT.FromSqlInterpolated($"CALL SELECTGENERALCOUNT();").ToListAsync();
        }
    }
}