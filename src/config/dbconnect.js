const mysql = require('mysql');
con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "locadora"
})
module.exports = con;