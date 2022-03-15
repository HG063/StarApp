using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Domain.Entities
{
    public class Compensation
    {
        [Key]
        public int Id { get; set; }
        public int NightShiftCompensation { get; set; } = 150;
        public int TransportCompensation { get; set; } = 150;
        public int AfternoonShiftCompensation { get; set; } = 150;
        public List<Allowance> Allowances { get; set; } = new List<Allowance>();
    }
}
