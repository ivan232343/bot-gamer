/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * backup de la base de datos,  crea usuario y brinda permisos necesarios
 */
CREATE USER 'ejecutor-gamer'@'localhost' IDENTIFIED BY 'vi1uMa2AXu67';
GRANT USAGE ON *.* TO 'ejecutor-gamer'@'localhost';
GRANT SELECT  ON TABLE `bd_gamer_data`.`tb_gamers_win` TO 'ejecutor-gamer'@'localhost';
GRANT INSERT, UPDATE, CREATE  ON TABLE `bd_gamer_data`.`tb_gamers_win` TO 'ejecutor-gamer'@'localhost';
GRANT SELECT, INSERT, UPDATE  ON TABLE `bd_gamer_data`.`tb_user_dni` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_close_ticket` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_init_ticket` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_register_interaction-doc` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_update_ticket-atention` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_validate_gamer-to-init` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_validate_interaction-doc` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_validate_serv-gamer` TO 'ejecutor-gamer'@'localhost';
GRANT EXECUTE  ON PROCEDURE `bd_gamer_data`.`sp_validate_tktpendiente` TO 'ejecutor-gamer'@'localhost';
FLUSH PRIVILEGES;