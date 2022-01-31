using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Movies 
    {
        [Key]
        public int movieId {get; set;}
        public string movieName {get; set;}
        public string genre {get; set;}
        public int crewId {get; set;}
        public string posterLink {get; set;}
        public int year {get; set;}
        public string synopsis {get; set;}
    }
}