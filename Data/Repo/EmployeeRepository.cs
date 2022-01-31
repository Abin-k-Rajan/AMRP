using AMRP.Models;
using Microsoft.EntityFrameworkCore;
using AMRP.Interfaces;

namespace AMRP.Data.Repo
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext dc;
        public EmployeeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<Employee>> GetCitiesAsync()
        {
            return await dc.Employees.ToListAsync();
        }
        public void AddEmployee(Employee emp)
        {
            dc.Employees.AddAsync(emp);
        }
        public void DeleteEmployee(int id) 
        {
            var emp = dc.Employees.Find(id);
            if (emp != null)
                dc.Employees.Remove(emp);
        }
    }
}