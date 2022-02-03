using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class User
    {
        [Key]
        public int userId {get; set;}
        [Required]
        [StringLength(maximumLength: 50)]
        public string email {get; set;}
        [Required]
        [StringLength(maximumLength: 50)]
        public string name {get; set;}
        [Required]
        public byte[] password {get; set;}
        public byte[] passwordKey {get; set;}

    }
}