using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Review 
    {
        [Key]
        public int id {get; set;}
        public int movieId {get; set;}
        public int userId {get; set;}
        public string userName {get; set;}
        public string comment {get; set;}
        public int rating {get; set;}
        public DateTime LastUpdatedOn {get; set;}
    }
}