using Microsoft.EntityFrameworkCore;
using StarApp.Core.Domain.DTOs;
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
    public class AllowanceRepository : GenericRepository<Allowance>, IAllowanceRepository
    {

        public AllowanceRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<AllowancePageDto> GetAllowances(AllowanceFilter filter)
        {
            IQueryable<Allowance> allowance = _context.Allowances;
            if (filter.Name != null)
            {
                allowance = allowance.Where(x => x.Name.Contains(filter.Name));
            }
            if (filter.Project != null)
            {
                allowance = allowance.Where(x => x.Project.Contains(filter.Project));
            }
            if (filter.Month != null)
            {
                allowance = allowance.Where(x => x.PeriodStart.Contains($"-{filter.Month}-") || 
                    x.PeriodEnd.Contains($"-{filter.Month}-"));
            }
            if (filter.Year != null)
            {
                allowance = allowance.Where(x => x.PeriodStart.EndsWith($"-{filter.Year}") || 
                    x.PeriodEnd.EndsWith($"-{filter.Year}"));
            }
            //if (filter.OrderBy != null)
            //{
            //    allowance = allowance.OrderBy(x => x.)
            //}
            var pageCount = Math.Ceiling(allowance.Count() / (float)filter.PageSize);

            var currentAllowance = await allowance
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .Select(x => new Allowance
                {
                    SapId = x.SapId,
                    Name = x.Name,
                    Project = x.Project,
                    AfternoonShiftDays = x.AfternoonShiftDays,
                    DaysEligibleForTA = x.DaysEligibleForTA,
                    HolidayHours = x.HolidayHours,
                    Id = x.Id,
                    NightShiftDays = x.NightShiftDays,
                    PeriodEnd = x.PeriodEnd,
                    PeriodStart = x.PeriodStart,
                    ProjectHours = x.ProjectHours,
                    TotalAllowance = x.TotalAllowance,
                    TransportAllowance = x.TransportAllowance,
                }).ToListAsync();

            var response = new AllowancePageDto
            {
                Allowances = currentAllowance,
                CurrentPage = filter.Page,
                TotalPages = (int)pageCount
            };
            return response;
        }

        public async Task<IEnumerable<Allowance>> GetAllowancesByName(string name)
        {
            return await _context.Allowances
                .Where(x => x.Name.ToLower().Trim() == name.ToLower().Trim())
                .ToListAsync();
        }

        public async Task<IEnumerable<Allowance>> GetAllowancesByProject(string project)
        {
            return await _context.Allowances
                .Where(x => x.Project.ToLower().Trim() == project.ToLower().Trim())
                .ToListAsync();
        }
    }
}
