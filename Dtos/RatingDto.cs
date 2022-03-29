namespace AMRP.Dtos
{
    public class RatingDto
    {
        public RatingDto()
        {
            this.oneStar = 0;
            this.twoStar = 0;
            this.threeStar = 0;
            this.fourStar = 0;
            this.fiveStar = 0;
            this.avgRating = 0;
            this.totalRating = 0;
        }
        public int oneStar {get; set;}
        public int twoStar {get; set;}
        public int threeStar {get; set;}
        public int fourStar {get; set;}
        public int fiveStar {get; set;}
        public float avgRating {get; set;}
        public int totalRating {get; set;}
    }
}