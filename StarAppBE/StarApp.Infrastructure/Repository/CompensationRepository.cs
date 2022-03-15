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
    public class CompensationRepository : GenericRepository<Compensation>, ICompensationRepository
    {
        public CompensationRepository(AppDbContext context) : base(context)
        {
        }
    }
}
