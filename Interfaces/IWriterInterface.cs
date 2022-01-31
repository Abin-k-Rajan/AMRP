using AMRP.Models;

namespace AMRP.Interfaces
{
    public interface IWriterInterface
    {
        Task<IEnumerable<Writer>> GetWriterAsync();
        void AddWriter(Writer writer);
        Task<Writer> GetWriterById(int id);
    }
}