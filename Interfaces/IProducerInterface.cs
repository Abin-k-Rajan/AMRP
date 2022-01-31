using AMRP.Models;

namespace AMRP.Interfaces
{
    public interface IProducerInterface
    {
        Task<IEnumerable<Producer>> GetProducerAsync();
        void AddProducer(Producer producer);
        Task<Producer> GetProducerById(int id);
    }
}