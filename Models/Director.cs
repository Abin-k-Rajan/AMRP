using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Director
    {
        [Key]
        public int directorId {get; set;}
        [Required]
        [StringLength(maximumLength: 20)]
        public string name {get; set;}
        [Required]
        [StringLength(maximumLength: 20)]
        public string designation {get; set;}
        public string mediaLink {get; set;}
        public string description {get; set;}
    }
}