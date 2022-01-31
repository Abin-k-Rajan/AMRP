using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Data.Repo
{
    public class WriterRepository : IWriterInterface
    {
        private readonly DataContext dc;
        public WriterRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddWriter(Writer writer)
        {
            dc.writer.AddAsync(writer);
        }

        public async Task<IEnumerable<Writer>> GetWriterAsync()
        {
            return await dc.writer.ToListAsync();
        }

        public async Task<Writer> GetWriterById(int id)
        {
            return await dc.writer.FirstAsync(x => x.writerId == id);
        }
    }
}