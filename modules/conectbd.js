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
            const connection = mysql.createConnection(credentials);
            connection.connect((err) => {
                if (err) reject(err);
                console.log('Connected!');
                connection.query(querybd, (error, results, fields) => {
                    connection.end();
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

