using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.DTOs
{
    public class AllowancePageDto
    {
        public IEnumerable<Allowance> Allowances { get; set; } = new List<Allowance>();
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }
}
