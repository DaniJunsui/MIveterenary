using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIVeterenaryBE.Models
{
 
     // Pet Model (Table: Pets)
    public class Pet
    {
        public int id { get; set; }
        public int petTypeId { get; set; }
        public string petTypeName { get; set; }
        public int employeeId { get; set; }
        public string employeeName { get; set; }
        public string name { get; set; }

    }
}
