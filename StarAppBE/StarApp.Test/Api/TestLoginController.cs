using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StarApp.Api.Controllers;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace StarApp.Test.Api
{
    public class TestLoginController
    {
        Mock<ITokenService> _tokenService;
        Mock<IAuthService> _authService;
        Mock<IEmployeeService> _employeeService;

        public TestLoginController()
        {
            _authService = new Mock<IAuthService>();
            _employeeService = new Mock<IEmployeeService>();
            _tokenService = new Mock<ITokenService>();
        }

        [Fact]
        public async Task Login_ReturnsStatus404()
        {
            var dto = new LoginDto();
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).Returns(Task.FromResult<Employee>(null));
            var sut = new LoginController(_tokenService.Object, _employeeService.Object, _authService.Object);

            var result = await sut.Login(dto);

            result.Result.GetType().Should().Be(typeof(NotFoundObjectResult));
        }

        [Fact]
        public async Task Login_ReturnsStatus401()
        {
            var dto = new LoginDto();
            var employee = new Employee() { Status = Core.Domain.Enums.StatusEnum.Status.Requested };
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).ReturnsAsync(employee);
            var sut = new LoginController(_tokenService.Object, _employeeService.Object, _authService.Object);

            var result = await sut.Login(dto);

            result.Result.GetType().Should().Be(typeof(UnauthorizedObjectResult));
        }

        [Fact]
        public async Task Login_ReturnsStatus401_IfWrongPassword()
        {
            var dto = new LoginDto();
            var employee = new Employee();
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).ReturnsAsync(employee);
            _authService.Setup(_ => _.VarifyPassword(employee, string.Empty)).Returns(false);
            var sut = new LoginController(_tokenService.Object, _employeeService.Object, _authService.Object);

            var result = await sut.Login(dto);

            result.Result.GetType().Should().Be(typeof(UnauthorizedObjectResult));
        }

        [Fact]
        public async Task Login_ReturnsStatus200()
        {
            var dto = new LoginDto();
            var employee = new Employee();
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).ReturnsAsync(employee);
            _authService.Setup(_ => _.VarifyPassword(employee, string.Empty)).Returns(true);
            var sut = new LoginController(_tokenService.Object, _employeeService.Object, _authService.Object);

            var result = await sut.Login(dto);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }
    }
}
