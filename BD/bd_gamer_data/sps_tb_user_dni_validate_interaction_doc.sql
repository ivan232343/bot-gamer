/****************************************************************'*
*Nombre SP : sps_tb_user_dni_validate_interaction_doc
* Propósito : valida si el documento ingresado ya fue ingresado por otro usuario
* Input : 
document -> documento del cliente
interaction -> id de usuario de discord
* Output : 
current_id -> id de la tabla recien creada
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
*****************************************************************/

-- Volcando estructura para procedimiento bd_gamer_data.sps_tb_user_dni_validate_interaction_doc
DELIMITER //
CREATE PROCEDURE `sps_tb_user_dni_validate_interaction_doc`(
	IN `document` CHAR(15),
	IN `interaction` CHAR(25)
)
    COMMENT 'valida si existe alguna interaccion por el documento ingresado'
BEGIN
DECLARE registrogamerxdoc INT;
DECLARE registrogamerxinteraction INT;
SET registrogamerxdoc = (SELECT COUNT(doc) FROM tb_user_dni WHERE doc = document);
SET registrogamerxinteraction = (SELECT COUNT(interactionID) FROM tb_user_dni WHERE tb_user_dni.interactionID = interaction);
if (registrogamerxdoc > 0) OR (registrogamerxinteraction > 0)
then  SELECT TRUE AS "validate",registrogamerxdoc AS "ret_doc",registrogamerxinteraction AS "ret_interaction";
ELSEif (registrogamerxdoc = 0) OR (registrogamerxinteraction = 0)
then  SELECT FALSE AS "validate",registrogamerxdoc AS "ret_doc",registrogamerxinteraction AS "ret_interaction";
ELSE SELECT "error" AS "validate",tb_user_dni.interactionID AS 'interaccion' FROM tb_user_dni WHERE tb_user_dni.doc = document ;
END if;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
