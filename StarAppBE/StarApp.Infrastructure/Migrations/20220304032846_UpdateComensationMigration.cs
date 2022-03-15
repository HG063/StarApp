using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarApp.Infrastructure.Migrations
{
    public partial class UpdateComensationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AfternoonShiftCompensation",
                table: "Compensations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AfternoonShiftCompensation",
                table: "Compensations");
        }
    }
}
