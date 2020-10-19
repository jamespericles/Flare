-- Drops the flare db if it exists currently --
DROP DATABASE IF EXISTS flare;
-- Creates the "flare" database --
CREATE DATABASE flare;
-- Use the "flare" database --
USE flare;

-- Create sessions table --
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create users table --
CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `email` VARCHAR(255),
    `address1` VARCHAR(255),
    `address2` VARCHAR(255),
    `city` VARCHAR(255),
    `state` VARCHAR(255),
    `zip` VARCHAR(255),
    `mobile` VARCHAR(255),
    `salt` VARCHAR(255),
    `password` VARCHAR(255),
    `last_login` DATETIME,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`)
);

-- Create contacts table --
CREATE TABLE `contacts` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `nickname` VARCHAR(255),
    `relationship` VARCHAR(255),
    `email` VARCHAR(255),
    `mobile` VARCHAR(20),
    `users` INT,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`users`) REFERENCES users(`id`)
);

-- Create groups table --
CREATE TABLE `groups` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(255),
    `users` INT,
    `contacts` INT,
    `plans` INT,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`users`) REFERENCES users(`id`),
    FOREIGN KEY (`contacts`) REFERENCES contacts(`id`)
);

-- Create plans table --
CREATE TABLE `plans` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `planname` VARCHAR(255),
	`isActive` BOOLEAN,
    `isHome` BOOLEAN,
    `durationBeforeExecution` INT,
    `activatestart` TIME,
    `activateend` TIME,
    `executeplan` BOOLEAN,
    `users` INT,
    `contacts` INT,
    `groups` INT,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`users`) REFERENCES users(`id`),
    FOREIGN KEY (`contacts`) REFERENCES contacts(`id`)
);

-- Add foreign key for plans to groups for many:many relationship--
ALTER TABLE `groups`
ADD FOREIGN KEY (`plans`) REFERENCES plans(`id`);

-- Add foreign key for groups to plans for many:many relationship --
ALTER TABLE `plans`
ADD FOREIGN KEY (`groups`) REFERENCES `groups`(`id`);

-- Create templates table --
CREATE TABLE `templates` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(255),
    `val` VARCHAR(2000),
    `users` INT,
    `contacts` INT,
    `groups` INT,
    `plans` INT,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`users`) REFERENCES users(`id`),
    FOREIGN KEY (`contacts`) REFERENCES contacts(`id`),
    FOREIGN KEY (`groups`) REFERENCES `groups`(`id`),
    FOREIGN KEY (`plans`) REFERENCES plans(`id`)
);