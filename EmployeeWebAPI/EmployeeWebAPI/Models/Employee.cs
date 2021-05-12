using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string gender { get; set; }
        public string contactPreference { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public DateTime dateOfBirth { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public bool isActive { get; set; }
        public string photoPath { get; set; }

    }
}
