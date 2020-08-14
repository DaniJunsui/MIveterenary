using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
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

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Employee employee)
        {
            // Check validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set new data for an employee
            var updateResult = await UpdateEmployee(employee);
            if (updateResult)
            {
                return Ok(updateResult);
            }
            else
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
            // Check validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            // Creates a new data for a employee
            var addResult = await addEmployee(employee);
            if (addResult != null)
            {
                return Ok(addResult);
            }
            else
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{employeeId}")]
        public async Task<IActionResult> Delete(int employeeId)
        {
            // Check validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Removes an employee
            var removeResult = await removeEmployee(employeeId);
            if (removeResult)
            {
                return Ok(removeResult);
            }
            else
            {
                return StatusCode(500);
            }
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
            cmd.CommandText = @"CALL getAllEmployees();";


            // Parse data from DB to model
            using (var reader = await cmd.ExecuteReaderAsync())
                while (await reader.ReadAsync())
                {
                    ret.Add(new Employee()
                    {
                        id = reader.GetFieldValue<int>(0),
                        firstName = reader.GetFieldValue<string>(1),
                        lastName = reader.GetFieldValue<string>(2),
                        mediaInteractiveEmployee = reader.GetFieldValue<bool>(3),
                        numberOfPets = reader.GetFieldValue<Int64>(4)
                    });
                }

            // Return list of items
            return ret;
        }


        // Update an employee
        private async Task<bool> UpdateEmployee(Employee employee)
        {
            try
            {
                // Database commands
                var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("CALL setEmployee('{0}','{1}','{2}','{3}');",
                    employee.id,
                    employee.firstName,
                    employee.lastName,
                    Convert.ToInt32(employee.mediaInteractiveEmployee));


                // Until this is an update of one item, the result should be 1. (Not best way to check errors)
                return await cmd.ExecuteNonQueryAsync() == 1;
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp);
                return false;
            }
        }


        // Adds a new employee
        private async Task<Employee> addEmployee(Employee employee)
        {
            try
            {
                // Define the return data
                Employee newEmp = new Employee();

                // Database commands
                var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("CALL addEmployee('{0}','{1}','{2}');",
                    employee.firstName,
                    employee.lastName,
                    Convert.ToInt32(employee.mediaInteractiveEmployee));


                // Parse data from DB to model
                using (var reader = await cmd.ExecuteReaderAsync())
                    while (await reader.ReadAsync())
                    {
                        newEmp = new Employee()
                        {
                            id = reader.GetFieldValue<int>(0),
                            firstName = reader.GetFieldValue<string>(1),
                            lastName = reader.GetFieldValue<string>(2),
                            mediaInteractiveEmployee = reader.GetFieldValue<bool>(3),
                            numberOfPets = reader.GetFieldValue<Int64>(4)
                        };
                    }

                // Return list of items
                return newEmp;
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp);
                return null;
            }

        }


        // Remove an employee
        private async Task<bool> removeEmployee(int employeeId)
        {
            try
            {

                // Database commands
                var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("CALL deleteEmployee('{0}');", employeeId);


                // Until this is an update of one item, the result should be 1. (Not best way to check errors)
                return await cmd.ExecuteNonQueryAsync() == 1;
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp);
                return false;
            }
        }

        #endregion

    }
}
