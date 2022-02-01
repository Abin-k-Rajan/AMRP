using System.Threading.Tasks;

namespace AMRP.Interfaces
{
    public interface IUnitOfWork
    {
        IMovieRepository MovieRepository {get;}
        IActorInterface ActorRepository {get;}
        ICastInterface CastRepository {get;}
        ICrewInterface CrewRepository {get;}
        IDirectorInterface DirectorRepository {get;}
        IProducerInterface ProducerRepository {get;}
        IReviewInterface ReviewRepository {get;}
        IUserInterface UserRepository {get;}
        IWriterInterface WriterInterface {get;}
        Task<bool> SaveAsync();
    }
}