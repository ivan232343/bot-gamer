-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.1.3-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla bd_gamer_data.tb_registro_atencion
CREATE TABLE IF NOT EXISTS `tb_registro_atencion` (
  `_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `estado` varchar(15) NOT NULL DEFAULT 'pendiente',
  `document` char(15) NOT NULL DEFAULT '0',
  `user_i-id_init` char(25) NOT NULL DEFAULT '0',
  `time_create` timestamp NOT NULL DEFAULT current_timestamp(),
  `adviser_i-id_init` char(25) DEFAULT NULL,
  `time_init` timestamp NULL DEFAULT NULL,
  `adviser_i-id_close` char(25) DEFAULT NULL,
  `time_close` timestamp NULL DEFAULT NULL,
  `channel_id` char(35) DEFAULT NULL,
  `ticket_crm_assoc` char(20) DEFAULT NULL,
  `motivo` varchar(50) DEFAULT NULL,
  `observaciones` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla que guarda el registro de las atenciones que se hayan creado por discord';

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
