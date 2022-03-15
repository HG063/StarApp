using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.DTOs
{
    public class EmployeePageDto
    {
        public IEnumerable<GetEmployeesDto> employees { get; set; } = new List<GetEmployeesDto>();
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }
}
