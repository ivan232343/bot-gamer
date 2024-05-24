/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * modulo conector para la base de datos *mysql*
 */
const { LOCAL_HOST, LOCAL_USER, LOCAL_PASSWORD, LOCAL_DB } = require('../config.json');
const { REMOTE_HOST, REMOTE_USER, REMOTE_PASSWORD, REMOTE_DB } = require('../config.json');
const mysql = require('mysql');
const LOCAL_CREDENTIALS = {
    host: LOCAL_HOST,
    user: LOCAL_USER,
    password: LOCAL_PASSWORD,
    database: LOCAL_DB
}
const REMOTE_CREDENTIALS = {
    host: REMOTE_HOST,
    user: REMOTE_USER,
    password: REMOTE_PASSWORD,
    database: REMOTE_DB
}
const myObject = {
    local: function (querybd) {
        return new Promise((resolve, reject) => {
            const CONNECT_BD = mysql.createConnection(LOCAL_CREDENTIALS);
            CONNECT_BD.connect((err) => {
                if (err) reject(err);
                console.log('Connected!');
                CONNECT_BD.query(querybd, (error, results, fields) => {
                    CONNECT_BD.end();
                    try {
                        resolve({ resultados: results, columnas: fields, errores: error })
                    } catch (err) {
                        reject({ errorC: err, errorQ: error })
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
                console.log('Connected!');
                CONNECT_BD.query(querybd, (error, results, fields) => {
                    CONNECT_BD.end();
                    try {
                        resolve({ resultados: results, columnas: fields, errores: error })
                    } catch (err) {
                        reject({ errorC: err, errorQ: error })
                    }
                })
            });
        })

    }
};
module.exports = myObject;

