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
    public class PetTypesController : Controller
    {

        // DataBase defenition & connection 
        private MySqlDatabase MySqlDatabase { get; set; }
        public PetTypesController(MySqlDatabase mySqlDatabase)
        {
            this.MySqlDatabase = mySqlDatabase;
        }



        #region APIActions

        [HttpGet]
        public async Task<List<PetType>> Get()
        {
            // Get the list of al items & return them directly
            return await GetPetTypes();
        }

        #endregion



        #region DBActions

        // Get the list of all types of pets from the database
        private async Task<List<PetType>> GetPetTypes()
        {
            // Define the return list
            var ret = new List<PetType>();

            // Database commands
            var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT id, name FROM PetTypes";


            // Parse data from DB to model
            using (var reader = await cmd.ExecuteReaderAsync())
                while (await reader.ReadAsync())
                {
                    ret.Add(new PetType()
                    {
                        id = reader.GetFieldValue<int>(0),
                        name = reader.GetFieldValue<string>(1)
                    });
                }

            // Return list of items
            return ret;
        }

        #endregion

    }
}
