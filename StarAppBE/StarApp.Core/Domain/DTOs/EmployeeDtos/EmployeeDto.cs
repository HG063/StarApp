using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StarApp.Core.Domain.Enums.RolesEnum;
using static StarApp.Core.Domain.Enums.StatusEnum;

namespace StarApp.Core.Domain.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public Roles Role { get; set; } 
        public Status Status { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
