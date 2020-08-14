using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MIVeterenaryBE.Models
{
 
     // Pet Model (Table: Pets)
    public class Pet
    {
        public int id { get; set; }

        [Required]
        public int petTypeId { get; set; }
     
        public string petTypeName { get; set; }

        [Required]
        public int employeeId { get; set; }
        public string employeeName { get; set; }

        [Required]
        [StringLength(45)]
        public string name { get; set; }

    }
}
