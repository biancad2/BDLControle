import React, { Component } from 'react';
import api from '../../services/api'
import './empresas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TableRow from './motoristas';
import TableRow2 from './veiculos';
import jwt_decode from 'jwt-decode'



import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

import Card1 from '../../assets/Veiculos/carro.png';
import Card2 from '../../assets/multa.png';
import Card3 from '../../assets/manutencoes.png';
import Card4 from '../../assets/despesas.png';

export default class InfoEmpresa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empresa: {
                id_emp: "",
                nm_emp: "",
                cnpj: "",
                email: "",
                endereco: "",
                estado: "",
                nrendereco: "",
                complemento: "",
                cidade: "",
                telefone: "",
                celular: "",
                CEP: "",
                veiculos: "",
                responsavel: "",
                validadecontrato: "",
                status: ""
            },
            motoristas: [],
            veiculos: [],
            nm_usuario: '',
            nm_sobrenome: '',
            email: '',
            errors: {}
        };
    }

    
    async componentDidMount() {
        if (localStorage.usertoken == null ){
            alert("Faça login para continuar")
        }else{
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                nm_usuario: decoded.nm_usuario,
                nm_sobrenome: decoded.last_name,
                email: decoded.email
              })
        }
        api.get('/empresas/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id_emp: response.data[0].id_empresa,
                nm_emp: response.data[0].nm_empresa,
                cnpj: response.data[0].cd_cnpj,   
                email: response.data[0].ds_email,
                endereco: response.data[0].ds_endereco,
                estado: response.data[0].sg_estado,
                nrendereco: response.data[0].num_endereco,
                complemento: response.data[0].ds_complemento,
                CEP: response.data[0].cd_CEP,
                cidade: response.data[0].nm_cidade,
                telefone: response.data[0].nr_telefone,
                celular: response.data[0].nr_celular,
                responsavel: response.data[0].nm_responsavel,
                validadecontrato: response.data[0].dt_validadecontrato,
                status: response.data[0].ds_status
            });
                console.log(response);
                console.log(response.data.id_empresa);
          })
          .catch(function (error) {
              console.log(error);
          })
          api.get('/motoristas-empresa/'+this.props.match.params.id)
          .then(response => {
            this.setState({ motoristas: response.data });
            console.log(response)
          })
          .catch(function(error){
            console.log(error);
          })
          api.get('/veiculos-empresa/'+this.props.match.params.id)
          .then(response => {
            this.setState({ veiculos: response.data });
            console.log(response)
          })
          .catch(function(error){
            console.log(error);
          })
    }
     expandir(){
         var mais = document.querySelector("#mais-info").innerHTML;
        
         
        if(document.getElementById("informacoes").classList.contains("informacoes"))
            document.getElementById("informacoes").classList.remove("informacoes")
        else
            document.getElementById("informacoes").classList.add("informacoes")

        
        //Informações gerais
        if(mais=="+")
            document.querySelector("#mais-info").innerHTML='-'
        else
            document.querySelector("#mais-info").innerHTML='+' 

 
    }

    expandirMoto(){
        var maisMoto = document.querySelector("#mais-moto").innerHTML;
                //Informações motoristas
        if(maisMoto=="+")
                document.querySelector("#mais-moto").innerHTML='-'
            else
                document.querySelector("#mais-moto").innerHTML='+'
                if(document.getElementById("informacoes-moto").classList.contains("informacoes-moto"))
                document.getElementById("informacoes-moto").classList.remove("informacoes-moto")
            else
                document.getElementById("informacoes-moto").classList.add("informacoes-moto")
    }
    expandirVeiculos(){
        var maisVeiculo = document.querySelector("#mais-veiculo").innerHTML;
                //Informações motoristas
        if(maisVeiculo=="+")
                document.querySelector("#mais-veiculo").innerHTML='-'
            else
                document.querySelector("#mais-veiculo").innerHTML='+'
                if(document.getElementById("informacoes-veiculo").classList.contains("informacoes-veiculo"))
                document.getElementById("informacoes-veiculo").classList.remove("informacoes-veiculo")
            else
                document.getElementById("informacoes-veiculo").classList.add("informacoes-veiculo")
    }
    
    tabRow(){
        return this.state.motoristas.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
      tabRow2(){
        return this.state.veiculos.map(function(object, i){
            return <TableRow2 obj={object} key={i} />;
        });
      }
      logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`./login`)
      }
    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          )
          const userLink = (
            <div>
 <nav className="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
        <Link class="navbar-brand" to="/main">
            <img src={Logo}></img>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                    <Link className="nav-link" to="/main">Home </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/empresas">Empresas <span className="sr-only">(atual)</span></Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link className="dropdown-item" to="/veiculos">Todos</Link>
                        <Link className="dropdown-item" to="/veiculos-alugados">Alugados</Link>
                    </div>
                </li>
              <li className="nav-item">
                    <Link className="nav-link" to="/motoristas">Motoristas</Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/viagens">Viagens</Link>
                </li>
                <li className="nav-item dropdown ">
                    <Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                        <Link className="dropdown-item" to="/multas">Multas </Link>
                        <Link className="dropdown-item" to="/manutencoes">Manutenções </Link>
                        <Link className="dropdown-item" to="/estoques">Estoque </Link>   
                    </div>
                </li>
            </ul>
            <ul className="usuario navbar-nav nav-link navbar-nav" id="usuario">
                <li className="download">
                    <Link to="#"><img src={Download}></img></Link>
                </li>
                <li className="nav-item dropdown">
                    <Link to="#" className="dropdown-toggle usuario-nome" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                        <img src={Usuario}></img>
                        {this.state.nm_usuario}
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown04">
                      <Link className="dropdown-item" to="/perfil">Perfil</Link>
                      <Link className="dropdown-item" to="/contato">Contato</Link>
                        <Link className="dropdown-item" to="" onClick={this.logOut.bind(this)}>Sair</Link>
                        
                    </div>
                </li>
            </ul>
        </div>
  </nav> 
            <main role="main" class="bg-light">
            <div class="quadrado">Quadrado</div>
            <h1> Informações empresa </h1>
            

                 <h2 className="titulo-empresa">  {this.state.nm_emp} - {this.state.id_emp}</h2>
                 <h3>Visão geral</h3>
                 
                <h3  onClick={this.expandir} className="links-expandir"> <span id="mais-info">+</span> Informações
            <span class="span-click">(Clique e veja as informações principais da empresa)</span>
            </h3>
            <div class="table-responsive informacoes" id="informacoes" >
                <Link to={/alterar-empresa/ + this.state.id_emp}><button type="button" class="btn btn-sm btn-outline-secondary editar-table" >
                <i className="fas fa-edit"></i>
                    Editar
                </button></Link>
               
                
                <table class=" table table-striped">
                    <tr>
                        <td className="font-weight-bold">ID: </td>
                        <td class="id-empresa">{this.state.id_emp}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Nome: </td>
                        <td class="empresa">{this.state.nm_emp}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">CNPJ: </td>
                        <td class="cnpj">{this.state.cnpj}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Endereço: </td>
                        <td class="endereco">{this.state.estado}, {this.state.cidade} - {this.state.endereco}, {this.state.nrendereco} - {this.state.complemento}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Telefone: </td>
                        <td class="tel">{this.state.telefone}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Celular p/ contato: </td>
                        <td class="cel">{this.state.celular}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Nome p/ contato: </td>
                        <td class="nm-contato">{this.state.responsavel}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">E-mail: </td>
                        <td class="email">{this.state.email}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Data de validade do contrato: </td>
                        <td class="validade">{this.state.validadecontrato}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Status: </td>
                        <td class="status">{this.state.status}</td>
                    </tr>
                </table>
            </div>

            <h3  onClick={this.expandirMoto} className="links-expandir"> <span id="mais-moto">+</span> Motoristas
            <span class="span-click">(Clique e veja os motoristas da empresa)</span>
            </h3>
            <div class="table-responsive informacoes-moto" id="informacoes-moto" >
                <Link to={'/incluir-moto'}><button type="button" class="btn btn-success editar-table" >
                <i class="fas fa-user-plus"></i>
                    Adicionar
                </button></Link>
               
                
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CNH</th>
                            <th>CPF</th>
                            <th>Celular</th>
                            <th>Cat. CNH</th>
                            <th colSpan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow() }
                    </tbody>
                </table>
          
            </div>
            <h3  onClick={this.expandirVeiculos} className="links-expandir"> <span id="mais-veiculo">+</span> Veículos
            <span class="span-click">(Clique e veja os veículos da empresa)</span>
            </h3>
            <div class="table-responsive informacoes-veiculo" id="informacoes-veiculo" >
                <Link to={'/incluir-veiculo'}><button type="button" class="btn btn-success editar-table" >
                <i class="fas fa-user-plus"></i>
                    Adicionar
                </button></Link>
               
                <div className="table-responsive">
          <table className="table  table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Empresa</th>
                            <th>Ano</th>
                            <th>Cilindrada</th>
                            <th>Cor</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow2() }
                    </tbody>
                </table> 
            </div>


              
          
            </div>
        </main>
        </div>
          )
        return (
            <div>

            {localStorage.usertoken==null ? this.props.history.push(`./login`)  : userLink}
            </div>
        )
    }
}