const express = require('express');
var mySQL = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const routes = express.Router();
routes.use(cors());
const User = require('./models/User');

process.env.SECRET_KEY = 'secret';


var connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Amobolo@225',
    database: 'db_controle_frota'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected to MySQL Server!");
});

routes.get("/empresas", function(req, res){
    connection.query('select * from tb_empresa', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/empresas/:id", function(req, res){
    connection.query('select * from tb_empresa where id_empresa = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});


routes.get("/empresas-cnpj/:cnpj", function(req, res){
    connection.query("select * from tb_empresa where cd_cnpj like '" + req.params.cnpj + "%'", [req.params.cnpj], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/empresas", function(req, res){
    connection.query('insert tb_empresa set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/empresas/:id", function(req, res){
    connection.query('delete from tb_empresa where id_empresa = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/empresas/:id", function(req, res){
    connection.query('update tb_empresa set ? where id_empresa = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/veiculos", function(req, res){
    connection.query('select * from tb_veic', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/veiculos/:id", function(req, res){
    connection.query('select * from tb_veic where id = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/veiculos", function(req, res){
    connection.query('insert tb_veic set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/veiculos/:id", function(req, res){
    connection.query('delete from tb_veic where id = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/veiculos/:id", function(req, res){
    connection.query('update tb_veic set ? where id = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/motoristas", function(req, res){
    connection.query('select * from tb_motorista', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/motoristas/:id", function(req, res){
    connection.query('select * from tb_motorista where id_motorista = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/motoristas", function(req, res){
    connection.query('insert tb_motorista set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/motoristas/:id", function(req, res){
    connection.query('delete from tb_motorista where id_motorista = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/motoristas/:id", function(req, res){
    connection.query('update tb_motorista set ? where id_motorista = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/viagens", function(req, res){
    connection.query('select * from tb_viagem', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/viagens/:id", function(req, res){
    connection.query('select * from tb_viagem where id_viagem = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/viagens", function(req, res){
    connection.query('insert tb_viagem set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/viagens/:id", function(req, res){
    connection.query('delete from tb_viagem where id_viagem = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/viagens/:id", function(req, res){
    connection.query('update tb_viagem set ? where id_viagem = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.post("/sessions", function(req, res){
    connection.query('insert tb_viagem set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});








routes.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        nm_usuario: req.body.nm_usuario,
        nm_sobrenome: req.body.nm_sobrenome,
        email: req.body.email,
        password: req.body.password,
        cd_cpf: req.body.cd_cpf,
        cd_rg: req.body.cd_rg,
        nr_telefone: req.body.nr_telefone,
        created: today
    };

    User.findOne({
      where: {
        email: req.body.email
      }
    })
      //TODO bcrypt
      .then(user => {
        if (!user) {
            req.body.password = req.body.cd_cpf;
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                res.json({ status: user.email + 'Registered!' })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  
  routes.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.send(token)
          }
        } else {
          res.status(400).json({ error: 'User does not exist' })
        }
      })
      .catch(err => {
        res.status(400).json({ error: err })
      })
  })
  
  routes.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    User.findOne({
      where: {
        id_usuario: decoded.id
      }
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
  

module.exports = routes;