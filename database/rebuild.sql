-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.1.3-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bd_gamer_data
CREATE DATABASE IF NOT EXISTS `bd_gamer_data` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bd_gamer_data`;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla que guarda el registro de las atenciones que se hayan creado por discord';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_gamer_data.tb_user_dni
CREATE TABLE IF NOT EXISTS `tb_user_dni` (
  `_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `interactionID` varchar(25) DEFAULT NULL,
  `doc` char(15) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Vincula el documento de identidad con el Interaction ID del usuario que haya ingresado';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para procedimiento bd_gamer_data.sp_close_ticket
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
SELECT document FROM tb_registro_atencion WHERE _id = currentId;

END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_gamer_data.sp_init_ticket
DELIMITER //
CREATE PROCEDURE `sp_init_ticket`(
	IN `ch` CHAR(35),
	IN `doc` CHAR(15),
	IN `motivo` VARCHAR(50),
	IN `detalles` VARCHAR(450),
	IN `clientId` CHAR(25)
)
    COMMENT 'inicia el ticket de atencion con el canal documento motivo detalles e interaction ID'
BEGIN
INSERT INTO tb_registro_atencion
(channel_id,document,motivo,observaciones,tb_registro_atencion.`user_i-id_init`) 
VALUES (ch,doc,motivo,detalles,clientId);
SELECT LAST_INSERT_ID() AS 'current_insert';
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_gamer_data.sp_register_interaction-doc
DELIMITER //
CREATE PROCEDURE `sp_register_interaction-doc`(
	IN `discordID` VARCHAR(50),
	IN `document` CHAR(15)
)
    COMMENT 'asocia la interaccion id del usuario a un dni '
BEGIN
DECLARE duplicado INT;
SET duplicado = (SELECT COUNT(*) FROM tb_user_dni WHERE tb_user_dni.interactionID = discordID OR tb_user_dni.doc = document);
if duplicado > 0 then DELETE FROM tb_user_dni where tb_user_dni.interactionID = discordID; END if;
INSERT INTO tb_user_dni(interactionID,doc) VALUE (discordID,document);
SELECT LAST_INSERT_ID() AS 'current_id';
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_gamer_data.sp_update_ticket-atention
DELIMITER //
CREATE PROCEDURE `sp_update_ticket-atention`(
	IN `idAsesor` CHAR(25),
	IN `currentId` INT
)
    COMMENT 'actualiza con la info del asesor que atendra al cliente'
BEGIN
UPDATE tb_registro_atencion 
SET 
tb_registro_atencion.`adviser_i-id_init` = idAsesor ,
tb_registro_atencion.estado = "en atencion" ,
tb_registro_atencion.time_init = current_timestamp()
WHERE tb_registro_atencion._id = currentId;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_gamer_data.sp_validate_interaction-doc
DELIMITER //
CREATE PROCEDURE `sp_validate_interaction-doc`(
	IN `document` CHAR(15),
	IN `interaction` CHAR(25)
)
    COMMENT 'valida si existe alguna interaccion por el documento ingresado'
BEGIN
DECLARE registrogamerxdoc INT;
DECLARE registrogamerxinteraction INT;
SET registrogamerxdoc = (SELECT COUNT(*) FROM tb_user_dni WHERE doc = document);
SET registrogamerxinteraction = (SELECT COUNT(*) FROM tb_user_dni WHERE tb_user_dni.interactionID = interaction);
if (registrogamerxdoc > 0) OR (registrogamerxinteraction > 0)
then  SELECT TRUE AS "validate",registrogamerxdoc AS "ret_doc",registrogamerxinteraction AS "ret_interaction";
ELSEif (registrogamerxdoc = 0) OR (registrogamerxinteraction = 0)
then  SELECT FALSE AS "validate",registrogamerxdoc AS "ret_doc",registrogamerxinteraction AS "ret_interaction";
ELSE SELECT "error" AS "validate",tb_user_dni.interactionID AS 'interaccion' FROM tb_user_dni WHERE tb_user_dni.doc = document ;
END if;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_gamer_data.sp_validate_tktpendiente
DELIMITER //
CREATE PROCEDURE `sp_validate_tktpendiente`(
	IN `doc` CHAR(15)
)
    COMMENT 'valida si el usuario que ingreso el dni tiene un duplicado de canales'
BEGIN

SELECT 
tb_registro_atencion.channel_id ,
tb_registro_atencion.time_create ,
tb_registro_atencion.`adviser_i-id_init`,
tb_registro_atencion.time_init
FROM tb_registro_atencion
WHERE	
tb_registro_atencion.estado = "en atencion" OR
tb_registro_atencion.estado = "pendiente" AND
tb_registro_atencion.document = doc  
;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
