using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Models
{
    [Keyless]
    public class Rating
    {
        public int star {get; set;}
        public int starCount {get; set;}
    }
}