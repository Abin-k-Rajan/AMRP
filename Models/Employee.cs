using System.ComponentModel.DataAnnotations;


namespace AMRP.Models
{
    public class Employee
    {
        [Key]
        public int Id {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
    }
}