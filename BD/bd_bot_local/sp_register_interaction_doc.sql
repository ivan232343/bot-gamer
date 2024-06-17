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

-- Volcando estructura para procedimiento bd_gamer_data.sp_register_interaction_doc
DROP PROCEDURE IF EXISTS `sp_register_interaction_doc`;
DELIMITER //
CREATE PROCEDURE `sp_register_interaction_doc`(
	IN `discordID` VARCHAR(50),
	IN `document` CHAR(15),
	IN `nombre` VARCHAR(250)
)
    COMMENT 'asocia la interaccion id del usuario a un dni '
BEGIN
DECLARE duplicado INT;
DECLARE interaction INT;
SET duplicado = (SELECT COUNT(*) FROM tb_user_dni WHERE tb_user_dni.doc = document);
SET interaction = (SELECT COUNT(*) FROM tb_user_dni WHERE tb_user_dni.interactionID = discordID);
if duplicado > 0 then DELETE FROM tb_user_dni where tb_user_dni.interactionID = discordID; END if;
INSERT INTO tb_user_dni(interactionID,doc,nombre) VALUE (discordID,document,nombre);
SELECT LAST_INSERT_ID() AS 'current_id';
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
