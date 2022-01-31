using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;

namespace AMRP.Controllers;

[ApiController]
[Route("[controller]")]

public class ActorController : ControllerBase
{
    private readonly IUnitOfWork uow;

    public ActorController(IUnitOfWork uow)
    {
        this.uow = uow;
    }

    [HttpGet]
    public async Task<IActionResult> GetActors()
    {
        var actors = await uow.ActorRepository.GetActorAsync();
        return Ok(actors);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetActor(int id)
    {
        var actor = await uow.ActorRepository.GetActorFromActorId(id);
        if (actor == null)
        {
            return NotFound("Record not found");
        }
        return Ok(actor);
    }
}