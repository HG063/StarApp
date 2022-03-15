using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Test.MockData
{
    public class AllowancePageMockData
    {
        public static AllowancePageDto GetAllowancePage()
        {
            var allowances = new List<Allowance>() 
            {
                new Allowance(),
                new Allowance(),
                new Allowance()
            };
            return new AllowancePageDto()
            { CurrentPage = 1, TotalPages = 1, Allowances = allowances.AsEnumerable() };
        }

        public static Allowance GetAllowance(bool isNull)
        {
            if (isNull) return null;
            else return new Allowance();
        }
    }
}
