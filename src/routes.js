const {Router} = require('express');
const MovieController = require('./controller/MovieController.js')

const routes = Router();

routes.get('/All', MovieController.All);
routes.get('/Title', MovieController.FindByTitle);

module.exports = routes ;   