# Create Database
CREATE DATABASE agile_tracker;
USE agile_tracker;

# Create Users Table
CREATE TABLE `users` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `rfid` VARCHAR(20) NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `contactno` VARCHAR(20) NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `age` INT NOT NULL,
    `gender` INT NOT NULL,
    `dateregistered` datetime,
    `status` VARCHAR(20) NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0  CHARSET=utf8 COLLATE utf8_bin;

# Create Logs Table
CREATE TABLE `logs` (
    `id` VARCHAR(50) NOT NULL,
    `rfid` VARCHAR(20) NOT NULL,
    `logtype` INT NOT NULL,
    `locationid` INT NOT NULL,
    `usertemp` decimal(65,2),
    `date` datetime,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_bin;

# Create locations Table
CREATE TABLE `locations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 CHARSET=utf8 COLLATE utf8_bin;

# Create forecasts Table
CREATE TABLE `forecasts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `predict_noinfec` DECIMAL(65,2) NOT NULL,
    `percentage` DECIMAL(65,2) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 CHARSET=utf8 COLLATE utf8_bin;

# Create vaccinated_users Table
CREATE TABLE `vaccinated_users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `rfid` VARCHAR(20) NOT NULL,
    `datevaccinated_first` datetime,
    `datevaccinated_second` datetime,
    `firstdosevac` VARCHAR(100) NOT NULL,
    `seconddosevac` VARCHAR(100) NOT NULL,
    `status` VARCHAR(20) NOT NULL, 
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 CHARSET=utf8 COLLATE utf8_bin;

# Create occupations Table
CREATE TABLE `occupations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100) NOT NULL,  
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 CHARSET=utf8 COLLATE utf8_bin;


# Create Admin Users Table
CREATE TABLE `admin_users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `hash` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0  CHARSET=utf8 COLLATE utf8_bin;