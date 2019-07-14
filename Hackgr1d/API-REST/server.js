const express = require('express');
const requireDir = require('require-dir');
var bodyParser = require('body-parser');
//Inniciando o app
const app = express();
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(express.json());

//Primeira rota
app.use("/api",require("./src/routes"))

app.listen(3001);