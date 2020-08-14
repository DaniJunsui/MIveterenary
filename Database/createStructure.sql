-------------------------------------------------------
----    DATA BASE CREATION FOR MIVETERINARY APP    ----
----         Author:  DANIEL CORTES BERNAL         ----
-------------------------------------------------------

-- Create DB

    CREATE DATABASE MIVeterinary;



-- GENERATE TABLE PET TYPES

CREATE TABLE `petTypes`
(
 `id`   int NOT NULL AUTO_INCREMENT,
 `name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);



-- GENERATE TABLE EMPLOYEES

CREATE TABLE `employees`
(
 `id`                       int NOT NULL AUTO_INCREMENT,
 `firstName`                varchar(45) NOT NULL ,
 `lastName`                 varchar(45) NOT NULL ,
 `mediaInteractiveEmployee` tinyint(1) NOT NULL ,
 `deleted`                  int NOT NULL DEFAULT '0'

PRIMARY KEY (`id`)
);


-- GENERATE TABLE PETS

CREATE TABLE `pets`
(
 `id`          int NOT NULL AUTO_INCREMENT,
 `petTypeId`   int NOT NULL ,
 `employeeId`  int NOT NULL ,
 `name`        varchar(45) NOT NULL ,
  `deleted`    int NOT NULL DEFAULT '0'

PRIMARY KEY (`id`, `petTypeId`, `pemployeeId`),
KEY `fkpettype` (`petTypeId`),
CONSTRAINT `FK_Pet_Type` FOREIGN KEY `fkpettype` (`petTypeId`) REFERENCES `petTypes` (`id`),
KEY `fkpetemployee` (`pemployeeId`),
CONSTRAINT `FK_Pet_Employee` FOREIGN KEY `fkpetemployee` (`pemployeeId`) REFERENCES `employees` (`id`)
);



-- ADD MANDATORY DATA FOR PET TYPES:

INSERT INTO `pettypes` (`id`, `name`) VALUES (1, 'Bearded Dragon');
INSERT INTO `pettypes` (`id`, `name`) VALUES (2, 'Birds');
INSERT INTO `pettypes` (`id`, `name`) VALUES (3, 'Cats');
INSERT INTO `pettypes` (`id`, `name`) VALUES (4, 'Chameleons (Veiled)');
INSERT INTO `pettypes` (`id`, `name`) VALUES (5, 'Chickens');
INSERT INTO `pettypes` (`id`, `name`) VALUES (6, 'Chinchillas');
INSERT INTO `pettypes` (`id`, `name`) VALUES (7, 'Chinese Water Dragon');
INSERT INTO `pettypes` (`id`, `name`) VALUES (8, 'Cows');
INSERT INTO `pettypes` (`id`, `name`) VALUES (9, 'Dogs');
INSERT INTO `pettypes` (`id`, `name`) VALUES (10, 'Donkey');
INSERT INTO `pettypes` (`id`, `name`) VALUES (11, 'Ducks');
INSERT INTO `pettypes` (`id`, `name`) VALUES (12, 'Ferrets');
INSERT INTO `pettypes` (`id`, `name`) VALUES (13, 'Fish');
INSERT INTO `pettypes` (`id`, `name`) VALUES (14, 'Geckos');
INSERT INTO `pettypes` (`id`, `name`) VALUES (15, 'Gerbils');
INSERT INTO `pettypes` (`id`, `name`) VALUES (16, 'Goats');
INSERT INTO `pettypes` (`id`, `name`) VALUES (17, 'Hamsters');
INSERT INTO `pettypes` (`id`, `name`) VALUES (18, 'Hedgehogs');
INSERT INTO `pettypes` (`id`, `name`) VALUES (19, 'Horses');
INSERT INTO `pettypes` (`id`, `name`) VALUES (20, 'Iguanas');
INSERT INTO `pettypes` (`id`, `name`) VALUES (21, 'Llamas');
INSERT INTO `pettypes` (`id`, `name`) VALUES (22, 'Lizards');
INSERT INTO `pettypes` (`id`, `name`) VALUES (23, 'Mice');
INSERT INTO `pettypes` (`id`, `name`) VALUES (24, 'Mule');
INSERT INTO `pettypes` (`id`, `name`) VALUES (25, 'Peafowl');
INSERT INTO `pettypes` (`id`, `name`) VALUES (26, 'Pigs and Hogs');
INSERT INTO `pettypes` (`id`, `name`) VALUES (27, 'Pigeons');
INSERT INTO `pettypes` (`id`, `name`) VALUES (28, 'Ponies');
INSERT INTO `pettypes` (`id`, `name`) VALUES (29, 'Pot Bellied Pig');
INSERT INTO `pettypes` (`id`, `name`) VALUES (30, 'Rabbits');
INSERT INTO `pettypes` (`id`, `name`) VALUES (31, 'Rats');
INSERT INTO `pettypes` (`id`, `name`) VALUES (32, 'Sheep');
INSERT INTO `pettypes` (`id`, `name`) VALUES (33, 'Skinks');
INSERT INTO `pettypes` (`id`, `name`) VALUES (34, 'Snakes');
INSERT INTO `pettypes` (`id`, `name`) VALUES (35, 'Stick Insects');
INSERT INTO `pettypes` (`id`, `name`) VALUES (36, 'Sugar Gliders');
INSERT INTO `pettypes` (`id`, `name`) VALUES (37, 'Tarantula');
INSERT INTO `pettypes` (`id`, `name`) VALUES (38, 'Turkeys');
INSERT INTO `pettypes` (`id`, `name`) VALUES (39, 'Turtles');
