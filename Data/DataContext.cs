using Microsoft.EntityFrameworkCore;
using AMRP.Models;
using AMRP.Dtos;

namespace AMRP.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Employee> Employees {get; set;}
        public DbSet<Movies> movies {get; set;}
        public DbSet<Actor> actors {get; set;}
        public DbSet<Cast> casts {get; set;}
        public DbSet<Director> director {get; set;}
        public DbSet<Producer> producer {get; set;}
        public DbSet<Review> review {get; set;}
        public DbSet<User> user {get; set;}
        public DbSet<Writer> writer {get; set;}
        public DbSet<Crew> crew {get; set;}
    }
}