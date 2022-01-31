using System.Net;
using AMRP.Errors;

namespace AMRP.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IHostEnvironment env;

        public ExceptionMiddleware(RequestDelegate next, IHostEnvironment env)
        {
            this.next = next;
            this.env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try{
                await next(context);
            }
            catch (Exception ex){
                ApiError response;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                string message;
                var exceptionType = ex.GetType();
                
                if (exceptionType == typeof(UnauthorizedAccessException))
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "Error in access";
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Internal server error";
                }

                if (env.IsDevelopment())
                {
                    response = new ApiError((int)statusCode, ex.Message, ex.StackTrace.ToString());
                }
                else{
                    response = new ApiError((int)statusCode, message);
                }
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response.ToString());
            }
        }
    }
}