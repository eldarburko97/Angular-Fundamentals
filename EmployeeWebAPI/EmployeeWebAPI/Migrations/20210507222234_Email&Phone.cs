using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeWebAPI.Migrations
{
    public partial class EmailPhone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "Employees");
        }
    }
}
