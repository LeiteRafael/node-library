mysql = require('mysql'),
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345",
        database: "locadora"
    })
con.connect(function (err) {
    if (err) throw err;
});

module.exports = {
    async CreateUser(request, response) {
        const { nome, email, senha } = request.body;
        con.query("INSERT INTO locadora.usuario (nome, email, senha) VALUES (?,?,?)",['nome'],['email'],['senha'], function (err, result, fields) {
            if (err) return  response.json(err);
            return response.json(result);
        });
    }
}