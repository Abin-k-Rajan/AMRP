using AMRP.Models;

namespace AMRP.Interfaces
{
    public interface IDirectorInterface
    {
        Task<IEnumerable<Director>> GetDirectorAsync();
        void AddDirector(Director director);
        Task<Director> GetDirectorById(int id);
    }
}