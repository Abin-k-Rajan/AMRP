using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AMRP.Models
{
    [Keyless]
    public class RatingInfo
    {
        public int average {get; set;}
        public int totalRating {get; set;}
    }
}