using AMRP.Interfaces;
using AMRP.Data.Repo;

namespace AMRP.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;
        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }

        public IMovieRepository MovieRepository => new MovieRepository(dc);

        public IActorInterface ActorRepository => new ActorRepository(dc);

        public ICastInterface CastRepository => new CastRepository(dc);

        public ICrewInterface CrewRepository => new CrewRepository(dc);

        public IDirectorInterface DirectorRepository => new DirectorRepository(dc);

        public IProducerInterface ProducerRepository => new ProducerRepository(dc);

        public IReviewInterface ReviewRepository => new ReviewRepository(dc);

        public IUserInterface UserRepository => new UserRepository(dc);

        public IWriterInterface WriterInterface => new WriterRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}