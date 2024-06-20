/****************************************************************'*
*Nombre SP : spx_usuarios_gamer_discord_validar_gamer
* Propósito : validar si el cliente es gamer. si es gamer retornara sus datos, si es gamer pero se equivoco en algun dato como el nombre retornara el nombre y el plan(esto solo se ve a nivel interno y es para depuracion),y si no es gamer solo retornara un 0 
* Input : 
name_input-> Nombre que ingresa el cliente para la validacion / texto
document-> documento de identidad que ingresa el cliente para la validacion / texto
plan_input-> plan que ingresa el cliente para la validacion / numero
* Output : 
validate-> valida si es cliente gamer o no / boolean
name_client -> nombre encontrado /texto
plan_contratado -> plan encontrado / texto
los demas campos -> solo si el cliente es gamer se veran los demas campos segun el dni
* Creado por : Ivan Gabriel Pulache Chiroque
* Fec Creación: 15/05/2024
* Fec Actualización: 19/06/2024
*Actualizado por: Ivan Gabriel Pulache Chiroque
*Ticket/Proyecto: PROY-0041-2024/EXP-WIN - Discord - Sprint2
* se agrego los campos restantes de la tabla de usuarios_gamer_discord
*****************************************************************/

-- Volcando estructura para procedimiento bd_win_gamer_data.spx_usuarios_gamer_discord_validar_gamer
DELIMITER //
CREATE PROCEDURE `spx_usuarios_gamer_discord_validar_gamer`(
	IN `name_input` VARCHAR(250),
	IN `document` VARCHAR(20),
	IN `plan_input` INT
)
    COMMENT 'valida si el cliente es gamer o no, segun el dato que coloque saldra 1 si encontro algo, 0 si no encontro nada o 0 con info si encontro algo pero lo ingresado no coincide'
BEGIN
DECLARE name_client VARCHAR(200);
DECLARE plan_contratado INT;
SET name_client = (SELECT usuarios_gamer_discord.NOMBRE FROM usuarios_gamer_discord WHERE usuarios_gamer_discord.NUMDOC = document);
SET plan_contratado = (SELECT usuarios_gamer_discord.velocidad_plan FROM usuarios_gamer_discord WHERE usuarios_gamer_discord.numdoc = document);
if name_client = name_input
then SELECT TRUE AS 'validate', usuarios_gamer_discord.* FROM usuarios_gamer_discord WHERE usuarios_gamer_discord.NUMDOC = document;
ELSE SELECT FALSE AS 'validate', name_client,plan_contratado;
END if;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
