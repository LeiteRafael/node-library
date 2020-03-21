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
    async All(request, response) {
        con.query("SELECT * FROM filme", function (err, result, fields) {
            if (err) return response.json(err);
            return response.json(result);
        });
    },
    async FindByTitle(request, response) {
        con.query("SELECT * FROM filme where  titulo like ? ", ['Sonic%'], function (err, result, fields) {
            if (err) return response.json(err);
            return response.json(result);
        });
    },
    async Availables(request, response) {
        con.query("Select * from filme where qtd_disponivel > 1", function (err, result, fields) {
            if (err) return response.json(err);
            return response.json(result);
        });
    },
    async RentMovie(request, response) {
        const idfilme =  request.query.idfilme;     
        console.log(idfilme)   
        con.query("Select qtd_disponivel from filme where idfilme = ?",[idfilme],
            function (err, result, fields) {
                if (err) return response.json(err);
                if (result[0]['qtd_disponivel'] > 0) {
                    con.query("INSERT INTO aluguel (idfilme, idusuario, situacao, datainicio, datefim) VALUES (?, '1', 'Alugado', '20200202', '20200202')",[idfilme],
                        function (err, result, fields) {
                            if (err) return response.json(err);
                            return response.json(result);
                        });
                } else {
                    return response.json({ "msg": "Este filme nao possui disponibilidade para aluguel" });
                }
            }
        );
    }

    //INSERT INTO aluguel values(null,'3', '1', 'Alugado', '20200202', '20200202') ; 
}