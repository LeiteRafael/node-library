const {Router} = require('express');
const MovieController = require('./controller/MovieController.js')
const UserController = require('./controller/UserController.js')

const routes = Router();

routes.get('/list/all', MovieController.All);
routes.get('/list/availables', MovieController.Availables);
routes.post('/title', MovieController.FindByTitle);
routes.post('/rent', MovieController.RentMovie);

routes.post('/create', UserController.CreateUser);

module.exports = routes ;   