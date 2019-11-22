const express = require('express');
var mySQL = require('mysql');

const routes = express.Router();

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

routes.get("/empresas/:cnpj", function(req, res){
    connection.query('select * from tb_empresa where cd_cnpj = ?', [req.params.cnpj], function(err, rows, fields){
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

module.exports = routes;