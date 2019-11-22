import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import api from '../../services/api'
import TableRow from './tableRow';
import './empresas.css';


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

class Motoristas extends Component {
    
    constructor(props) {
        super(props);
        this.state = {motoristas: []};
    }

     componentDidMount() {
        api.get('/motoristas/')
        .then(response => {
          this.setState({ motoristas: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    tabRow(){
        return this.state.motoristas.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
  render() {
    return (
        <div >

                 <nav class="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <Link class="navbar-brand" to="#">
                    <img src={Logo}/>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link class="nav-link" to="/index">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/empresas">Empresas</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="veiculos.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <Link class="dropdown-item" to="/veiculos">Todos</Link>
                                <Link class="dropdown-item" to="veiculos-alugados.html">Alugados</Link>
                            </div>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/motoristas">Motoristas <span class="sr-only">(atual)</span></Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown03">
                                <Link class="dropdown-item" to="/viagens">Em andamento</Link>
                                <Link class="dropdown-item" to="viagens-concluidas.html">Concluídas</Link>
   
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <Link class="dropdown-item" to="multas.html">Multas</Link>
                                <Link class="dropdown-item" to="manutencoes.html">Manutenções</Link>
                                <Link class="dropdown-item" to="estoque.html">Estoque</Link>   
                            </div>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Relatórios</Link>
                        </li>
                    </ul>
                   
                    <ul class="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li class="download">
                            <Link to="#"><img src={Download}/></Link>
                        </li>
                        <li class="nav-item notificacao dropdown-notifications">
                            <Link to="#" class="dropdown-toggle">
                                <img src={Notificacao}/>
                            </Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link to="#" class="dropdown-toggle usuario-nome" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}/> 
                                Usuário
                            </Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <Link class="dropdown-item" to="#">Item 1</Link>
                                <Link class="dropdown-item" to="#">Item 2</Link>
                                <Link class="dropdown-item" to="#">Item 3</Link>   
                            </div>
                        </li>
                    </ul>
                </div>
          </nav> 
          <div className="quadrado">Quadrado</div>
            <h1> Motoristas </h1>
            
          <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CNH</th>
                            <th>CPF</th>
                            <th>Celular</th>
                            <th>Cat. CNH</th>
                            <th>Empresa</th>
                            <th colSpan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow() }
                    </tbody>
                </table> 

          <Link to='./incluir-moto' className="nav-link">incluir</Link>
          
        </div>
     
    );
  }
}

export default Motoristas;