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


-- Volcando estructura de base de datos para bd_numeracion
DROP DATABASE IF EXISTS `bd_numeracion`;
CREATE DATABASE IF NOT EXISTS `bd_numeracion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bd_numeracion`;

-- Volcando estructura para tabla bd_numeracion.tb_distrito
DROP TABLE IF EXISTS `tb_distrito`;
CREATE TABLE IF NOT EXISTS `tb_distrito` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_distrito` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_gamers_win
DROP TABLE IF EXISTS `tb_gamers_win`;
CREATE TABLE IF NOT EXISTS `tb_gamers_win` (
  `_id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `codPedido` varchar(20) DEFAULT NULL,
  `doc` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_log
DROP TABLE IF EXISTS `tb_log`;
CREATE TABLE IF NOT EXISTS `tb_log` (
  `id_Trasnc` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `type_operation` varchar(50) DEFAULT NULL,
  `execute_timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_Trasnc`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_microwisp
DROP TABLE IF EXISTS `tb_microwisp`;
CREATE TABLE IF NOT EXISTS `tb_microwisp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `cedula` varchar(50) DEFAULT NULL,
  `instalado` varchar(50) DEFAULT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `movil` varchar(10) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `contratista` varchar(50) DEFAULT NULL,
  `pppuser` varchar(50) DEFAULT NULL,
  `mac` varchar(50) DEFAULT NULL,
  `potencia` varchar(50) DEFAULT NULL,
  `codigocliente` varchar(50) DEFAULT NULL,
  `mesh1` varchar(50) DEFAULT NULL,
  `mesh2` varchar(50) DEFAULT NULL,
  `mesh3` varchar(50) DEFAULT NULL,
  `mesh4` varchar(50) DEFAULT NULL,
  `box` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `nodo` varchar(50) DEFAULT NULL,
  `caja_nap` varchar(50) DEFAULT NULL,
  `puerto_nap` varchar(50) DEFAULT NULL,
  `puerto_logico` varchar(50) DEFAULT NULL,
  `modelo_ont` varchar(50) DEFAULT NULL,
  `SN` varchar(50) DEFAULT NULL,
  `sipuser` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `instalacion` varchar(50) DEFAULT NULL,
  `plan_voip` varchar(50) DEFAULT NULL,
  `zona` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=622248 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_nodo
DROP TABLE IF EXISTS `tb_nodo`;
CREATE TABLE IF NOT EXISTS `tb_nodo` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `locacion_fisica` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_numeracion_win
DROP TABLE IF EXISTS `tb_numeracion_win`;
CREATE TABLE IF NOT EXISTS `tb_numeracion_win` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(100) DEFAULT NULL,
  `documento` char(13) DEFAULT NULL,
  `numero` char(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `departamento` varchar(50) DEFAULT NULL,
  `fecha_alta` varchar(15) DEFAULT NULL,
  `operador` varchar(50) DEFAULT NULL,
  `pass_uc` varchar(25) DEFAULT NULL,
  `observacion` varchar(150) DEFAULT 'sin observaciones',
  `tipo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80813 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_tokens_mail
DROP TABLE IF EXISTS `tb_tokens_mail`;
CREATE TABLE IF NOT EXISTS `tb_tokens_mail` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `token` blob DEFAULT NULL,
  `real_pswd` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_users
DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE IF NOT EXISTS `tb_users` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `apellido` varchar(50) NOT NULL DEFAULT '0',
  `id_user_discord` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_users_mail
DROP TABLE IF EXISTS `tb_users_mail`;
CREATE TABLE IF NOT EXISTS `tb_users_mail` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `recovery_q` varchar(50) DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `last_modified` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bd_numeracion.tb_users_role
DROP TABLE IF EXISTS `tb_users_role`;
CREATE TABLE IF NOT EXISTS `tb_users_role` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(50) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para procedimiento bd_numeracion.sp_cr_last_connection
DROP PROCEDURE IF EXISTS `sp_cr_last_connection`;
DELIMITER //
CREATE PROCEDURE `sp_cr_last_connection`()
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
DECLARE hola int;
SELECT DATEDIFF(CURRENT_TIMESTAMP(),`fun_get_last_connection`()) INTO hola;
if hola <> 0 THEN
INSERT INTO tb_log(tb_log.type_operation) VALUES ('INIT_BOT_ON_DAY');
SELECT FALSE AS 'session';
ELSE
SELECT TRUE AS 'session';
END IF;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_dnitocodcl
DROP PROCEDURE IF EXISTS `sp_dnitocodcl`;
DELIMITER //
CREATE PROCEDURE `sp_dnitocodcl`(
	IN `dni` VARCHAR(50)
)
BEGIN
SELECT tb_microwisp.pppuser AS 'coduser' ,tb_microwisp.nombre FROM tb_microwisp WHERE tb_microwisp.cedula = dni;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_get_client_info
DROP PROCEDURE IF EXISTS `sp_get_client_info`;
DELIMITER //
CREATE PROCEDURE `sp_get_client_info`(
	IN `dni` VARCHAR(20)
)
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
SELECT 
	tb_microwisp.nombre 
FROM tb_microwisp 
WHERE LPAD(tb_microwisp.cedula,8,'0') = dni;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_get_last_update
DROP PROCEDURE IF EXISTS `sp_get_last_update`;
DELIMITER //
CREATE PROCEDURE `sp_get_last_update`(
	IN `tb` VARCHAR(50)
)
BEGIN
SELECT execute_timestamp from tb_log WHERE id_Trasnc = fun_get_last_modified(tb);
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_read_dnixmw
DROP PROCEDURE IF EXISTS `sp_read_dnixmw`;
DELIMITER //
CREATE PROCEDURE `sp_read_dnixmw`(
	IN `dni` VARCHAR(150)
)
BEGIN
SELECT
tb_microwisp.nombre ,
tb_microwisp.cedula AS 'cedula',
tb_microwisp.mac AS 'mac',
tb_microwisp.nodo AS 'nodo',
tb_microwisp.caja_nap AS 'cto'
from tb_microwisp 
WHERE 
tb_microwisp.cedula = dni OR  
tb_microwisp.mac  = dni OR
tb_microwisp.movil  = dni OR
tb_microwisp.caja_nap = dni OR 
tb_microwisp.nodo  LIKE  CONCAT('%',dni,'%') OR 
tb_microwisp.nombre LIKE  CONCAT('%',dni,'%') OR 
tb_microwisp.pppuser = dni
LIMIT 10
;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_read_docxname_all
DROP PROCEDURE IF EXISTS `sp_read_docxname_all`;
DELIMITER //
CREATE PROCEDURE `sp_read_docxname_all`(
	IN `dni` VARCHAR(200)
)
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
SELECT tb_numeracion_win.*,`log`.execute_timestamp AS lastexecute
from tb_numeracion_win 
INNER JOIN tb_log AS `log` 
WHERE `log`.id_Trasnc = fun_get_last_modified("NUMERACION_WIN") and tb_numeracion_win.cliente LIKE CONCAT('%',dni,'%') LIMIT 5;

END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_read_num
DROP PROCEDURE IF EXISTS `sp_read_num`;
DELIMITER //
CREATE PROCEDURE `sp_read_num`(
	IN `dni` VARCHAR(50)
)
    READS SQL DATA
    COMMENT 'retorna los datos del dni en consulta'
BEGIN
SELECT tb_numeracion_win.*
from tb_numeracion_win 
WHERE tb_numeracion_win.documento = dni 
OR tb_numeracion_win.cliente LIKE CONCAT('%',dni,'%')
LIMIT 9
;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_save_user
DROP PROCEDURE IF EXISTS `sp_save_user`;
DELIMITER //
CREATE PROCEDURE `sp_save_user`(
	IN `_mail_user` VARCHAR(50),
	IN `_pass_user` VARCHAR(50),
	IN `_gen_token` VARCHAR(50)
)
    MODIFIES SQL DATA
BEGIN
INSERT INTO tb_users_mail(tb_users_mail.correo,tb_users_mail.`password`,tb_users_mail._token_pwd) VALUES 
(_mail_user,_pass_user,PASSWORD(_gen_token));
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_validate_gamer
DROP PROCEDURE IF EXISTS `sp_validate_gamer`;
DELIMITER //
CREATE PROCEDURE `sp_validate_gamer`(
	IN `dni` VARCHAR(20)
)
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
SELECT * FROM tb_gamers_win WHERE tb_gamers_win.doc = dni;
END//
DELIMITER ;

-- Volcando estructura para procedimiento bd_numeracion.sp_validate_user
DROP PROCEDURE IF EXISTS `sp_validate_user`;
DELIMITER //
CREATE PROCEDURE `sp_validate_user`(
	IN `_token_pass` VARCHAR(50),
	IN `_mail` VARCHAR(50)
)
BEGIN
if EXISTS(SELECT * FROM tb_users_mail WHERE tb_users_mail._token_pwd = PASSWORD(_token_pass) AND tb_users_mail.correo = _mail)
THEN
SELECT 1 AS 'validate';
ELSE
SELECT 0 AS 'validate';
END IF;

END//
DELIMITER ;

-- Volcando estructura para función bd_numeracion.fun_get_last_connection
DROP FUNCTION IF EXISTS `fun_get_last_connection`;
DELIMITER //
CREATE FUNCTION `fun_get_last_connection`() RETURNS datetime
BEGIN
DECLARE ultimo DATETIME;
SELECT tb_log.execute_timestamp INTO ultimo FROM tb_log WHERE tb_log.type_operation = "INIT_BOT_ON_DAY" ORDER BY id_Trasnc DESC LIMIT 1;
RETURN ultimo;
END//
DELIMITER ;

-- Volcando estructura para función bd_numeracion.fun_get_last_modified
DROP FUNCTION IF EXISTS `fun_get_last_modified`;
DELIMITER //
CREATE FUNCTION `fun_get_last_modified`(`tb` VARCHAR(50)
) RETURNS int(11)
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
DECLARE ultimo INT;
SELECT tb_log.id_Trasnc INTO ultimo FROM tb_log WHERE tb_log.type_operation = CONCAT("REFRESH_DATA_TB_",tb,"_WIN") ORDER BY id_Trasnc DESC LIMIT 1;
RETURN ultimo;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
