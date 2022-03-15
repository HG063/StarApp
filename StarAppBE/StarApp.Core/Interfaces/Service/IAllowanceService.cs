using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.DTOs.AllowanceDtos;
using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Interfaces.Service
{
    public interface IAllowanceService
    {
        Task<AllowancePageDto> GetAll(AllowanceFilter filter);
        Task<Allowance> GetById(int id);
        Task<IEnumerable<string>> GetProjects();
        void Post(Allowance allowance);
        Task<bool> Put(int id, Allowance allowance);
        Task<bool> Delete(int id);
        Task<CompensationDto> GetCompensation(string name);
        Task<bool> UpdateCompensation(CompensationDto compensationDto);
    }
}
