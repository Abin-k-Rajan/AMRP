using System.ComponentModel.DataAnnotations;

namespace AMRP.Models
{
    public class Director
    {
        [Key]
        public int directorId {get; set;}
        public string name {get; set;}
        public string designation {get; set;}
        public string address {get; set;}
        public string mediaLink {get; set;}
        public string description {get; set;}
    }
}