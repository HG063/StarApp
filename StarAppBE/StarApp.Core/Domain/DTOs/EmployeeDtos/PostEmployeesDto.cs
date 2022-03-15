using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StarApp.Core.Domain.Enums.RolesEnum;

namespace StarApp.Core.Domain.DTOs
{
    public class PostEmployeesDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        [EnumDataType(typeof(Roles), ErrorMessage = "Role must either User, Admin or Lead")]
        public Roles Role { get; set; }
    }
}
