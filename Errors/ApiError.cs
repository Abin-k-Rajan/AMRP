using System.Text.Json;

namespace AMRP.Errors
{
    public class ApiError
    {
        public ApiError(int errorCode, string errorMessage, string errorDetails = "")
        {
            this.errorCode = errorCode;
            this.errorMessage = errorMessage;
            this.errorDetails = errorDetails;
        }

        public int errorCode {get; set;}
        public string errorMessage {get; set;}
        public string errorDetails {get; set;}
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}