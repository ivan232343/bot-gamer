/****************************************************************'*
*Nombre SP : spi_tb_registro_atencion_init_ticket
* Propósito : registra la atencion para ser atendido e crear el canal
* Input : 
ch -> id del canal donde sera atendido
doc -> documento del cliente
motivo -> motivo de consulta
detalles -> detalle de la consulta 
clientId -> id de interaccion del cliente
* Output : 
current_id -> id de la tabla recien creada
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
*****************************************************************/

-- Volcando estructura para procedimiento bd_gamer_data.spi_tb_registro_atencion_init_ticket
DELIMITER //
CREATE PROCEDURE `spi_tb_registro_atencion_init_ticket`(
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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
