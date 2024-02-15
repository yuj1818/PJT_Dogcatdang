-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dogcatdang
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `animal_id` bigint NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `animal_type` varchar(255) NOT NULL,
  `breed` varchar(200) NOT NULL,
  `color` varchar(200) NOT NULL,
  `feature` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `img_name` varchar(200) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `is_neuter` varchar(255) DEFAULT NULL,
  `rescue_date` date NOT NULL,
  `rescue_location` varchar(200) NOT NULL,
  `state` enum('보호중','입양완료','안락사','자연사') NOT NULL,
  `user_id` bigint DEFAULT '1',
  `weight` int DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`animal_id`),
  KEY `FK8cr302gleqwcejlrw6dubn9hw` (`user_id`),
  CONSTRAINT `FK8cr302gleqwcejlrw6dubn9hw` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animal_like`
--

DROP TABLE IF EXISTS `animal_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_like` (
  `animal_like_id` bigint NOT NULL AUTO_INCREMENT,
  `created` date DEFAULT NULL,
  `animal_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`animal_like_id`),
  KEY `FK89hqxbhcw501oyvyp66uncnit` (`animal_id`),
  KEY `FKtgtc6q8qy7bvaijpqoc6o0yh7` (`user_id`),
  CONSTRAINT `FK89hqxbhcw501oyvyp66uncnit` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`),
  CONSTRAINT `FKtgtc6q8qy7bvaijpqoc6o0yh7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `code` int NOT NULL,
  `content` text,
  `create_time` datetime(6) DEFAULT NULL,
  `is_saved` tinyint(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `thumbnail_img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKfyf1fchnby6hndhlfaidier1r` (`user_id`),
  CONSTRAINT `FKfyf1fchnby6hndhlfaidier1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `board_like`
--

DROP TABLE IF EXISTS `board_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_like` (
  `board_like_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`board_like_id`),
  KEY `FKk7rxm8vl1ptqqhwdj2sjmlpvq` (`board_id`),
  KEY `FKpf406vodal6lejcg4fkwcjr2o` (`user_id`),
  CONSTRAINT `FKk7rxm8vl1ptqqhwdj2sjmlpvq` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKpf406vodal6lejcg4fkwcjr2o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `board_id` bigint DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKlij9oor1nav89jeat35s6kbp1` (`board_id`),
  KEY `FKde3rfu96lep00br5ov0mdieyt` (`parent_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKde3rfu96lep00br5ov0mdieyt` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `FKlij9oor1nav89jeat35s6kbp1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lost_animal`
--

DROP TABLE IF EXISTS `lost_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lost_animal` (
  `lost_animal_id` bigint NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `animal_type` varchar(255) NOT NULL,
  `breed` varchar(200) NOT NULL,
  `feature` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `img_name` varchar(200) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `lost_date` date NOT NULL,
  `lost_location` varchar(200) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` enum('실종','완료') NOT NULL,
  `weight` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`lost_animal_id`),
  KEY `FK6mepgqup9ngfr0uxxb56utfw` (`user_id`),
  CONSTRAINT `FK6mepgqup9ngfr0uxxb56utfw` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `sent_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `receive_user_id` bigint DEFAULT NULL,
  `send_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf2fmll4u9unq64oyod3066srt` (`receive_user_id`),
  KEY `FKnl29c0m994gj1icx3wdno9b4q` (`send_user_id`),
  CONSTRAINT `FKf2fmll4u9unq64oyod3066srt` FOREIGN KEY (`receive_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKnl29c0m994gj1icx3wdno9b4q` FOREIGN KEY (`send_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r4k4edos30bx9neoq81mdvwph` (`token`),
  UNIQUE KEY `UK_f95ixxe7pa48ryn1awmh2evt7` (`user_id`),
  CONSTRAINT `FKfgk1klcib7i15utalmcqo7krt` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `reservation_time` datetime(6) NOT NULL,
  `state` enum('대기중','승인','거절') DEFAULT NULL,
  `visitor` int NOT NULL,
  `animal_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `FK57teoiu49msqqbhmhg9so422m` (`animal_id`),
  KEY `FKm4oimk0l1757o9pwavorj6ljg` (`user_id`),
  CONSTRAINT `FK57teoiu49msqqbhmhg9so422m` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`),
  CONSTRAINT `FKm4oimk0l1757o9pwavorj6ljg` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `streaming`
--

DROP TABLE IF EXISTS `streaming`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `streaming` (
  `streaming_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) NOT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`streaming_id`),
  KEY `FKt0kuoo18j4uwn2qhudu05hule` (`user_id`),
  CONSTRAINT `FKt0kuoo18j4uwn2qhudu05hule` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `streaming_animal`
--

DROP TABLE IF EXISTS `streaming_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `streaming_animal` (
  `streaming_animal_id` bigint NOT NULL AUTO_INCREMENT,
  `animal_id` bigint DEFAULT NULL,
  `streaming_id` bigint DEFAULT NULL,
  PRIMARY KEY (`streaming_animal_id`),
  KEY `FKsksfojk8mgk9mxpu8ffavrs6i` (`animal_id`),
  KEY `FKs4aw7h1wof2hglj7421gng3na` (`streaming_id`),
  CONSTRAINT `FKs4aw7h1wof2hglj7421gng3na` FOREIGN KEY (`streaming_id`) REFERENCES `streaming` (`streaming_id`),
  CONSTRAINT `FKsksfojk8mgk9mxpu8ffavrs6i` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `img_name` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`),
  UNIQUE KEY `UK_589idila9li6a4arw1t8ht1gx` (`phone`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 15:43:32
