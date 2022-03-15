using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.Entities
{
    public class Allowance
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Project { get; set; } = string.Empty;
        public string PeriodStart { get; set; } = string.Empty; 
        public string PeriodEnd { get; set; } = string.Empty;
        public string SapId { get; set; } = string.Empty;
        public int ProjectHours { get; set; }
        public int HolidayHours { get; set; }
        public int AfternoonShiftDays { get; set; }
        public int NightShiftDays { get; set; }
        public int DaysEligibleForTA { get; set; }
        public int TransportAllowance { get; set; }
        public int TotalAllowance { get; set; }
        public int? CompensationId { get; set; }
        public Compensation? Compensation { get; set; }
    }
}
