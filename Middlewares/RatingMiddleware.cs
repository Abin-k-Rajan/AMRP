using System.Net;
using AMRP.Errors;
using AMRP.Dtos;
using AMRP.Models;

namespace AMRP.Middlewares
{
    public class RatingMiddleware
    {
        public RatingDto getRatingDtoFromIEnumerable(IEnumerable<Rating> ratings)
    {
        RatingDto dto = new RatingDto();
        foreach (Rating x in ratings)
        {
            switch (x.star) {
                case 1: dto.oneStar = x.starCount;
                        break;
                case 2: dto.twoStar = x.starCount;
                        break;
                case 3: dto.threeStar = x.starCount;
                        break;
                case 4: dto.fourStar = x.starCount;
                        break;
                case 5: dto.fiveStar = x.starCount;
                        break;
                default: break;
            }
        }
    
        return dto;
    }


    public RatingInfo getRatingInfoFromIEnumerable(IEnumerable<RatingInfo> ratings)
    {
        RatingInfo dto = new RatingInfo();
        foreach (RatingInfo x in ratings)
        {
            dto.average = 0;
            dto.totalRating = x.totalRating;
        }
    
        return dto;
    }
    }
}