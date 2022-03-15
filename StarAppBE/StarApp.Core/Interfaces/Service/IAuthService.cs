using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Interfaces.Service
{
    public interface IAuthService
    {
        bool VarifyPassword(Employee employee, string password);
        (byte[], byte[]) GetPasswordHash(string password);
    }
}
