using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StarApp.Core.Domain.DTOs;
using StarApp.Core.Domain.DTOs.AllowanceDtos;
using StarApp.Core.Domain.Entities;
using StarApp.Core.Interfaces.Service;
using System.Security.Claims;
using System.Text;

namespace StarApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllowanceController : ControllerBase
    {
        private readonly IAllowanceService _allowanceService;
        private readonly IExcelService _excelService;
        private readonly IWebHostEnvironment _environment;

        public AllowanceController(IAllowanceService allowanceService, IExcelService excelService, IWebHostEnvironment environment)
        {
            _allowanceService = allowanceService;
            _excelService = excelService;
            _environment = environment;
        }

        public class FileUpload
        {
            public IFormFile files { get; set; }
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AllowancePageDto>> Get([FromQuery]AllowanceFilter filter)
        {
            //string UserName = null;
            //var identity = HttpContext.User.Identity as ClaimsIdentity;
            //if (identity != null)
            //{
            //    UserName = identity.FindFirst(ClaimTypes.NameIdentifier).Value;
            //}

            //if (filter.Name == null && UserName != null) filter.Name = UserName;

            var responseData = await _allowanceService.GetAll(filter);
            return Ok(responseData);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Allowance>> GetById(int id)
        {
            var allowance =  await _allowanceService.GetById(id);
            if (allowance == null) return NotFound("Id not found");
            return Ok(allowance);
        }

        [Authorize]
        [HttpGet("ProjectNames")]
        public async Task<ActionResult<IEnumerable<string>>> GetProjects()
        {
            return Ok(await _allowanceService.GetProjects());
        }

        [HttpGet("Download")]
        public async Task<FileContentResult> Download([FromQuery] string? name)
        {
            var dataString = await _excelService.ToCsv(name);
            var fileName = $"Allowance_{DateTime.Now.ToString()}.csv";
            var fileType = "text/csv";
            return File(Encoding.ASCII.GetBytes(dataString), fileType, fileName);
        }

        [Authorize]
        [HttpPost("Upload")]
        public async Task<ActionResult> Upload([FromForm] FileUpload objFile)
        {
            if (objFile.files.Length > 0)
            {
                try
                {
                    if (!Directory.Exists(_environment.WebRootPath + "\\Upload\\"))
                    {
                        Directory.CreateDirectory(_environment.WebRootPath + "\\Upload\\");
                    }
                    using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "\\Upload\\" + objFile.files.FileName))
                    {
                        objFile.files.CopyTo(fileStream);
                        fileStream.Flush();
                    }
                    var file = new FileInfo(_environment.WebRootPath + "\\Upload\\" + objFile.files.FileName);
                    await _excelService.ReadFromExcel(file);
                    return Ok("\\Upload\\" + objFile.files.FileName);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.ToString());
                }
            }
            else
            {
                return BadRequest("Failed");
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult Post([FromBody] Allowance allowance)
        {
            _allowanceService.Post(allowance);
            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Allowance allowance)
        {
            var allowanceData = await _allowanceService.Put(id, allowance);
            if (!allowanceData) return BadRequest("Some Error Occured! Please recheck the data and try again.");
            return Ok("Data updated successfully");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _allowanceService.Delete(id);
            if (!response) return NotFound("Id not found");
            return Ok("Data deleted successfully");
        }

        [Authorize]
        [HttpPost("Compensation")]
        public async Task<ActionResult> SetCompensation(CompensationDto compensationDto)
        {
            var isUpdated = await _allowanceService.UpdateCompensation(compensationDto);
            if (!isUpdated) return BadRequest("Error Updating data");
            return Ok();
        }

        [Authorize]
        [HttpGet("Compensation")]
        public async Task<ActionResult> GetCompensation(string project)
        {
            return Ok(await _allowanceService.GetCompensation(project));
        }

    }
}
