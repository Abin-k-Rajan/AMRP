using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Cast
    {
        [Key]
        public int castId {get; set;}
        public int crewId {get; set;}
        public int actorId {get; set;}
        public string description {get; set;}
        public string character {get; set;}
    }
}