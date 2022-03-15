using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StarApp.Core.Domain.Enums.StatusEnum;

namespace StarApp.Core.Interfaces.Service
{
    public interface IEmployeeService
    {
        Task<EmployeePageDto> Get(EmployeeFilter filter);
        Task<GetEmployeesDto> GetById(int id);
        Task<IEnumerable<string>> GetNames();
        void Post(PostEmployeesDto postEmployeesDto);
        Task<bool> Put(int id, GetEmployeesDto getEmployeesDto);
        Task<bool> UpdateStatus(int id, Status status);
        Task Delete(int id);
        Task<Employee> GetByEmail(string email);
        void Add(Employee employee);
        Task<Employee> GetEmployeeEntity(int id);
        void Update(Employee employee);
    }
}
