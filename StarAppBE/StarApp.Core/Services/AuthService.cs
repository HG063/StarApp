using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Services
{
    public class AuthService : IAuthService
    {
        public (byte[], byte[]) GetPasswordHash(string password)
        {
            using var hmac = new HMACSHA512();
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            var passwordSalt = hmac.Key;
            return (passwordHash, passwordSalt);
        }

        public bool VarifyPassword(Employee employee, string password)
        {
            using var hmac = new HMACSHA512(employee.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != employee.PasswordHash[i]) return false;
            }
            return true;

        }
    }
}
