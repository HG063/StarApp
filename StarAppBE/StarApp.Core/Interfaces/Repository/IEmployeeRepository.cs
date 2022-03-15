using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Interfaces.Repository
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<Employee> GetByEmail(string email);
        Task<EmployeePageDto> GetEmployees(EmployeeFilter filter);
        Task<GetEmployeesDto> GetEmployees(int id);
        Task<IEnumerable<string>> GetNames();
        void PostEmployee(PostEmployeesDto employee);
    }
}
