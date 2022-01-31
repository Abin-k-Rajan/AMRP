using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;
using AMRP.Data.Repo;
using AMRP.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace AMRP.Controllers;

public class CrewController : BaseController
{
    private readonly IUnitOfWork uow;
    public CrewController(IUnitOfWork uow)
    {
        this.uow = uow;
    }

    [HttpGet]
    public async Task<IActionResult> GetCrews()
    {
        var crews = await uow.CrewRepository.GetCrewAsync();
        return Ok(crews);
    }
    [HttpGet("actor/{id}")]
    public async Task<IActionResult> GetActor(int id)
    {
        var actor = await uow.ActorRepository.GetActorFromActorId(id);
        if (actor == null)
        {
            return NotFound("Record not found");
        }
        return Ok(actor);
    }

    [HttpGet("director")]
    public async Task<IActionResult> GetDirectors()
    {
        var directors = await uow.DirectorRepository.GetDirectorAsync();
        return Ok(directors);
    }

    [HttpGet("producer")]
    public async Task<IActionResult> GetProducers()
    {
        var producers = await uow.ProducerRepository.GetProducerAsync();
        return Ok(producers);
    }

    [HttpGet("writer")]
    public async Task<IActionResult> GetCrew()
    {
        var writers = await uow.WriterInterface.GetWriterAsync();
        return Ok(writers);
    }

    [HttpPost("director")]
    public async Task<IActionResult> AddDirector(Director director)
    {
        uow.DirectorRepository.AddDirector(director);
        await uow.SaveAsync();
        return Ok(director);
    }


    [HttpPost("producer")]
    public async Task<IActionResult> AddProducer(Producer producer)
    {
        uow.ProducerRepository.AddProducer(producer);
        await uow.SaveAsync();
        return Ok(producer);
    }
    
    [HttpPost("writer")]
    public async Task<IActionResult> AddWriter(Writer writer)
    {
        uow.WriterInterface.AddWriter(writer);
        await uow.SaveAsync();
        return Ok(writer);
    }
    [HttpPost("actor")]
    public async Task<IActionResult> AddActor(Actor actor)
    {
        uow.ActorRepository.AddActor(actor);
        await uow.SaveAsync();
        return Ok(actor);
    }
    [HttpPost("cast")]
    public async Task<IActionResult> AddCast(Cast cast)
    {
        uow.CastRepository.AddCast(cast);
        await uow.SaveAsync();
        return Ok(cast);
    }
    [HttpPost("crew")]
    public async Task<IActionResult> AddCrew(Crew crew)
    {
        uow.CrewRepository.AddCrew(crew);
        await uow.SaveAsync();
        return Ok(crew);
    }


    [HttpGet("character/{id}")]
    public async Task<IActionResult> GetCharacterFromCrew(int id)
    {
        var cast = await uow.CastRepository.GetCastFromCrewId(id);
        return Ok(cast);
    }

    [HttpGet("cast/{id}")]
    public async Task<IActionResult> GetCastFromCrew(int id)
    {
        var cast = await uow.CastRepository.GetCastAndActorFromCrewId(id);
        return Ok(cast);
    }

    [HttpGet("crew/{id}")]
    public async Task<IActionResult> GetCrewById(int id)
    {
        var crew = await uow.CrewRepository.GetCrewByCrewId(id);
        return Ok(crew);
    }

    [HttpGet("producer/{id}")]
    public async Task<IActionResult> GetProducerById(int id)
    {
        var producer= await uow.ProducerRepository.GetProducerById(id);
        return Ok(producer);
    }
    [HttpGet("director/{id}")]
    public async Task<IActionResult> GetDirectorById(int id)
    {
        var director= await uow.DirectorRepository.GetDirectorById(id);
        return Ok(director);
    }
    [HttpGet("writer/{id}")]
    public async Task<IActionResult> GetWriterById(int id)
    {
        var writer= await uow.WriterInterface.GetWriterById(id);
        return Ok(writer);
    }


    [HttpGet("actorinmovies/{id}")]
    public IActionResult GetMoviesByActorId(int id)
    {
        var res = uow.CastRepository.GetMoviesForActor(id);
        return Ok(res);
    }

    [HttpGet("directorinmovies/{id}")]
    public IActionResult GetMoviesByDirectorId(int id)
    {
        var res = uow.CastRepository.GetMoviesForDirector(id);
        return Ok(res);
    }

    [HttpGet("producerinmovies/{id}")]
    public IActionResult GetMoviesByProducerId(int id)
    {
        var res = uow.CastRepository.GetMoviesForProducer(id);
        return Ok(res);
    }

    [HttpGet("writerinmovies/{id}")]
    public IActionResult GetMoviesByWriterId(int id)
    {
        var res = uow.CastRepository.GetMoviesForWriter(id);
        return Ok(res);
    }
}