using CsvHelper;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.DTOs.AllowanceDtos;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Repository;
using StarApp.Core.Interfaces.Service;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarApp.Core.Services
{
    public class ExcelService : IExcelService
    {
        private readonly IUnitOfWork _uow;

        public ExcelService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<string> ToCsv(string? name)
        {
            var data = await _uow.Allowance.GetAll();

            if (name != null) data = data.Where(x => x.Name.ToLower().Contains(name.ToLower()));
            
            StringBuilder sb = new StringBuilder();

            var rowHeading = string.Join(",", getPropName());
            sb.AppendLine(rowHeading);

            List<string> valueLines = data.Select(row => string.Join(",", getPropValue(row))).ToList();
            var rows = string.Join(Environment.NewLine, valueLines);
            sb.AppendLine(rows);

            return sb.ToString();
        }

        public async Task ReadFromExcel(FileInfo file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                int colCount = worksheet.Dimension.End.Column;
                int rowCount = worksheet.Dimension.End.Row;

                for (int row = 2; row <= rowCount; row++)
                {
                    var data = new List<string>();
                    ExcelDto currData = new ExcelDto();
                    Allowance allowance = new Allowance();

                    for (int col = 1; col <= colCount; col++)
                    {
                        data.Add(worksheet.Cells[row, col].Value?.ToString().Trim() + " ");
                    }

                    int i = 0;
                    foreach (var prop in typeof(ExcelDto).GetProperties())
                    {
                        prop.SetValue(currData, data[i++]);
                    }

                    allowance.Name = currData.ResourceName;
                    allowance.Project = currData.ProjectName;
                    allowance.PeriodStart = DateTime.FromOADate(double.Parse(currData.PeriodStart)).ToString("dd/MM/yyyy");
                    allowance.PeriodEnd = DateTime.FromOADate(double.Parse(currData.PeriodEnd)).ToString("dd/MM/yyyy");
                    allowance.ProjectHours = Convert.ToInt32(currData.Hours);
                    allowance.HolidayHours = 0;
                    allowance.AfternoonShiftDays = Convert.ToInt32(currData.Hours) / 8;
                    allowance.NightShiftDays = 0;
                    allowance.DaysEligibleForTA = allowance.AfternoonShiftDays + allowance.NightShiftDays;
                    allowance.TransportAllowance = allowance.DaysEligibleForTA * 150;
                    allowance.TotalAllowance = allowance.TransportAllowance + allowance.NightShiftDays * 150;
                    allowance.SapId = currData.ResourceId;

                    await _uow.Allowance.Add(allowance);
                }
                await _uow.Save();
            }
        }

        public List<string> getPropValue(Allowance allowance)
        {
            var currAllowance = new AllowanceDto() 
            { 
                Name = allowance.Name,
                ProjectHours = allowance.ProjectHours,
                PeriodEnd = allowance.PeriodEnd,
                PeriodStart = allowance.PeriodStart,
                HolidayHours = allowance.HolidayHours,
                AfternoonShiftDays=allowance.AfternoonShiftDays,
                DaysEligibleForTA=allowance.DaysEligibleForTA,
                NightShiftDays=allowance.NightShiftDays,
                Project = allowance.Project,
                SapId = allowance.SapId,
                TotalAllowance = allowance.TotalAllowance,
                TransportAllowance = allowance.TransportAllowance,
            };
            List<string> data = new List<string>();
            foreach(var prop in typeof(AllowanceDto).GetProperties())
            {
                data.Add(prop.GetValue(currAllowance).ToString());
            }
            return data;
        }

        public List<string> getPropName()
        {
            List<string> data = new List<string>();
            foreach(var prop in typeof(AllowanceDto).GetProperties())
            {
                data.Add(prop.Name);
            }
            return data;
        }
    }
}
