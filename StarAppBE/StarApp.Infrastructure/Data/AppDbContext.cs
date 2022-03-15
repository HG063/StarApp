using Microsoft.EntityFrameworkCore;
using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Allowance> Allowances { get; set; }
        public DbSet<Compensation> Compensations { get; set; }
    }
}
