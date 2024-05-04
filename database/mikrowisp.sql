DELETE FROM `tb_microwisp`;

LOAD DATA
    LOCAL INFILE '../uploads/mikrowispGlobal.csv' INTO
TABLE
    `bd_numeracion`.`tb_microwisp` FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (
        @ColVar0,
        `estado`,
        `nombre`,
        `cedula`,
        `instalado`,
        `plan`,
        `correo`,
        `movil`,
        `direccion`,
        `contratista`,
        `pppuser`,
        `mac`,
        `potencia`,
        `codigocliente`,
        `mesh1`,
        `mesh2`,
        `mesh3`,
        `mesh4`,
        `box`,
        `phone`,
        `nodo`,
        `caja_nap`,
        `puerto_nap`,
        `puerto_logico`,
        `modelo_ont`,
        `SN`,
        `sipuser`,
        `tel`,
        `instalacion`,
        `plan_voip`,
        `zona`
    )
SET `id` =
REPLACE(
        REPLACE (@ColVar0, ',', ''),
            '.',
            '.'
    );

INSERT INTO
    tb_log(type_operation)
VALUES (
        'REFRESH_DATA_TB_MIKROWISP_WIN'
    );