using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class ProducerRepository : IProducerInterface
    {
        private readonly DataContext dc;
        public ProducerRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddProducer(Producer producer)
        {
            dc.producer.AddAsync(producer);
        }

        public async Task<IEnumerable<Producer>> GetProducerAsync()
        {
            return await dc.producer.ToListAsync();
        }

        public async Task<Producer> GetProducerById(int id)
        {
            return await dc.producer.FirstAsync(x => x.producerId == id);
        }
    }
}