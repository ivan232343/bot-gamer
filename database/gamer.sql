DELETE FROM tb_gamers_win;

LOAD DATA
    LOCAL INFILE "../uploads/gamersGlobal.csv" INTO
TABLE
    tb_gamers_win FIELDS TERMINATED BY ';' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (
	`codPedido`,
	`doc`
	);

INSERT INTO
    tb_log(type_operation)
VALUES (
        'REFRESH_DATA_TB_GAMERS_WIN'
    );