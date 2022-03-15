using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Repository;
using StarApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Infrastructure.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IEmployeeRepository Employee { get; }
        public IAllowanceRepository Allowance { get; }
        public ICompensationRepository Compensation { get; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Employee = new EmployeeRepository(context);
            Allowance = new AllowanceRepository(context);
            Compensation = new CompensationRepository(context);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
