const {Router} = require('express');
const MovieController = require('./controller/MovieController.js')
const UserController = require('./controller/UserController.js')

const routes = Router();

const midLogin = function (req, res, next) {
    sessionLogin = req.session;
    if (sessionLogin.user) {
        next()
    } else {
        return res.json({"msg":"Acesso restrito"})
    }
}

routes.get('/list/all', midLogin, MovieController.All);
routes.get('/list/availables',midLogin , MovieController.Availables);
routes.get('/title', midLogin, MovieController.FindByTitle);
routes.post('/rent',midLogin, MovieController.RentMovie);
routes.post('/return',midLogin, MovieController.ReturnMovie);

routes.post('/create', UserController.CreateUser);
routes.post('/login', UserController.Login);
routes.post('/logoff', UserController.Logoff);

module.exports = routes ;   