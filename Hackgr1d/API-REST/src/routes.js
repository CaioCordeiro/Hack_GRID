const express = require('express');
const routes = express.Router();
const Controller = require("./controllers/Controller")
//Servicos Routes
routes.get('/profile/:cpf', Controller.getProfile);
routes.get('/profile/prev/:cpf', Controller.makePrev);
routes.get('/profile/model/:renda/:genero/:filhos/:idade',Controller.sendToModel);
module.exports = routes;