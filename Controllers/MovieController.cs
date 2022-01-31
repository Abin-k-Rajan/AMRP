using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;
using Microsoft.AspNetCore.Authorization;

namespace AMRP.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class MovieController : ControllerBase
{
    private readonly IUnitOfWork uow;

    public MovieController(IUnitOfWork uow)
    {
        this.uow = uow;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetMovies()
    {
        var movies = await uow.MovieRepository.GetMoviesAsync();
        return Ok(movies);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetMovieById(int id)
    {
        var movie = await uow.MovieRepository.GetMovieById(id);
        return Ok(movie);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddMovie(Movies movie)
    {
        bool res = uow.MovieRepository.AddMovie(movie);
        await uow.SaveAsync();
        return Ok(movie);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        uow.MovieRepository.DeleteMovie(id);
        await uow.SaveAsync();
        return Ok(id);
    }
}