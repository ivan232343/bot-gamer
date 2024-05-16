/**
 * Nombre de usuario: Ivan Gabriel Pulache Chiroque
 * Cod proyecto: proy-0035-2024-exp-win-revision-implementacion-discord-para-plan-gamer
 * fecha: 15/05/2024
 * motivo: 
 * modulo conector para la base de datos *mysql*
 */
const { host, user, password, database } = require('../config.json');
const mysql = require('mysql');
const credentials = {
    host: host,
    user: user,
    password: password,
    database: database
}
const myObject = {
    get: function (querybd) {
        return new Promise((resolve, reject) => {
            const CONNECT_BD = mysql.createConnection(credentials);
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

