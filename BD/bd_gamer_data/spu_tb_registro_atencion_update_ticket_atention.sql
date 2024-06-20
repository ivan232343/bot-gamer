/****************************************************************'*
*Nombre SP : spu_tb_registro_atencion_update_ticket_atention
* Propósito : registra al asesor que atendera la atencion del cliente
* Input : 
idAsesor -> id de interaccion del asesor
currentId -> id de la fila a modificar
* Output : 
no tiene
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
*****************************************************************/


-- Volcando estructura para procedimiento bd_gamer_data.spu_tb_registro_atencion_update_ticket_atention
DELIMITER //
CREATE PROCEDURE `spu_tb_registro_atencion_update_ticket_atention`(
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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
