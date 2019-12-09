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

routes.get("/nr-veic", function(req, res){
    connection.query('select COUNT(*) as qt_veiculos from tb_veiculo', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/multa-geral", function(req, res){
    connection.query('select SUM(qt_preco) as qt_multas from tb_multa', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/manutencao-geral", function(req, res){
    connection.query('select SUM(valor_manut) as qt_manutencao from tb_manutencao', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/manutencao-veic/:id", function(req, res){
    connection.query('select SUM(valor_manut) as valor from tb_manutencao where id_veiculo = ? ', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/multa-veic/:id", function(req, res){
    connection.query('select SUM(qt_preco) as valor from tb_multa where id_veiculo = ? ', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/multaGeral-moto/:id", function(req, res){
    connection.query('select SUM(qt_preco) as valor from tb_multa where id_motorista = ? ', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/qtveiculos/", function(req, res){

    connection.query('select COUNT(*) as qt_veiculos, E.nm_empresa, V.id_empresa from tb_veiculo V, tb_empresa E where E.id_empresa = V.id_empresa group by V.id_empresa ', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/qtviagens/:id", function(req, res){

    connection.query('select COUNT(*) as qt_viagens from tb_viagem where id_motorista = ? ', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/frota-veic/:id", function(req, res){

    connection.query('select F.ds_frota, V.ds_placa from tb_frota F, tb_veiculo V where F.id_frota = V.id_frota and id_veiculo = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/empresa-veic/:id", function(req, res){

    connection.query('select E.nm_empresa, V.ds_placa from tb_empresa E, tb_veiculo V where E.id_empresa = V.id_empresa and id_veiculo = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/empresa-moto/:id", function(req, res){

    connection.query('select E.nm_empresa, M.nm_motorista from tb_empresa E, tb_motorista M where E.id_empresa = M.id_empresa and id_motorista = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/empresas", function(req, res){
    connection.query('select * from tb_empresa', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/categorias", function(req, res){
    connection.query('select * from tb_frota', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/categorias/:id", function(req, res){
    connection.query('select * from tb_frota where id_frota = ?', [req.params.id], function(err, rows, fields){
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
routes.get("/motoristas-empresa/:id", function(req, res){
    connection.query('select * from tb_motorista where id_empresa = ?', [req.params.id] ,function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
//routes.get("/veiculos-empresa/:id/:cat", function(req, res){
  //  connection.query('select * from tb_veiculo where id_empresa = ' +  req.params.id + ' and id_frota = ' + req.params.cat, function(err, rows, fields){
    //    if (!err)
      //      res.json(rows);
        //else
          //  res.json(err);
    //})
//});
routes.get("/veiculos-empresa/:id", function(req, res){
    connection.query('select * from tb_veiculo where id_empresa = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/marca-modelo/:id", function(req, res){
    connection.query('select M.marca, Mo.desc_modelo from tb_marca M, tb_modelo Mo, tb_veiculo V where M.id_marca = V.id_marca and Mo.id_modelo = V.id_modelo and id_veiculo = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/veiculos", function(req, res){
    connection.query('select * from tb_veiculo', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/marcas", function(req, res){
    connection.query('select * from tb_marca ORDER BY marca', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/marcas/:id", function(req, res){
    connection.query('select * from tb_marca where id_marca = ? ', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/modelos", function(req, res){
    connection.query('select * from tb_modelo ORDER BY desc_modelo',  function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});
routes.get("/modelo/:id", function(req, res){
    connection.query('select * from tb_modelo where id_modelo = ?',  [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/modelos/:id", function(req, res){
    connection.query('select * from tb_modelo where id_marca = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/veiculos-locacao", function(req, res){
    connection.query('select * from tb_veiculo where ds_proprietario = "locacao"', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/veiculos/:id", function(req, res){
    connection.query('select * from tb_veiculo where id_veiculo = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/veiculos", function(req, res){
    connection.query('insert tb_veiculo set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/veiculos/:id", function(req, res){
    connection.query('delete from tb_veiculo where id = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/veiculos/:id", function(req, res){
    connection.query('update tb_veiculo set ? where id_veiculo = ?', [req.body, req.params.id], function(err, rows, fields){
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



routes.get("/multas", function(req, res){
    connection.query('select * from tb_multa', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/multas/:id", function(req, res){
    connection.query('select * from tb_multa where id_multa = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.get("/multas-veiculo/:id", function(req, res){
    connection.query('select * from tb_multa where id_veiculo = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});


routes.get("/multas-moto/:id", function(req, res){
    connection.query('select * from tb_multa where id_motorista = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});
routes.get("/viagens-moto/:id", function(req, res){
    connection.query('select * from tb_viagem where id_motorista = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});


routes.post("/multas", function(req, res){
    connection.query('insert tb_multa set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/multas/:id", function(req, res){
    connection.query('delete from tb_multa where id_multa = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/multas/:id", function(req, res){
    connection.query('update tb_multa set ? where id_multa = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});


routes.get("/locacoes", function(req, res){
    connection.query('select * from tb_locacao', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/locacoes/:id", function(req, res){
    connection.query('select * from tb_locacao where id_locacao = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/locacoes", function(req, res){
    connection.query('insert tb_locacao set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/locacoes/:id", function(req, res){
    connection.query('delete from tb_locacao where id_locacao = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/locacoes/:id", function(req, res){
    connection.query('update tb_locacao set ? where id_locacao = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});


routes.get("/manutencoes", function(req, res){
    connection.query('select * from tb_manutencao', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/manutencoes/:id", function(req, res){
    connection.query('select * from tb_manutencao where id_manutencao = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.get("/manutencoes-veiculo/:id", function(req, res){
    connection.query('select * from tb_manutencao where id_veiculo = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/manutencoes", function(req, res){
    connection.query('insert tb_manutencao set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/manutencoes/:id", function(req, res){
    connection.query('delete from tb_manutencao where id_manutencao = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/manutencoes/:id", function(req, res){
    connection.query('update tb_manutencao set ? where id_manutencao = ?', [req.body, req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});




routes.get("/estoques", function(req, res){
    connection.query('select * from tb_produto', function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.get("/estoques/:id", function(req, res){
    connection.query('select * from tb_produto where id_produto = ?', [req.params.id], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
});

routes.post("/estoques", function(req, res){
    connection.query('insert tb_produto set ?', req.body, function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })

});

routes.delete("/estoques/:id", function(req, res){
    connection.query('delete from tb_produto where id_produto = ?', [req.params.id], function(err, rows, fields){
        if(!err)
            res.json(rows);
        else
            res.json(err);
    })
});

routes.put("/estoques/:id", function(req, res){
    connection.query('update tb_produto set ? where id_produto = ?', [req.body, req.params.id], function(err, rows, fields){
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

  
routes.get("/funcionarios/:cpf", function(req, res){
    connection.query('select * from tb_funcionarios where cd_cpf = ?', [req.params.cpf], function(err, rows, fields){
        if (!err)
            res.json(rows);
        else
            res.json(err);        
    })
  });
  

module.exports = routes;