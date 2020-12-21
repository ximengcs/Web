var config = require("../../config/config");
var mysql = require("../db/Mysql");
var connection = mysql.createConnection(config.Mysql);
connection.connect();

class DBConnection {
    static query(statement) {
        return new Promise((resolve, reject)=>{
            connection.query(statement, function (error, results, fields) {
                if (error)
                    reject(error);
                resolve(results);
            });
        });
    }
}

module.exports = DBConnection;