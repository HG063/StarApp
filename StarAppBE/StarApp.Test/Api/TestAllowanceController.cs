using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StarApp.Api.Controllers;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.DTOs.AllowanceDtos;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Service;
using StarApp.Test.MockData;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace StarApp.Test.Api
{
    public class TestAllowanceController
    {
        Mock<IAllowanceService> _allowanceService;
        Mock<IExcelService> _excelService;
        Mock<IWebHostEnvironment> _whe;

        public TestAllowanceController()
        {
            _allowanceService = new Mock<IAllowanceService>();
            _excelService = new Mock<IExcelService>();
            _whe = new Mock<IWebHostEnvironment>();
        }

        [Fact]
        public async Task Get_ReturnsStatus200()
        {
            var filter = new AllowanceFilter();
            _allowanceService.Setup(_ => _.GetAll(filter)).ReturnsAsync(AllowancePageMockData.GetAllowancePage());
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = await sut.Get(filter);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task Get_ReturnsAllItems()
        {
            var filter = new AllowanceFilter();
            _allowanceService.Setup(_ => _.GetAll(filter)).ReturnsAsync(AllowancePageMockData.GetAllowancePage());
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = await sut.Get(filter);

            var OkObject = result.Result as OkObjectResult;
            OkObject.Should().NotBeNull();
            var data = OkObject.Value as AllowancePageDto;
            data.Allowances.Count().Should().Be(3);
        }

        [Fact]
        public async Task GetById_ReturnsStatus200()
        {
            var filter = new AllowanceFilter();
            _allowanceService.Setup(_ => _.GetById(0)).ReturnsAsync(AllowancePageMockData.GetAllowance(false));
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = await sut.GetById(0);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public async Task GetById_ReturnsStatus404()
        {
            var filter = new AllowanceFilter();
            _allowanceService.Setup(_ => _.GetById(0)).ReturnsAsync(AllowancePageMockData.GetAllowance(true));
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = await sut.GetById(0);

            result.Result.GetType().Should().Be(typeof(NotFoundObjectResult));
        }

        [Fact]
        public void Post_ReturnsStatus200()
        {
            var allowance = new Allowance();
            _allowanceService.Setup(_ => _.Post(allowance));
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.Post(allowance);

            result.GetType().Should().Be(typeof(OkResult));
        }

        [Fact]
        public void Put_ReturnsStatus200()
        {
            var allowance = new Allowance();
            var id = 0;
            _allowanceService.Setup(_ => _.Put(id, allowance)).ReturnsAsync(true);
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.Put(id, allowance);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public void Put_ReturnsStatus400()
        {
            var allowance = new Allowance();
            var id = 0;
            _allowanceService.Setup(_ => _.Put(id, allowance)).ReturnsAsync(false);
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.Put(id, allowance);

            result.Result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }

        [Fact]
        public void Delete_ReturnsStatus200()
        {
            _allowanceService.Setup(_ => _.Delete(0)).ReturnsAsync(true);
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.Delete(0);

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }

        [Fact]
        public void Delete_ReturnsStatus400()
        {
            _allowanceService.Setup(_ => _.Delete(0)).ReturnsAsync(false);
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.Delete(0);

            result.Result.GetType().Should().Be(typeof(NotFoundObjectResult));
        }

        [Fact]
        public void SetConpensation_ReturnsStatus200()
        {
            var compensation = new CompensationDto();
            _allowanceService.Setup(_ => _.UpdateCompensation(compensation)).ReturnsAsync(true);
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.SetCompensation(compensation);

            result.Result.GetType().Should().Be(typeof(OkResult));
        }

        [Fact]
        public void SetConpensation_ReturnsStatus400()
        {
            var compensation = new CompensationDto();
            _allowanceService.Setup(_ => _.UpdateCompensation(compensation)).ReturnsAsync(false);
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.SetCompensation(compensation);

            result.Result.GetType().Should().Be(typeof(BadRequestObjectResult));
        }

        [Fact]
        public void GetConpensation_ReturnsStatus200()
        {
            _allowanceService.Setup(_ => _.GetCompensation("test"));
            var sut = new AllowanceController(_allowanceService.Object, _excelService.Object, _whe.Object);

            var result = sut.GetCompensation("test");

            result.Result.GetType().Should().Be(typeof(OkObjectResult));
        }
    }
}
