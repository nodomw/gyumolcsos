CREATE DATABASE IF NOT EXISTS `fruit`; /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */

CREATE TABLE `fruit`.`fruits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `fruits` (`id`, `name`, `price`) VALUES
(1, 'Apple', 1.20),
(2, 'Banana', 0.50),
(3, 'Orange', 0.80),
(4, 'Grapes', 2.50),
(5, 'Pineapple', 3.00),
(6, 'Mango', 1.75),
(7, 'Strawberry', 2.00),
(8, 'Blueberry', 2.20),
(9, 'Watermelon', 4.00),
(10, 'Peach', 1.50),
(11, 'Cherry', 3.50),
(12, 'Pear', 1.10),
(13, 'Kiwi', 1.30),
(14, 'Papaya', 2.80),
(15, 'Lemon', 0.60);
