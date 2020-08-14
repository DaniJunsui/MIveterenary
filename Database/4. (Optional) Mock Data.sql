---------------------------------------------------------
----    DEFAULT EXAMPLE DATA FOR MIVETERINARY APP    ----
----         Author:  DANIEL CORTES BERNAL           ----
---------------------------------------------------------


-- ADD SOME EMPLOYEES:
INSERT INTO `employees` (`id`, `firstName`, `lastName`, `mediaInteractiveEmployee`) VALUES 
(1, 'Manuel', 'Gonzalez', '1'), 
(2, 'Fernando', 'Sanchez', '1'),
(3, 'Federico', 'Navarro', '0'), 
(4, 'David', 'Castillo', '1'), 
(5, 'Leo', 'Godoy', '0'), 
(6, 'Daniel', 'Cortes', '1');



-- ADD SOME PETS:

INSERT INTO `pets` (`id`, `petTypeId`, `employeeId`, `name`) VALUES 
(NULL, '9', '2', 'Niebla'), 
(NULL, '17', '4', 'Pluto'), 
(NULL, '9', '6', 'Rex'), 
(NULL, '3', '2', 'Snoopy'), 
(NULL, '23', '2', 'Niebla'), 
(NULL, '31', '5', 'Goofy'), 
(NULL, '3', '3', 'Pancho');