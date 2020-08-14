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
        // API CALL: api/Pets
        [HttpGet]
        public async Task<List<Pet>> Get()
        {
            // Get the list of al items & return them directly
            return await GetPets();
        }


        // API CALL: api/pets/byEmployeeId/{id}
        [HttpGet("byEmployeeId/{employeeId}", Name = "GetPetsByEmployeeId")]
        public async Task<List<Pet>> GetPetsByEmployeeId(int employeeId)
        {
            // Get the list of al items & return them directly
            return await PetsByEmployeeId(employeeId);
        }


        // API CALL: api/pets/petTypes
        [HttpGet("petTypes", Name = "GetPetTypes")]
        public async Task<List<PetType>> GetPetTypes()
        {
            // Get the list of al pet types
            return await PetTypes();
        }


        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Pet pet)
        {
            // Check validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set new data for a pet & return with error checker
            var updateResult = await UpdatePet(pet);
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
        public async Task<IActionResult> Post([FromBody] Pet pet)
        {
            // Check validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            // Creates a new data for a pet
            var addResult = await addPet(pet);
            if (addResult != null)
            {
                return Ok(addResult);
            }
            else
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{petId}")]
        public async Task<IActionResult> Delete(int petId)
        {
            // Check validation
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Removes a pet
            return Ok(await removePet(petId));
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

        // Get the list of pets by giving an employee id
        private async Task<List<Pet>> PetsByEmployeeId(int employeeId)
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
                        petTypeName = reader.GetFieldValue<string>(2),
                        employeeId = reader.GetFieldValue<int>(3),
                        name = reader.GetFieldValue<string>(4)
                    });
                }

            // Return list of items
            return ret;
        }

        // Get the list of all pet types
        private async Task<List<PetType>> PetTypes()
        {

            // Define the return list
            var ret = new List<PetType>();

            // Database commands
            var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"CALL getAllPetTypes();";


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



        // Update a Pet
        private async Task<bool> UpdatePet(Pet pet)
        {
            try
            {

                // Database commands
                var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("CALL setPet('{0}','{1}','{2}','{3}');",
                    pet.id,
                    pet.name,
                    pet.employeeId,
                    pet.petTypeId);


                // Until this is an update of one item, the result should be 1. (Not best way to check errors)
                return await cmd.ExecuteNonQueryAsync() == 1;
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp);
                return false;
            }
        }

        // Adds a new Pet
        private async Task<Pet> addPet(Pet pet)
        {
            try
            {
                // Define the return data
                Pet newEmp = new Pet();

                // Database commands
                var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("CALL addPet('{0}','{1}','{2}');",
                    pet.name,
                    pet.employeeId,
                    pet.petTypeId);


                // Parse data from DB to model
                using (var reader = await cmd.ExecuteReaderAsync())
                    while (await reader.ReadAsync())
                    {
                        newEmp = new Pet()
                        {
                            petTypeId = reader.GetFieldValue<int>(1),
                            employeeId = reader.GetFieldValue<int>(2),
                            name = reader.GetFieldValue<string>(3),
                            petTypeName = reader.GetFieldValue<string>(4),
                            employeeName = reader.GetFieldValue<string>(5)
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

        // Remove a Pet
        private async Task<bool> removePet(int petId)
        {
            try
            {

                // Database commands
                var cmd = this.MySqlDatabase.Connection.CreateCommand() as MySqlCommand;
                cmd.CommandText = string.Format("CALL deletePet('{0}');", petId);


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
