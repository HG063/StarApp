using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarApp.Infrastructure.Migrations
{
    public partial class CompationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompensationId",
                table: "Allowances",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Compensations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NightShiftCompensation = table.Column<int>(type: "int", nullable: false),
                    TransportCompensation = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Compensations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Allowances_CompensationId",
                table: "Allowances",
                column: "CompensationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Allowances_Compensations_CompensationId",
                table: "Allowances",
                column: "CompensationId",
                principalTable: "Compensations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Allowances_Compensations_CompensationId",
                table: "Allowances");

            migrationBuilder.DropTable(
                name: "Compensations");

            migrationBuilder.DropIndex(
                name: "IX_Allowances_CompensationId",
                table: "Allowances");

            migrationBuilder.DropColumn(
                name: "CompensationId",
                table: "Allowances");
        }
    }
}
