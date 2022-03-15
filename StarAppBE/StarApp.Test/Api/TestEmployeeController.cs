using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StarApp.Api.Controllers;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Service;
using StarApp.Test.MockData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using static StarApp.Core.Domain.Enums.StatusEnum;

namespace StarApp.Test.Api
{
    public class TestEmployeeController
    {
        Mock<IEmployeeService> _employeeService;
        Mock<IAuthService> _authService;
        public TestEmployeeController()
        {
            _employeeService = new Mock<IEmployeeService>();
            _authService = new Mock<IAuthService>();
        }

        [Fact]
        public async Task GetEmployees_ReturnsStatus200()
        {
            var filter = new EmployeeFilter();
            _employeeService.Setup(_ => _.Get(filter));
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.GetEmployees(filter);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task GetEmployees_ReturnsAllItems()
        {
            var filter = new EmployeeFilter();
            _employeeService.Setup(_ => _.Get(filter)).ReturnsAsync(EmployeePageMockData.GetData());
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.GetEmployees(filter);

            var OkObject = result.Result as OkObjectResult;
            OkObject.Should().NotBeNull();
            var data = OkObject.Value as EmployeePageDto;
            data.employees.Count().Should().Be(3);
        }

        [Fact]
        public async Task GetEmployee_ReturnsStatus200()
        {
            _employeeService.Setup(_ => _.GetById(0)).ReturnsAsync(new GetEmployeesDto());
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.GetEmployee(0);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task GetEmployee_ReturnsStatus400()
        {
            _employeeService.Setup(_ => _.GetById(0)).Returns(Task.FromResult<GetEmployeesDto>(null));
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.GetEmployee(0);

            result.Result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }

        [Fact]
        public async Task PostEmployees_ReturnsStatus200()
        {
            var dto = new PostEmployeesDto();
            _employeeService.Setup(_ => _.Post(dto));
            _employeeService.Setup(_ => _.GetByEmail(String.Empty)).Returns(Task.FromResult<Employee>(null));
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.PostEmployees(dto);

            result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task PostEmployees_ReturnsStatus400()
        {
            var dto = new PostEmployeesDto();
            _employeeService.Setup(_ => _.Post(dto));
            _employeeService.Setup(_ => _.GetByEmail(String.Empty)).ReturnsAsync(new Employee());
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.PostEmployees(dto);

            result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }

        [Fact]
        public async Task PutEmployees_ReturnsStatus200()
        {
            var dto = new GetEmployeesDto();
            _employeeService.Setup(_ => _.Put(0, dto)).ReturnsAsync(true);
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.PutEmployee(0, dto);

            result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task PutEmployees_ReturnsStatus400()
        {
            var dto = new GetEmployeesDto();
            _employeeService.Setup(_ => _.Put(0, dto)).ReturnsAsync(false);
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.PutEmployee(0, dto);

            result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }


        [Fact]
        public async Task DeleteEmployees_ReturnsStatus200()
        {
            var dto = new GetEmployeesDto();
            _employeeService.Setup(_ => _.Delete(0));
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.DeleteEmployee(0);

            result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task UpdateStatus_ReturnsStatus200()
        {
            var dto = new GetEmployeesDto();
            _employeeService.Setup(_ => _.UpdateStatus(0, new Status())).ReturnsAsync(true);
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.UpdateStatus(0, new Status());

            result.GetType().Should().Be(typeof(OkObjectResult));
        }


        [Fact]
        public async Task UpdateStatus_ReturnsStatus400()
        {
            var dto = new GetEmployeesDto();
            _employeeService.Setup(_ => _.UpdateStatus(0, new Status())).ReturnsAsync(false);
            var sut = new EmployeesController(_employeeService.Object, _authService.Object);

            var result = await sut.UpdateStatus(0, new Status());

            result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }
    }
}
