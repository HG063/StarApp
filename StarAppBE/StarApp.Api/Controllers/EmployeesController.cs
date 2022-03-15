using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.DTOs.Employee;
using StarApp.Core.Interfaces.Service;
using static StarApp.Core.Domain.Enums.StatusEnum;

namespace StarApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IAuthService _authService;

        public EmployeesController(IEmployeeService employeeService, IAuthService authService)
        {
            _employeeService = employeeService;
            _authService = authService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<EmployeePageDto>> GetEmployees([FromQuery]EmployeeFilter employeeFilter)
        {
            return Ok(await _employeeService.Get(employeeFilter));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetEmployeesDto>> GetEmployee(int id)
        {
            var employee = await _employeeService.GetById(id);
            if (employee == null) return BadRequest("This id does not exist");
            return Ok(employee);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> PostEmployees(PostEmployeesDto postEmployeesDto)
        {
            if (await employeeAleadyExist(postEmployeesDto.Email)) return BadRequest("This User Name is already taken.");
            _employeeService.Post(postEmployeesDto);
            return Ok("Data updated successfully");
        }

        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword(EmployeePasswordDto passwordDto)
        {
            var employee = await _employeeService.GetEmployeeEntity(passwordDto.Id);
            if (employee == null) return BadRequest("This Id does not exist");
            if (!_authService.VarifyPassword(employee, passwordDto.OldPassword)) return BadRequest("Old password is incorrect");
            var (passwordHash, passwordSalt) = _authService.GetPasswordHash(passwordDto.NewPassword);
            employee.PasswordSalt = passwordSalt;
            employee.PasswordHash = passwordHash;
            _employeeService.Update(employee);
            return Ok("Password Updated Successfully");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutEmployee(int id, GetEmployeesDto employeeDto)
        {
            if (!await _employeeService.Put(id, employeeDto)) return BadRequest("This Id does not exist");
            return Ok("Data updated successfully");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/Status/{status}")]
        public async Task<ActionResult> UpdateStatus(int id, Status status)
        {
            var isUpdated = await _employeeService.UpdateStatus(id, status);
            if (!isUpdated) return BadRequest("Id not found");
            return Ok($"Status updated to {status.ToString()}");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            await _employeeService.Delete(id);
            return Ok("Data deleted successfully");
        }

        private async Task<bool> employeeAleadyExist(string email)
        {
            var employee = await _employeeService.GetByEmail(email);
            return employee != null;
        }
    }
}
