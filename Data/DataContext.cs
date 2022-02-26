using AMRP.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AMRP.Data
{
    public class DataContext : DbContext
    {
        public DataContext() {
            
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Movies> movies {get; set;}
        public DbSet<Actor> actors {get; set;}
        public DbSet<Cast> casts {get; set;}
        public DbSet<Director> director {get; set;}
        public DbSet<Producer> producer {get; set;}
        public DbSet<Review> review {get; set;}
        public DbSet<User> user {get; set;}
        public DbSet<Writer> writer {get; set;}
        public DbSet<Crew> crew {get; set;}
        public DbSet<GeneralCount> GENERALCOUNT {get; set;}

    }
}