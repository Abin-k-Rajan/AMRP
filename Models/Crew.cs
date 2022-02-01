using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Crew
    {
        [Key]
        public int crewId {get; set;}
        public int directorId {get; set;}
        public int producerId {get; set;}
        public int writerId {get; set;}
        [Required]
        [StringLength(maximumLength: 20)]
        public string crewName {get; set;}
    }
}