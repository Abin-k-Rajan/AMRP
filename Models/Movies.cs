using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Movies 
    {
        [Key]
        public int movieId {get; set;}
        [Required]
        [StringLength(maximumLength: 20)]
        public string movieName {get; set;}
        [Required]
        [StringLength(maximumLength: 20)]
        public string genre {get; set;}
        public int crewId {get; set;}
        public string posterLink {get; set;}
        public int year {get; set;}
        public string synopsis {get; set;}
    }
}