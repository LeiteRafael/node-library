mysql = require('mysql'),
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "locadora"
    })
con.connect(function (err) {
    if (err) throw err;
});

module.exports = {
    async All(request, response) {
        con.query("SELECT * FROM filme", function (err, result, fields) {
            if (err) return  response.json(err);
            return response.json(result);
        });
    },
    async FindByTitle(request, response) {
        con.query("SELECT * FROM filme where  titulo like ? " ,['Sonic%'], function (err, result, fields) {
            if (err) return  response.json(err);
            return response.json(result);
        });
    }
}