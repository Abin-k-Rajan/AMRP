using System.Collections.Generic;
using System.Threading.Tasks;
using AMRP.Models;


namespace AMRP.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetCitiesAsync();
        void AddEmployee(Employee emp);
        void DeleteEmployee(int id);
    }
}