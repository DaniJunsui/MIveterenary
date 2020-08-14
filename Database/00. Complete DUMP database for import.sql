-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-08-2020 a las 17:54:50
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miveterinary`
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

--
-- Estructura de tabla para la tabla `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `mediaInteractiveEmployee` tinyint(1) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id`, `firstName`, `lastName`, `mediaInteractiveEmployee`, `deleted`) VALUES
(1, 'Manuel', 'Gonzalez', 1, 0),
(2, 'Fernando', 'Sanchez', 1, 0),
(3, 'Federico', 'Navarro', 0, 0),
(4, 'David', 'Castillo', 1, 0),
(5, 'Leo', 'Godoy', 0, 0),
(6, 'Daniel', 'Cortes', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `petTypeId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`,`petTypeId`,`employeeId`),
  KEY `fkpettype` (`petTypeId`),
  KEY `fkpetemployee` (`employeeId`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`id`, `petTypeId`, `employeeId`, `name`, `deleted`) VALUES
(1, 9, 2, 'Niebla', 0),
(2, 17, 4, 'Pluto', 0),
(3, 9, 6, 'Rex', 0),
(4, 3, 2, 'Snoopy', 0),
(5, 23, 2, 'Niebla', 0),
(6, 31, 5, 'Goofy', 0),
(7, 3, 3, 'Pancho', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pettypes`
--

DROP TABLE IF EXISTS `pettypes`;
CREATE TABLE IF NOT EXISTS `pettypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pettypes`
--

INSERT INTO `pettypes` (`id`, `name`) VALUES
(1, 'Bearded Dragon'),
(2, 'Birds'),
(3, 'Cats'),
(4, 'Chameleons (Veiled)'),
(5, 'Chickens'),
(6, 'Chinchillas'),
(7, 'Chinese Water Dragon'),
(8, 'Cows'),
(9, 'Dogs'),
(10, 'Donkey'),
(11, 'Ducks'),
(12, 'Ferrets'),
(13, 'Fish'),
(14, 'Geckos'),
(15, 'Gerbils'),
(16, 'Goats'),
(17, 'Hamsters'),
(18, 'Hedgehogs'),
(19, 'Horses'),
(20, 'Iguanas'),
(21, 'Llamas'),
(22, 'Lizards'),
(23, 'Mice'),
(24, 'Mule'),
(25, 'Peafowl'),
(26, 'Pigs and Hogs'),
(27, 'Pigeons'),
(28, 'Ponies'),
(29, 'Pot Bellied Pig'),
(30, 'Rabbits'),
(31, 'Rats'),
(32, 'Sheep'),
(33, 'Skinks'),
(34, 'Snakes'),
(35, 'Stick Insects'),
(36, 'Sugar Gliders'),
(37, 'Tarantula'),
(38, 'Turkeys'),
(39, 'Turtles');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
