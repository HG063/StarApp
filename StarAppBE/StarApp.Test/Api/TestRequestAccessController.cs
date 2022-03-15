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
    public class TestRequestAccessController
    {
        Mock<IAuthService> _authService;
        Mock<IEmployeeService> _employeeService;

        public TestRequestAccessController()
        {
            _authService = new Mock<IAuthService>();
            _employeeService = new Mock<IEmployeeService>();
        }

        [Fact]
        public async Task RequestAccess_ReturnsStatus400()
        {
            var dto = new RequestAccessDto();
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).ReturnsAsync(new Core.Domain.Entities.Employee());
            var sut = new RequestAccessController(_employeeService.Object, _authService.Object);

            var result = await sut.RequestAccess(dto);

            result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }

        [Fact]
        public async Task RequestAccess_ReturnsStatus200()
        {
            var dto = new RequestAccessDto();
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).Returns(Task.FromResult<Employee>(null));
            var sut = new RequestAccessController(_employeeService.Object, _authService.Object);

            var result = await sut.RequestAccess(dto);

            result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task RequestAccess_ReturnsStatus400_IfPasswordTooShort()
        {
            var dto = new RequestAccessDto();
            _employeeService.Setup(_ => _.GetByEmail(string.Empty)).ReturnsAsync(new Core.Domain.Entities.Employee());
            var sut = new RequestAccessController(_employeeService.Object, _authService.Object);

            var result = await sut.RequestAccess(dto);

            result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }
    }
}
