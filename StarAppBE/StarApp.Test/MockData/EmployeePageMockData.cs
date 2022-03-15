using StarApp.Core.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Test.MockData
{
    public class EmployeePageMockData
    {
        public static EmployeePageDto GetData()
        {
            var employees = new List<GetEmployeesDto>
            {
                new GetEmployeesDto(),
                new GetEmployeesDto(),
                new GetEmployeesDto(),
            };
            return new EmployeePageDto()
            {
                CurrentPage = 1,
                TotalPages = 1,
                employees = employees
            };
        }
    }
}
