/****************************************************************'*
*Nombre SP : spu_tb_registro_atencion_close_ticket
* Propósito : registra el cierre de cada atencion 
* Input : 
idAsesor -> id de usuario de discord del asesor
ticket -> ticket de crm 
currentId -> id de la fila a modificar
* Output : 
document, ->
`user_i-id_init` AS "user_id" -> id de discord que creo el ticket para la atencion 
time_create -> hora a la que fue creada
`adviser_i-id_init` AS "asesor_take" -> id de discord que tomo el ticket
time_init -> hora a la que tomada
`adviser_i-id_close` AS "asesor_close" -> id de discord que cerro la atencion 
time_close -> fecha y hora a la que se cerro
ticket_crm_assoc -> ticket de crm que se coloco
motivo -> motivo de la consulta
observaciones -> observacion del cliente
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
*****************************************************************/

-- Volcando estructura para procedimiento bd_gamer_data.spu_tb_registro_atencion_close_ticket
DELIMITER //
CREATE PROCEDURE `spu_tb_registro_atencion_close_ticket`(
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
