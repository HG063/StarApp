using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Repository;
using StarApp.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StarApp.Core.Domain.Enums.StatusEnum;

namespace StarApp.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork _uow;

        public EmployeeService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<EmployeePageDto> Get(EmployeeFilter filter)
        {
            return await _uow.Employee.GetEmployees(filter);
        }

        public async Task<GetEmployeesDto> GetById(int id)
        {
            return await _uow.Employee.GetEmployees(id);
        }

        public async Task<IEnumerable<string>> GetNames()
        {
            return await _uow.Employee.GetNames();
        }

        public void Post(PostEmployeesDto postEmployeesDto)
        {
            _uow.Employee.PostEmployee(postEmployeesDto);
            _uow.Save();
        }

        public async Task<bool> Put(int id, GetEmployeesDto getEmployeesDto)
        {
            var employee = await _uow.Employee.Get(id);
            if (employee == null) return false;
            employee.Status = getEmployeesDto.Status;
            employee.UserName = getEmployeesDto.UserName;
            employee.Role = getEmployeesDto.Role;
            _uow.Employee.Update(employee);
            await _uow.Save();
            return true;
        }

        public async Task<bool> UpdateStatus(int id, Status status)
        {
            var employee = await _uow.Employee.Get(id);
            if (employee == null) return false;
            employee.Status = status;
            _uow.Employee.Update(employee);
            await _uow.Save();
            return true;
        }
        public async Task Delete(int id)
        {
            var employee = await _uow.Employee.Get(id);
            _uow.Employee.Delete(employee);
            await _uow.Save();
        }

        public void Add(Employee employee)
        {
            _uow.Employee.Add(employee);
            _uow.Save();
        }

        public void Update(Employee employee)
        {
            _uow.Employee.Update(employee);
            _uow.Save();
        }

        public async Task<Employee> GetByEmail(string email)
        {
            return await _uow.Employee.GetByEmail(email);
        }

        public async Task<Employee> GetEmployeeEntity(int id)
        {
            return await _uow.Employee.Get(id);
        }
    }
}
