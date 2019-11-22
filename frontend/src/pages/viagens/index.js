import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import api from '../../services/api'
import TableRow from './tableRow';
import './empresas.css';


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

class Viagens extends Component {
    
    constructor(props) {
        super(props);
        this.state = {viagens: []};
    }

     componentDidMount() {
        api.get('/viagens/')
        .then(response => {
          this.setState({ viagens: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    tabRow(){
        return this.state.viagens.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
  render() {
    return (
        <div >
        <nav class="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <a class="navbar-brand" href="#">
                    <img src={Logo}/>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="empresas.html">Empresas<span class="sr-only">(atual)</span></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="veiculos.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <a class="dropdown-item" href="veiculos.html">Todos</a>
                                <a class="dropdown-item" href="veiculos-alugados.html">Alugados</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="motoristas.html">Motoristas</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown03">
                                <a class="dropdown-item" href="viagens-andamento.html">Em andamento</a>
                                <a class="dropdown-item" href="viagens-concluidas.html">Concluídas</a>
   
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <a class="dropdown-item" href="multas.html">Multas</a>
                                <a class="dropdown-item" href="manutencoes.html">Manutenções</a>
                                <a class="dropdown-item" href="estoque.html">Estoque</a>   
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Relatórios</a>
                        </li>
                    </ul>
                   
                    <ul class="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li class="download">
                            <a href="#"><img src={Download}/></a>
                        </li>
                        <li class="nav-item notificacao dropdown-notifications">
                            <a href="#" class="dropdown-toggle">
                                <img src={Notificacao}/>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="dropdown-toggle usuario-nome" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}/> 
                                Usuário
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <a class="dropdown-item" href="#">Item 1</a>
                                <a class="dropdown-item" href="#">Item 2</a>
                                <a class="dropdown-item" href="#">Item 3</a>   
                            </div>
                        </li>
                    </ul>
                </div>
          </nav>
          <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Empresa</th>
                            <th>Veículo</th>
                            <th>Motorista</th>
                            <th>End. Origem</th>
                            <th>Dt. Saída</th>
                            <th>End. Destino</th>
                            <th>Dt. Chegada</th>
                            <th colSpan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow() }
                    </tbody>
                </table> 

          <Link to='./incluir-viagem' className="nav-link">incluir</Link>
          
        </div>
     
    );
  }
}

export default Viagens;