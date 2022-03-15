using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.DTOs.AllowanceDtos
{
    public class CompensationDto
    {
        public string ProjectName { get; set; } = string.Empty;
        public int AfternoonShiftCompensation { get; set; } = 150;
        public int NightShiftCompensation { get; set; } = 150;
        public int TransportCompensation { get; set; } = 150;
        
    }
}
