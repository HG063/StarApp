using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.DTOs
{
    public class ExcelDto
    {
        public string ResourceName { get; set; } = string.Empty;
        public string ResourceId { get; set; } = string.Empty;
        public string PeriodStart { get; set; } = string.Empty;
        public string PeriodEnd { get; set; } = string.Empty;
        public string Hours { get; set; } = string.Empty;
        public string ApprovalStatus { get; set; } = string.Empty;
        public string TimesheetNumber { get; set; } = string.Empty;
        public string Vertical { get; set; } = string.Empty;
        public string Horizontal { get; set; } = string.Empty;
        public string SubHorizontal { get; set; } = string.Empty;
        public string CustomerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string ProjectId { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectManager { get; set; } = string.Empty;
    }
}
