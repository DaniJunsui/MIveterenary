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
    public class EmployeesController : Controller
    {

        // DataBase defenition & connection 
        private MySqlDatabase MySqlDatabase { get; set; }
        public EmployeesController(MySqlDatabase mySqlDatabase)
        {
            this.MySqlDatabase = mySqlDatabase;
        }



        #region APIActions

        [HttpGet]
        public async Task<List<Employee>> Get()
        {
            // Get the list of al items & return them directly
            return await GetEmployees();
        }

        #endregion



        #region DBActions

        // Get the list of all employees from the database
        private async Task<List<Employee>> GetEmployees()
        {
            // Define the return list
            var ret = new List<Employee>();

            // Database commands
            var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT id, firstName, lastName, mediaInteractiveEmployee FROM employees";


            // Parse data from DB to model
            using (var reader = await cmd.ExecuteReaderAsync())
                while (await reader.ReadAsync())
                {
                    ret.Add(new Employee()
                    {
                        id = reader.GetFieldValue<int>(0),
                        firstName = reader.GetFieldValue<string>(1),
                        lastName = reader.GetFieldValue<string>(2),
                        mediaInteractiveEmployee = reader.GetFieldValue<bool>(3)
                    });
                }

            // Return list of items
            return ret;
        }

        #endregion

    }
}
