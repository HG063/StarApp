using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static StarApp.Core.Domain.Enums.RolesEnum;

namespace StarApp.Core.Domain.DTOs
{
    //public enum Roles{User, Admin, Lead};
    public class RequestAccessDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        [EnumDataType(typeof(Roles), ErrorMessage = "Role must either Developer, Admin or Lead")]
        public Roles Role { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A - Za - z])(?=.*\\d)(?=.*[@$!% *#?&])[A-Za-z\\d@$!%*#?&]{8,}$" , ErrorMessage = "Password must contain minimum eight characters, at least one letter, one number and one special character")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
