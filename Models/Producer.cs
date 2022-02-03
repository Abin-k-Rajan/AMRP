using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Producer
    {
        [Key]
        public int producerId {get; set;}
        [Required]
        [StringLength(maximumLength: 50)]
        public string name {get; set;}
        [Required]
        [StringLength(maximumLength: 50)]
        public string designation {get; set;}
        public string mediaLink {get; set;}
        public string description {get; set;}
    }
}