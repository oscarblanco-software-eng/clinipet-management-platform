-- Clinipet Database Schema
-- Optimized for GitHub Portfolio

CREATE DATABASE IF NOT EXISTS `clinipet` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `clinipet`;

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `tokenExpires` datetime DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`) -- Solo una llave única, limpia y clara
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sample Data for Testing (No real sensitive info)
LOCK TABLES `users` WRITE;
INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES 
(1, 'admin@clinipet.com', '$2b$10$SampleHashForTestingPurposesOnly123456789', 'admin', NOW(), NOW()),
(2, 'user@example.com', '$2b$10$SampleHashForTestingPurposesOnly987654321', 'user', NOW(), NOW());
UNLOCK TABLES;
