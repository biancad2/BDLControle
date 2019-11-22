import React, { Component } from "react";
import api from "../../services/api";
import './empresas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TableRow from './tableRow';


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

export default class Empresas extends Component{
    constructor(props) {
        super(props);
        this.state = { empresas: [] };
    }

    
    componentDidMount() {
        api.get('/empresas/')
        .then(response => {
          this.setState({ empresas: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    tabRow(){
        return this.state.empresas.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }

    
    render(){
        return ( 
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <Link className="navbar-brand" to="#">
                    <img src={Logo}/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="index.html">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="#">Empresas<span className="sr-only">(atual)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <Link className="dropdown-item" to="/veiculos">Todos</Link>
                                <Link className="dropdown-item" to="veiculos-alugados.html">Alugados</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/motoristas">Motoristas</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown03">
                                <Link className="dropdown-item" to="/viagens">Em andamento</Link>
                                <Link className="dropdown-item" to="viagens-concluidas.html">Concluídas</Link>
   
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <Link className="dropdown-item" to="multas.html">Multas</Link>
                                <Link className="dropdown-item" to="manutencoes.html">Manutenções</Link>
                                <Link className="dropdown-item" to="estoque.html">Estoque</Link>   
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Relatórios</Link>
                        </li>
                    </ul>
                   
                    <ul className="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li className="download">
                            <Link to="#"><img src={Download}/></Link>
                        </li>
                        <li className="nav-item notificacao dropdown-notifications">
                            <Link to="#" className="dropdown-toggle">
                                <img src={Notificacao}/>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to="#" className="dropdown-toggle usuario-nome" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}/> 
                                Usuário
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <Link className="dropdown-item" to="#">Item 1</Link>
                                <Link className="dropdown-item" to="#">Item 2</Link>
                                <Link className="dropdown-item" to="#">Item 3</Link>   
                            </div>
                        </li>
                    </ul>
                </div>
          </nav> 
          <main role="main" className="bg-light">
          <div className="quadrado">Quadrado</div>
            <h1> Empresas </h1>
            
            <form method="get" action="" className="centro row">
                 <h2 className="filtrar">Filtrar</h2>
               
                <div className="formulario selecionar centro col-md-2">
                    <label for="disponibilidade"> Situação</label>
                    <select name="categoria" id="categoria"  tabindex="7">
                        <option value=""> Todos </option>
                        <option value="dsponivel"> Ativas </option>
                        <option value="desativada"> Desativadas </option>
                    </select>
                </div>

                <div className="formulario busca col-md-2">
                    <label for="pesquisa"> Pesquisar	</label>
                    <input type="text" name="pesquisa" id="pesquisa" size="9" minlength="6" maxlength="7" placeholder="Nome/CNPJ    " data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Você pode pesquisar a empresa pelo nome e CNPJ"/>
                    <span id="box_icone_busca">
                        <i id="icone_busca" className="fa fa-search" onclick="sua_funcao_aqui()"></i>
                    </span> 
                </div>
            </form>
    
            <div className="adc-rem">
                Adicionar empresa: 
               <Link to={'./incluir-empresa'}> <button className="adc"></button></Link>
            </div>
               
        <div className="table-responsive">
            <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th className="id">ID</th>
                            <th>Empresa</th>
                            <th className="cnpj">CNPJ</th>
                            <th>E-mail</th>
                            <th>Nome para contato</th>
                            <th>Telefone</th>
                            <th>Celular</th>
                            <th>Endereço</th>
                            <th>Qt. Veículos</th>
                            <th className="contrato">Vencimento contrato</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.tabRow() }
                </tbody>
            </table>
        </div>
        </main>
        
        </div>

        );
    }
}