using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Interfaces.Service
{
    public interface ITokenService
    {
        string CreateToken(Employee employee);
    }
}
