const mysql = require('mysql');
con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
})
module.exports = con;