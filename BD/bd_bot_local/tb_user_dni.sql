ALTER TABLE `tb_user_dni`
	ADD COLUMN `nombre` CHAR(15) NULL DEFAULT NULL AFTER `doc`,
	DROP COLUMN `nombre`;
