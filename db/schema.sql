DROP DATABASE flare;
create Database flare;
use flare;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
    `createAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`)
);

CREATE TABLE `contacts` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `nickname` VARCHAR(255),
    `relationship` VARCHAR(255),
    `email` VARCHAR(255),
    `mobile` VARCHAR(20),
    `users` INT,
    `createAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`users`) REFERENCES users(`id`)
);

CREATE TABLE `groups` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(255),
    `users` INT,
    `contacts` INT,
    `createAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`users`) REFERENCES users(`id`),
    FOREIGN KEY (`contacts`) REFERENCES contacts(`id`)
);

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
    `createAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`users`) REFERENCES users(`id`),
    FOREIGN KEY (`contacts`) REFERENCES contacts(`id`)
);

CREATE TABLE `templates` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(255),
    `val` VARCHAR(2000),
    `users` INT,
    `contacts` INT,
    `createAt` DATETIME,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`users`) REFERENCES users(`id`),
    FOREIGN KEY (`contacts`) REFERENCES contacts(`id`)
);