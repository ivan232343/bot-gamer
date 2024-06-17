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

-- Volcando estructura para procedimiento bd_gamer_data.sp_close_ticket
DROP PROCEDURE IF EXISTS `sp_close_ticket`;
DELIMITER //
CREATE PROCEDURE `sp_close_ticket`(
	IN `idAsesor` CHAR(25),
	IN `ticket` CHAR(20),
	IN `currentId` INT
)
    COMMENT 'cierra el ticket del cliente'
BEGIN
UPDATE tb_registro_atencion SET 
tb_registro_atencion.`adviser_i-id_close` = idAsesor, 
tb_registro_atencion.estado = "cerrado",
tb_registro_atencion.ticket_crm_assoc = ticket,
tb_registro_atencion.time_close = CURRENT_TIMESTAMP() 
WHERE tb_registro_atencion._id = currentId;
SELECT 
tb_registro_atencion.document,
tb_registro_atencion.`user_i-id_init` AS "user_id",
tb_registro_atencion.time_create,
tb_registro_atencion.`adviser_i-id_init` AS "asesor_take",
tb_registro_atencion.time_init,
tb_registro_atencion.`adviser_i-id_close` AS "asesor_close",
tb_registro_atencion.time_close,
tb_registro_atencion.ticket_crm_assoc,
tb_registro_atencion.motivo,
tb_registro_atencion.observaciones
FROM tb_registro_atencion WHERE _id = currentId;

END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
