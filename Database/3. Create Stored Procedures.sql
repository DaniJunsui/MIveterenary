---------------------------------------------------------------
----    STORED PROCEDURES CREATION FOR MIVETERINARY APP    ----
----               Author:  DANIEL CORTES BERNAL           ----
---------------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+02:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Data base: `miveterinary`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `addEmployee`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addEmployee` (IN `empFirstname` VARCHAR(45), IN `empLastName` VARCHAR(45), IN `empIsMI` BOOLEAN)  NO SQL
BEGIN
 
INSERT INTO `employees` (`firstName`, `lastName`, `mediaInteractiveEmployee`) VALUES 
(empFirstname, empLastName, empIsMI);

SELECT e.id, firstName, lastName, mediaInteractiveEmployee, COUNT(p.id) AS 'numberOfPets'
FROM employees AS e
LEFT JOIN pets AS p ON p.employeeId = e.id
WHERE e.id = LAST_INSERT_ID()
GROUP BY e.id, e.firstName, e.lastName, e.mediaInteractiveEmployee;

END$$

DROP PROCEDURE IF EXISTS `addPet`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addPet` (IN `petName` VARCHAR(45), IN `petEmployeeId` INT, IN `petTypeId` INT)  NO SQL
BEGIN

INSERT INTO `pets` (`petTypeId`, `employeeId`, `name`) VALUES 
(petTypeId,petEmployeeId,petName);
 
SELECT p.id, p.petTypeId, p.employeeId, p.name, 
pt.name 'typeName',
CONCAT(e.firstName, " ", e.lastName) 'employeeName'
FROM pets AS p
INNER JOIN pettypes AS pt ON pt.id = p.petTypeId
INNER JOIN employees AS e ON e.id = p.employeeId
WHERE p.id = LAST_INSERT_ID();

END$$

DROP PROCEDURE IF EXISTS `deleteEmployee`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteEmployee` (IN `empId` INT)  NO SQL
UPDATE employees
SET deleted = 1
WHERE id = empId$$

DROP PROCEDURE IF EXISTS `deletePet`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePet` (IN `petId` INT)  NO SQL
UPDATE pets
SET deleted = 1
WHERE id = petId$$

DROP PROCEDURE IF EXISTS `getAllEmployees`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllEmployees` ()  NO SQL
SELECT e.id, firstName, lastName, mediaInteractiveEmployee, COUNT(p.id) AS 'numberOfPets'
FROM employees AS e
LEFT JOIN pets AS p ON p.employeeId = e.id
WHERE e.deleted = 0
GROUP BY e.id, e.firstName, e.lastName, e.mediaInteractiveEmployee$$

DROP PROCEDURE IF EXISTS `getAllPets`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPets` ()  NO SQL
SELECT p.id, p.petTypeId, p.employeeId, p.name, 
pt.name 'typeName',
CONCAT(e.firstName, " ", e.lastName) 'employeeName'
FROM pets AS p 
INNER JOIN pettypes AS pt ON pt.id = p.petTypeId
INNER JOIN employees AS e ON e.id = p.employeeId
WHERE p.deleted = 0$$

DROP PROCEDURE IF EXISTS `getAllPetTypes`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPetTypes` ()  NO SQL
SELECT id, name FROM pettypes$$

DROP PROCEDURE IF EXISTS `getEmployeeById`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmployeeById` (IN `empId` INT)  NO SQL
SELECT e.id, firstName, lastName, mediaInteractiveEmployee, COUNT(p.id) AS 'numberOfPets'
FROM employees AS e
LEFT JOIN pets AS p ON p.employeeId = e.id
WHERE e.id = empId AND e.deleted = 0
GROUP BY e.id, e.firstName, e.lastName, e.mediaInteractiveEmployee$$

DROP PROCEDURE IF EXISTS `getPetByEmployeeId`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPetByEmployeeId` (IN `empId` INT(32))  NO SQL
SELECT pets.id, petTypeId,pt.name 'petTypeName', employeeId, pets.name FROM pets 
INNER JOIN pettypes AS pt ON pt.id = pets.petTypeId
WHERE employeeId = empId$$

DROP PROCEDURE IF EXISTS `setEmployee`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `setEmployee` (IN `empId` INT, IN `empFirstname` VARCHAR(45), IN `empLastName` VARCHAR(45), IN `empIsMI` BOOLEAN)  NO SQL
UPDATE employees
SET firstName = empFirstname,
lastName = empLastName,
mediaInteractiveEmployee = empIsMI
WHERE id = empId$$

DROP PROCEDURE IF EXISTS `setPet`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `setPet` (IN `petId` INT, IN `petName` VARCHAR(45), IN `employeeId` INT, IN `typeId` INT)  NO SQL
UPDATE pets
SET name = petName,
employeeId = employeeId,
petTypeId = typeId
WHERE id = petId$$

DELIMITER ;

-- --------------------------------------------------------



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;