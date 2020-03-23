const con = require('../config/dbconnect');
const bcrypt = require('bcrypt')
const session = require('express-session');

con.getConnection(function (err) {
    if (err) throw err
});

module.exports = {
    async CreateUser(request, response) {
        const { nome, email, senha } = request.body;
        const hash = await bcrypt.hash(senha, 10)
        con.query(`INSERT INTO locadora.usuario (nome, email, senha) VALUES ("${nome}","${email}","${hash}")`, function (err, result, fields) {
            if (err) return response.json(err);
            return response.json({ "msg": "Usuario cadastrado com sucesso" });
        });
    },

    async Login(request, response) {
        const { email, senha } = request.body;
        const hash = await bcrypt.hash(senha, 10)
        con.query(`Select * from usuario where email = "${email}" `, function (err, result, fields) {
            if (err) return response.json(err);
            if (result.length == 0) {
                return response.json({ "msg": "Usuario nao encontrado" });
            } else {
                bcrypt.compare(senha, result[0]['senha']).then(function (res) {
                    if (res) {
                        sessionLogin = request.session;
                        sessionLogin.user = {};
                        sessionLogin.user.id = result[0]['id'];
                        return response.json({ "msg": "Login efetuado com sucesso" })
                    } else {
                        return response.json({ "msg": "Senha incorreta " })
                    }
                })
            }
        });
    },

    async Logoff(request, response) {
        const sessionLogin = request.session;
        sessionLogin.destroy(function (err) {
            if (err) response.json({ "msg": "Erro ao destruir a Session" });
            response.json({"msg":"Logoff realizado"});
        });
    }
}