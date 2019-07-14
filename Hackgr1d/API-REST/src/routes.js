const express = require('express');
const routes = express.Router();
const Controller = require("./controllers/Controller")
//Servicos Routes
routes.get('/profile/:cpf', Controller.getProfile);
module.exports = routes;