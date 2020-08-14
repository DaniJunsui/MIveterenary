using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MIVeterenaryBE.Models
{
    // Employee Model (Table: Employees)
    public class Employee
    {
        public int id { get; set; }

        [Required]
        [StringLength(45)]
        public string firstName { get; set; }

        [Required]
        [StringLength(45)]
        public string lastName { get; set; }

        [Required]
        public bool mediaInteractiveEmployee { get; set; }
            
        public Int64 numberOfPets { get; set; }
    }
}
