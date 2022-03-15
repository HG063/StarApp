using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Interfaces.Repository
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        IAllowanceRepository Allowance { get; }
        ICompensationRepository Compensation { get; }
        Task Save();
    }
}
