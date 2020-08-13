using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIVeterenaryBE.Models;
using MySql.Data.MySqlClient;


namespace MIVeterenaryBE.Controllers
{

    [Route("api/[controller]")]
    public class PetsController : Controller
    {

        // DataBase defenition & connection 
        private MySqlDatabase MySqlDatabase { get; set; }
        public PetsController(MySqlDatabase mySqlDatabase)
        {
            this.MySqlDatabase = mySqlDatabase;
        }



        #region APIActions

        [HttpGet]
        public async Task<List<Pet>> Get()
        {
                // Get the list of al items & return them directly
                return await GetPets();
        }

        [HttpGet("{employeeId}")]
        public async Task<List<Pet>> GetByEmployeeId(int employeeId)
        {
            // Get the list of al items & return them directly
            return await GetPets();
        }
        #endregion



        #region DBActions

        // Get the list of all pets from the database
        private async Task<List<Pet>> GetPets()
        {
            // Define the return list
            var ret = new List<Pet>();

            // Database commands
            var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"CALL getAllPets();";


            // Parse data from DB to model
            using (var reader = await cmd.ExecuteReaderAsync())
                while (await reader.ReadAsync())
                {
                    ret.Add(new Pet()
                    {
                        id = reader.GetFieldValue<int>(0),
                        petTypeId = reader.GetFieldValue<int>(1),
                        employeeId = reader.GetFieldValue<int>(2),
                        name = reader.GetFieldValue<string>(3),
                        petTypeName = reader.GetFieldValue<string>(4),
                        employeeName = reader.GetFieldValue<string>(5)
                    });
                }

            // Return list of items
            return ret;
        }

        private async Task<List<Pet>> GetPetsByEmployeeId(int employeeId)
        {
            // Define the return list
            var ret = new List<Pet>();

            // Database commands
            var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = "CALL getPetByEmployeeId(" + employeeId + ");";


            // Parse data from DB to model
            using (var reader = await cmd.ExecuteReaderAsync())
                while (await reader.ReadAsync())
                {
                    ret.Add(new Pet()
                    {
                        id = reader.GetFieldValue<int>(0),
                        petTypeId = reader.GetFieldValue<int>(1),
                        employeeId = reader.GetFieldValue<int>(2),
                        name = reader.GetFieldValue<string>(3)
                    });
                }

            // Return list of items
            return ret;
        }

        #endregion

    }
}
