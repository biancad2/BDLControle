const express = require('express');
const routes = require('./routes')
const cors = require('cors');
var bodyParser = require("body-parser")

const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

server.use(routes);

server.use('/user', routes)


server.listen(3333, function(){
    console.log("Server is running");
});