/****************************************************************'*
*Nombre SP : sps_tb_registro_atencion_validate_tktpendiente
* Propósito : valida si hay un canal en atendion, o si el cliente ya solicito una atencion anteriormente y no fue cerrado
* Input : 
doc -> documento del cliente
* Output : 
estado -> estado del ticket 
channel_id ->  canal donde esta siendo atendido
time_create ->  hora de creacion
`adviser_i-id_init` -> id del asesor que lo esta atendiendo 
time_init  ->  hora que lo empezo a atender
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
*****************************************************************/


-- Volcando estructura para procedimiento bd_gamer_data.sps_tb_registro_atencion_validate_tktpendiente
DELIMITER //
CREATE PROCEDURE `sps_tb_registro_atencion_validate_tktpendiente`(
	IN `doc` CHAR(15)
)
    COMMENT 'valida si el usuario que ingreso el dni tiene un duplicado de canales'
BEGIN
SELECT 
tb_registro_atencion.estado,
tb_registro_atencion.channel_id ,
tb_registro_atencion.time_create ,
tb_registro_atencion.`adviser_i-id_init`,
tb_registro_atencion.time_init
FROM tb_registro_atencion
WHERE	
tb_registro_atencion.document = doc AND (tb_registro_atencion.estado = "pendiente" OR tb_registro_atencion.estado ="en atencion")
;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
