using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;
using AMRP.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace AMRP.Controllers;
[Authorize]
public class AccountController : BaseController
{
    private readonly IUnitOfWork uow;
    private readonly IConfiguration configuration;

    public AccountController(IUnitOfWork uow, IConfiguration configuration)
    {
        this.uow = uow;
        this.configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetActors()
    {
        var actors = await uow.ActorRepository.GetActorAsync();
        return Ok(actors);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginReqDto loginReq)
    {
        var user = await uow.UserRepository.Authenticate(loginReq.email, loginReq.password);
        if (user == null)
        {
            return Unauthorized();
        }
        LoginResDto loginRes = new LoginResDto();
        loginRes.userName = user.name;
        loginRes.userId = user.userId;
        loginRes.token = CreateJWT(user);
        return Ok(loginRes);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterDto register)
    {
        if (await uow.UserRepository.UserAlreadyExists(register.userName, register.email))
        {
            return BadRequest("Email already exists");
        }
        uow.UserRepository.Register(register);
        await uow.SaveAsync();
        return StatusCode(201);
    }

    private string CreateJWT(User user)
    {
        var secretKey = configuration.GetSection("AppSettings:Key").Value;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var claims = new Claim[] {
            new Claim(ClaimTypes.Name, user.name),
            new Claim(ClaimTypes.NameIdentifier, user.userId.ToString())
        };

        var signingCredetials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(10),
            SigningCredentials = signingCredetials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}