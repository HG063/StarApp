using Microsoft.EntityFrameworkCore;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Repository;
using StarApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Infrastructure.Repository
{
    public class EmployeeRepository: GenericRepository<Employee>, IEmployeeRepository
    {

        public EmployeeRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<EmployeePageDto> GetEmployees(EmployeeFilter filter)
        {
            IQueryable<Employee> employees = _context.Employees;
            if (filter.Status != null)
            {
                employees = employees.Where(x => x.Status == filter.Status);
            }
            if (filter.Role != null)
            {
                employees = employees.Where(x => x.Role == filter.Role);
            }
            if (filter.Name != null)
            {
                employees = employees.Where(x => x.UserName.Contains(filter.Name.ToLower()));
            }
            if (filter.Email != null)
            {
                employees = employees.Where(x => x.Email == filter.Email.ToLower());
            }
            var pageCount = Math.Ceiling(employees.Count() / (float)filter.PageSize);

            var currentEmployees = await employees
                .OrderByDescending(x => x.Id)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .Select(x => new GetEmployeesDto()
                    {
                        Id = x.Id,
                        UserName = x.UserName,
                        Email = x.Email,
                        Role = x.Role,
                        Status = x.Status,
                        ActiveFrom = x.ActiveFrom.ToShortDateString(),
                    }).ToListAsync();

                var response = new EmployeePageDto
                {
                    employees = currentEmployees,
                    CurrentPage = filter.Page,
                    TotalPages = (int)pageCount
                };
                return response;
        }

        public async Task<GetEmployeesDto> GetEmployees(int id)
        {
            var employee = await Get(id);
            if (employee == null) return null;
            var employeeDto = new GetEmployeesDto()
            {
                Id = employee.Id,
                UserName = employee.UserName,
                Email = employee.Email,
                Role = employee.Role,
                Status = employee.Status,
                ActiveFrom = employee.ActiveFrom.ToShortDateString(),
            };

            return employeeDto;
        }

        public void PostEmployee(PostEmployeesDto employeeDto)
        {

            using var hmac = new HMACSHA512();
            var employee = new Employee()
            {
                UserName = employeeDto.UserName.ToLower(),
                Email = employeeDto.Email.ToLower(),
                Role = employeeDto.Role,
                Status = Core.Domain.Enums.StatusEnum.Status.Active,
                ActiveFrom = DateTime.Now,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("starapp@123")),
                PasswordSalt = hmac.Key
            };
            Update(employee);
        }

        public async Task<Employee> GetByEmail(string email)
        {
            var employee =  await _context.Employees.FirstOrDefaultAsync(x => x.Email == email);
            return employee;
        }

        public async Task<IEnumerable<string>> GetNames()
        {
            return await _context.Employees.Select(x => x.UserName).ToListAsync();
        }
    }
}
