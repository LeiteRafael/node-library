const con = require('../config/dbconnect');
const session = require('express-session');

con.getConnection(function (err) {
    if (err) throw err
});

module.exports = {
    async All(request, response) {
        con.query("SELECT * FROM filme",
            function (err, result, fields) {
                if (err) return response.json(err);
                return response.json(result);
            });
    },

    async FindByTitle(request, response) {
        const nomefilme = request.query.nomefilme;
        con.query(`SELECT * FROM filme where  titulo like '${nomefilme}%'`,
            function (err, result, fields) {
                if (err) return response.json(err);
                return response.json(result);
            });
    },

    async Availables(request, response) {
        con.query("Select * from filme where qtd_disponivel > 1",
            function (err, result, fields) {
                if (err) return response.json(err);
                return response.json(result);
            });
    },

    async RentMovie(request, response) {
        const sessionLogin = request.session;
        const idfilme = request.query.idfilme;
        const idusuario = sessionLogin.user.id;
        const date = new Date();
        const dataAtual = date.toISOString().split("T")[0];
        date.setDate(date.getDate() + 3); 
        const dataEntrega = date.toISOString().split("T")[0];
        con.query(`Select * from filme where idfilme = ${idfilme} `,
            function (err, result_filme, fields) {
                if (err) return response.json(err);
                if (result_filme[0]['qtd_disponivel'] > 0) {

                    con.query(`INSERT INTO aluguel (idfilme, idusuario, situacao, datainicio, datefim) 
                    VALUES ("${idfilme}", "${idusuario}", 'Alugado',"${dataAtual}","${dataEntrega}")`,
                        function (err, result_aluguel, fields) {
                            if (err) return response.json(err);
                            return response.json({ "filme alugado": result_filme[0]['titulo'] });
                        });
                } else {
                    return response.json({ "msg": "Este filme nao possui disponibilidade para aluguel" });
                }
            }
        );
    },

    async ReturnMovie(request, response) {
        const sessionLogin = request.session;
        const idfilme = request.query.idfilme;
        const idusuario = sessionLogin.user.id;
        con.query(`Select Min(idaluguel) as idaluguel 
                    from aluguel where idfilme = ${idfilme} 
                    and idusuario = ${idusuario}  
                    and situacao ='Alugado'`,
            function (err, result_aluguel, fields) {
                if (err) return response.json(err);
                if (result_aluguel[0]['idaluguel'] > 0) {
                    const idaluguel = result_aluguel[0]['idaluguel']
                    con.query(`UPDATE aluguel SET situacao = 'Devolvido' WHERE idaluguel = ${idaluguel}`,
                        function (err, result, fields) {
                            if (err) return response.json(err);
                            return response.json({ "msg": "filme devolvido" });
                        });
                } else {
                    return response.json({ "msg": "Este filme nao foi alugado por voce" });
                }
            });
    }
}