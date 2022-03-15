using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.DTOs.Employee
{
    public class EmployeePasswordDto
    {
        public int Id { get; set; }
        
        [Required]
        public string OldPassword { get; set; } = string.Empty;

        [RegularExpression("^(?=.*[A - Za - z])(?=.*\\d)(?=.*[@$!% *#?&])[A-Za-z\\d@$!%*#?&]{8,}$" , ErrorMessage = "Password must contain minimum eight characters, at least one letter, one number and one special character")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; } = string.Empty;

        [Compare(nameof(NewPassword), ErrorMessage = "Passwords do not match")]
        [DataType(DataType.Password)]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
}
