using Microsoft.EntityFrameworkCore;

namespace AMRP.Models
{
    [Keyless]
    public class GeneralCount
    {
        public int NOMOVIES {get; set;}
        public int NOACTORS {get; set;}
        public int NODIRECTORS {get; set;}
        public int NOPRODUCERS {get; set;}
        public int NOWRITERS {get; set;}
    }
}