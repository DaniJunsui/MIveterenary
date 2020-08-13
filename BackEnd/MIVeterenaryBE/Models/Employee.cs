using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIVeterenaryBE.Models
{
    // Employee Model (Table: Employees)
    public class Employee
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public bool mediaInteractiveEmployee { get; set; }
        public Int64 numberOfPets { get; set; }
    }
}
