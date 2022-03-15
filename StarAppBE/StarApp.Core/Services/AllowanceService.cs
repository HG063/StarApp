using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.DTOs.AllowanceDtos;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Repository;
using StarApp.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Services
{
    public class AllowanceService : IAllowanceService
    {
        private readonly IUnitOfWork _uow;

        public AllowanceService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task<AllowancePageDto> GetAll(AllowanceFilter filter)
        {
            return await _uow.Allowance.GetAllowances(filter);
        }

        public async Task<Allowance> GetById(int id)
        {
            return await _uow.Allowance.Get(id);
        }

        public void Post(Allowance allowance)
        {
            _uow.Allowance.Add(allowance);
            _uow.Save();
        }

        public async Task<bool> Put(int id, Allowance allowance)
        {
            var allowanceData = await _uow.Allowance.Get(id);
            if (allowanceData == null) return false;
            var compensation = new Compensation();
            if (allowanceData.CompensationId != null) compensation = await _uow.Compensation.Get(allowanceData.CompensationId ?? default(int));
            if (allowance.AfternoonShiftDays + allowance.NightShiftDays != allowanceData.ProjectHours / 8 ||
                allowance.DaysEligibleForTA > allowanceData.ProjectHours / 8)
            {
                return false;
            }
            allowanceData.AfternoonShiftDays = allowance.AfternoonShiftDays;
            allowanceData.NightShiftDays = allowance.NightShiftDays;
            allowanceData.DaysEligibleForTA = allowance.DaysEligibleForTA;
            allowanceData.TransportAllowance = allowanceData.DaysEligibleForTA * compensation.TransportCompensation;
            var nightShiftAllowance = allowanceData.NightShiftDays * compensation.NightShiftCompensation;
            var afternoonShiftAllowance = allowanceData.AfternoonShiftDays * compensation.AfternoonShiftCompensation;
            allowanceData.TotalAllowance = afternoonShiftAllowance + allowanceData.TransportAllowance + nightShiftAllowance;
            _uow.Allowance.Update(allowanceData);
            await _uow.Save();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var allowance = await GetById(id);
            if (allowance == null) return false;
            _uow.Allowance.Delete(allowance);
            await _uow.Save();
            return true;
        }

        public async Task<IEnumerable<string>> GetProjects()
        {
            var filter = new AllowanceFilter() ;
            var allowancePage = await _uow.Allowance.GetAllowances(filter);
            return allowancePage.Allowances.DistinctBy(x => x.Project).Select(x => x.Project.Trim()).ToList();
        }

        public async Task<bool> UpdateCompensation(CompensationDto compensationDto)
        {
            var allowances = await _uow.Allowance.GetAllowancesByProject(compensationDto.ProjectName);
            int compensationId = allowances.First().CompensationId ?? -1;
            if (allowances.First().CompensationId == null)
            {
                var compensation = new Compensation()
                {
                    Allowances = allowances.ToList(),
                };
                await _uow.Compensation.Add(compensation);
                await _uow.Save();
                compensationId = compensation.Id;
            }
            if (compensationId == -1) return false;

            var currComp = await _uow.Compensation.Get(compensationId);

            currComp.TransportCompensation = compensationDto.TransportCompensation;
            currComp.AfternoonShiftCompensation = compensationDto.AfternoonShiftCompensation;
            currComp.NightShiftCompensation = compensationDto.NightShiftCompensation;
            _uow.Compensation.Update(currComp);

            foreach(var allowance in allowances)
            {
                allowance.TransportAllowance = allowance.DaysEligibleForTA * currComp.TransportCompensation;
                var nightShiftAllowance = allowance.NightShiftDays * currComp.NightShiftCompensation;
                var afternoonShiftAllowance = allowance.AfternoonShiftDays * currComp.AfternoonShiftCompensation;
                allowance.TotalAllowance = nightShiftAllowance + allowance.TransportAllowance + afternoonShiftAllowance;
                allowance.Compensation = currComp;
            }
            
            allowances.ToList().ForEach(allowance => _uow.Allowance.Update(allowance));
            await _uow.Save();
            return true;
        }

        public async Task<CompensationDto> GetCompensation(string project)
        {
            var allowances = await _uow.Allowance.GetAllowancesByProject(project);
            var compensationId = allowances.First().CompensationId ?? -1;
            var compensationDto = new CompensationDto() { ProjectName = allowances.First().Project};
            if (compensationId == -1) return compensationDto;
            var compensation = await _uow.Compensation.Get(compensationId);
            compensationDto.TransportCompensation = compensation.TransportCompensation;
            compensationDto.AfternoonShiftCompensation = compensation.AfternoonShiftCompensation;
            compensationDto.NightShiftCompensation = compensation.NightShiftCompensation;
            return compensationDto;
        }
    }
}
