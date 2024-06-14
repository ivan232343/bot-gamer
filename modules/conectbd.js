/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * modulo conector para la base de datos *mysql*
 */
const { LOCAL_HOST, LOCAL_USER, LOCAL_PASSWORD, LOCAL_DB, LOCAL_PORT } = require('../config.json');
const { REMOTE_HOST, REMOTE_USER, REMOTE_PASSWORD, REMOTE_DB, REMOTE_PORT } = require('../config.json');
const mysql = require('mysql');
const { consoleLog } = require('./necesarios');
const LOCAL_CREDENTIALS = {
    host: LOCAL_HOST,
    user: LOCAL_USER,
    password: LOCAL_PASSWORD,
    database: LOCAL_DB,
    port: LOCAL_PORT
}
const REMOTE_CREDENTIALS = {
    host: REMOTE_HOST,
    user: REMOTE_USER,
    password: REMOTE_PASSWORD,
    database: REMOTE_DB,
    port: REMOTE_PORT
}
const myObject = {
    local: function (querybd) {
        return new Promise((resolve, reject) => {
            const CONNECT_BD = mysql.createConnection(LOCAL_CREDENTIALS);
            CONNECT_BD.connect((err) => {
                if (err) reject(err);
                consoleLog('Connected local!');
                CONNECT_BD.query(querybd, (error, results, fields) => {
                    CONNECT_BD.end();
                    try {
                        const DATA_RES = { resultados: results, columnas: fields, errores: error }
                        consoleLog("errores:", error)
                        consoleLog("resultados:", results)
                        resolve(DATA_RES)

                    } catch (err) {
                        const ERROR_RES = { errorC: err, errorQ: error }
                        consoleLog("error Client:", err)
                        consoleLog("errorQ", error)
                        reject(ERROR_RES)
                    }
                })
            });
        })
    },
    remote: function (querybd) {
        return new Promise((resolve, reject) => {
            const CONNECT_BD = mysql.createConnection(REMOTE_CREDENTIALS);
            CONNECT_BD.connect((err) => {
                if (err) reject(err);
                consoleLog('Connected remote!');
                CONNECT_BD.query(querybd, (error, results, fields) => {
                    CONNECT_BD.end();
                    try {
                        const DATA_RES = { resultados: results, columnas: fields, errores: error }
                        consoleLog("errores:", error)
                        consoleLog("resultados:", results)
                        resolve(DATA_RES)
                    } catch (err) {
                        const ERROR_RES = { errorC: err, errorQ: error }
                        consoleLog("error Client:", err)
                        consoleLog("errorQ", error)
                        reject(ERROR_RES)
                    }
                })
            });
        })

    }
};
module.exports = myObject;

