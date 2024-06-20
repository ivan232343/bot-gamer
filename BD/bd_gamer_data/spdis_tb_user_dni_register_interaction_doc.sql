/****************************************************************'*
*Nombre SP : spdis_tb_user_dni_register_interaction_doc
* Propósito : registra el usuario con su id de discord al dni que coloco para la asignacion de rol dentro del servidor
* Input : 
discordID -> id de usuario de discord
document -> documento de identidad
nombre -> nombre del usuario
* Output : 
current_id -> id del registro recien creado
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
*****************************************************************/

-- Volcando estructura para procedimiento bd_gamer_data.spdis_tb_user_dni_register_interaction_doc
DELIMITER //
CREATE PROCEDURE `spdis_tb_user_dni_register_interaction_doc`(
	IN `discordID` VARCHAR(50),
	IN `document` CHAR(15),
	IN `nombre` VARCHAR(250)
)
    COMMENT 'asocia la interaccion id del usuario a un dni '
BEGIN
DECLARE duplicado INT;
DECLARE interaction INT;
SET duplicado = (SELECT COUNT(doc) FROM tb_user_dni WHERE tb_user_dni.doc = document);
SET interaction = (SELECT COUNT(interactionID) FROM tb_user_dni WHERE tb_user_dni.interactionID = discordID);
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
