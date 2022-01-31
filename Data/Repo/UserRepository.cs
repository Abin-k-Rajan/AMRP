using AMRP.Models;
using AMRP.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using AMRP.Dtos;

namespace AMRP.Data.Repo
{
    public class UserRepository : IUserInterface
    {
        private readonly DataContext dc;
        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<User> Authenticate(string email, string passwordText)
        {
            var user = await dc.user.FirstOrDefaultAsync(x => x.email == email);
            if (user == null)
                return null;
            if (!MatchPasswordHash(passwordText, user.password, user.passwordKey))
            {
                return null;
            }
            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        public async Task<IEnumerable<User>> GetUserAsync()
        {
            return await dc.user.ToListAsync();
        }

        public void Register(RegisterDto registerDto)
        {
            byte[] passwordHash, passwordKey;
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.password));
            }
            User user = new User();
            user.email = registerDto.email;
            user.name = registerDto.userName;
            user.password = passwordHash;
            user.passwordKey = passwordKey;
            dc.user.AddAsync(user);
        }

        public async Task<bool> UserAlreadyExists(string userName, string email)
        {
            return await dc.user.AnyAsync(x => x.name == userName || x.email == email);
        }

    }
}