using AMRP.Models;
using AMRP.Dtos;

namespace AMRP.Interfaces
{
    public interface IUserInterface
    {
        Task<IEnumerable<User>> GetUserAsync();
        Task<User> Authenticate(string email, string password);
        void Register(RegisterDto registerDto);
        Task<bool> UserAlreadyExists(string userName, string email);
    }
}