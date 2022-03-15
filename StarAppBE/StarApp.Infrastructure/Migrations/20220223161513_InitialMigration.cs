using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarApp.Infrastructure.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Allowances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Project = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PeriodStart = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PeriodEnd = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SapId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectHours = table.Column<int>(type: "int", nullable: false),
                    HolidayHours = table.Column<int>(type: "int", nullable: false),
                    AfternoonShiftDays = table.Column<int>(type: "int", nullable: false),
                    NightShiftDays = table.Column<int>(type: "int", nullable: false),
                    DaysEligibleForTA = table.Column<int>(type: "int", nullable: false),
                    TransportAllowance = table.Column<int>(type: "int", nullable: false),
                    TotalAllowance = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Allowances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ActiveFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Allowances");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
