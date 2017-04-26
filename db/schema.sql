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

DROP TABLE IF EXISTS `product_categories`;

CREATE TABLE `product_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `product_types` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `product_category_id` INT UNSIGNED NOT NULL,
  CONSTRAINT `fk_product_cat` 
    FOREIGN KEY (`product_category_id`) REFERENCES `product_categories` (`id`),   
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

INSERT INTO `product_categories` (name) VALUES("Computing");
INSERT INTO `product_categories` (name) VALUES("Audio");
INSERT INTO `product_categories` (name) VALUES("Visual");
INSERT INTO `product_categories` (name) VALUES("Food");

INSERT INTO `product_types` (name, product_category_id) VALUES("Monitors", 1);
INSERT INTO `product_types` (name, product_category_id) VALUES("Speakers", 2);
INSERT INTO `product_types` (name, product_category_id) VALUES("TVs", 3);
INSERT INTO `product_types` (name, product_category_id) VALUES("Snacks", 4);

INSERT INTO `products` (name, product_type_id) VALUES("Samsung Monitor", 1);
INSERT INTO `products` (name, product_type_id) VALUES("Logitech Mouse", 1);
INSERT INTO `products` (name, product_type_id) VALUES("LG 5.1 Surround Sound", 2);
INSERT INTO `products` (name, product_type_id) VALUES("Beats Headphones", 2);
INSERT INTO `products` (name, product_type_id) VALUES("Sony 50 inch TV", 3);
INSERT INTO `products` (name, product_type_id) VALUES("Panasonic HD Projector", 3);
INSERT INTO `products` (name, product_type_id) VALUES("Steak", 4);
INSERT INTO `products` (name, product_type_id) VALUES("Chips", 4);