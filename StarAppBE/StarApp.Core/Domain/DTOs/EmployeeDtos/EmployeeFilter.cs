using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StarApp.Core.Domain.Enums.RolesEnum;
using static StarApp.Core.Domain.Enums.StatusEnum;

namespace StarApp.Core.Domain.DTOs
{
    public class EmployeeFilter
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = int.MaxValue;
        public string? Name { get; set; }
        public string? Email { get; set; }   
        public Status? Status { get; set; }
        public Roles? Role { get; set; }
    }
}
