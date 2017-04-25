CREATE DATABASE  IF NOT EXISTS `api`;

USE `api`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(256) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `products`;

DROP TABLE IF EXISTS `product_types`;

CREATE TABLE `product_types` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `product_type_id` INT UNSIGNED NOT NULL,
  CONSTRAINT `fk_product_type` 
    FOREIGN KEY (`product_type_id`) REFERENCES `product_types` (`id`),  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (firstname, lastname, email, password) VALUES("Admin", "Admin", "test@api.com", "$2a$10$ra8O6HnOdqLencuz3mdkPuILVEZwG0EH/yMuEgOdqO0w28y7ukO4u");

INSERT INTO `product_types` (name) VALUES("Computing");
INSERT INTO `product_types` (name) VALUES("Audio");
INSERT INTO `product_types` (name) VALUES("Visual");
INSERT INTO `product_types` (name) VALUES("Food");

INSERT INTO `products` (name, product_type_id) VALUES("Monitor", 1);
INSERT INTO `products` (name, product_type_id) VALUES("Speakers", 2);
INSERT INTO `products` (name, product_type_id) VALUES("TV", 3);
INSERT INTO `products` (name, product_type_id) VALUES("Steak", 4);