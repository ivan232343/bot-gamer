-- --------------------------------------------------------
-- Host:                         192.168.18.66
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

-- Volcando estructura para procedimiento bd_win_gamer_data.sp_validate_gamer
DROP PROCEDURE IF EXISTS `sp_validate_gamer`;
DELIMITER //
CREATE PROCEDURE `sp_validate_gamer`(
	IN `name_input` VARCHAR(250),
	IN `document` VARCHAR(20),
	IN `plan_input` INT
)
    COMMENT 'valida si el cliente es gamer o no, segun el dato que coloque saldra 1 si encontro algo, 0 si no encontro nada o 0 con info si encontro algo pero lo ingresado no coincide'
BEGIN
DECLARE name_client VARCHAR(200);
DECLARE plan_contratado INT;
SET name_client = (SELECT usuarios_gamer_discord.NOMBRE FROM usuarios_gamer_discord WHERE usuarios_gamer_discord.NUMDOC = document);
SET plan_contratado = (SELECT usuarios_gamer_discord.velocidad_plan FROM usuarios_gamer_discord WHERE usuarios_gamer_discord.numdoc = document);
if name_client = name_input
then SELECT TRUE AS 'validate', usuarios_gamer_discord.* FROM usuarios_gamer_discord WHERE usuarios_gamer_discord.NUMDOC = document;
ELSE SELECT FALSE AS 'validate', name_client,plan_contratado;
END if;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;