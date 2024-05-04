DELETE FROM tb_numeracion_win;

LOAD DATA
    LOCAL INFILE "../uploads/numeracionGlobal.csv" INTO
TABLE
    tb_numeracion_win FIELDS TERMINATED BY ';' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (
	`_id`,
	`cliente`,
	`documento`,
	`numero`,
	`estado`,
	`departamento`,
	`fecha_alta`,
	`operador`,
	`pass_uc`,
	`observacion`,
	`tipo`
	
    );

INSERT INTO
    tb_log(type_operation)
VALUES (
        'REFRESH_DATA_TB_NUMERACION_WIN'
    );