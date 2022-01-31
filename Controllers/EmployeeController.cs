using Microsoft.AspNetCore.Mvc;
using AMRP.Data;
using AMRP.Interfaces;
using AMRP.Models;

namespace AMRP.Controllers;

[ApiController]
[Route("[controller]")]

public class EmployeeController : ControllerBase
{
    private readonly IUnitOfWork uow;

    public EmployeeController(IUnitOfWork uow)
    {
        this.uow = uow;
    }

    [HttpGet]
    public async Task<IActionResult> GetEmployees()
    {
        var emp = await uow.EmployeeRepository.GetCitiesAsync();
        return Ok(emp);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddEmployee(Employee emp)
    {
        uow.EmployeeRepository.AddEmployee(emp);
        await uow.SaveAsync();
        return Ok(emp);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        uow.EmployeeRepository.DeleteEmployee(id);
        await uow.SaveAsync();
        return Ok(id);
    }
}