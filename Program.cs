using AMRP.Data;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;
using AMRP.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Default");

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<DataContext>(options => 
    {
        options.UseSqlServer(connectionString);
    });
}
else
{
    connectionString = Environment.GetEnvironmentVariable("ASPNET_DBCONNECTION");
    builder.Services.AddDbContext<DataContext>(options => 
    {
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });
}

builder.Services.AddControllers();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

var secretKey = builder.Configuration.GetSection("AppSettings:Key").Value;
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt => {
        opt.TokenValidationParameters = new TokenValidationParameters{
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = key
        };
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//app.ConfigureExceptionHandler(app.Environment);
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
