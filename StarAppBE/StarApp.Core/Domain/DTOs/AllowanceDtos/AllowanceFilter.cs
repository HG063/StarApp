using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.DTOs
{
    public class AllowanceFilter
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = int.MaxValue;
        public string? Project { get; set; }
        public string? Name { get; set; }
        public string? Month { get; set; }
        public string? Year { get; set; }
        public string? OrderBy { get; set; }
    }
}
