import React, { Component } from 'react';
import api from '../../services/api'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import TableRow from './manutencoes';
import TableRow2 from './multas';
import jwt_decode from 'jwt-decode'



import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

import Card1 from '../../assets/Veiculos/carro.png';
import Card2 from '../../assets/multa.png';
import Card3 from '../../assets/manutencoes.png';
import Card4 from '../../assets/despesas.png';

export default class InfoVeiculos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empresa: {
                id_veiculo: "",
                id_frota: "",
                id_marca: "",
                id_modelo: "",
                ds_placa: "",
                ds_proprietario: "",
                id_empresa: "",
                qt_cilindrada: "",
                qt_ano: "",
                ds_cor: "",
                qt_quilometragem: "",
                qt_passageiros: "",
                qt_peso: "",
                nr_renavam: "",
                ds_status: "",
            },
            multas: [],
            manutencoes: [],
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
        api.get('/veiculos/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id_veiculo: response.data[0].id_veiculo,
                id_frota: response.data[0].id_frota,
                id_marca: response.data[0].id_marca,   
                id_modelo: response.data[0].id_modelo,
                ds_placa: response.data[0].ds_placa,
                ds_proprietario: response.data[0].ds_proprietario,
                qt_cilindrada: response.data[0].qt_cilindrada,
                qt_ano: response.data[0].qt_ano,
                ds_cor: response.data[0].ds_cor,
                qt_quilometragem: response.data[0].qt_quilometragem,
                qt_passageiros: response.data[0].qt_passageiros,
                qt_peso: response.data[0].qt_peso,
                nr_renavam: response.data[0].nr_renavam,
                ds_status: response.data[0].ds_status,
            });
                console.log(response);
                console.log(response.data.id_veiculo);
          })
          .catch(function (error) {
              console.log(error);
          })
         
          api.get('/manutencao-veic/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             manutencoes: response.data[0].valor
               });
          })
          .catch(function (error) {
            console.log(error);
          })

          api.get('/multas-veiculo/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             multas: response.data
               });
          })
          .catch(function (error) {
            console.log(error);
          })

          api.get('/multa-veic/'+this.props.match.params.id)
        .then(response => {
          this.setState({ vl_multas: response.data[0].valor });
          console.log(response)
          
        })

    }
    componentWillMount(){
   
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

    expandirMultas(){
        var maisMulta = document.querySelector("#mais-multa").innerHTML;
                //Informações motoristas
        if(maisMulta=="+")
                document.querySelector("#mais-multa").innerHTML='-'
            else
                document.querySelector("#mais-multa").innerHTML='+'
                if(document.getElementById("informacoes-multa").classList.contains("informacoes-multa"))
                document.getElementById("informacoes-multa").classList.remove("informacoes-multa")
            else
                document.getElementById("informacoes-multa").classList.add("informacoes-multa")
    }
    
    /*tabRow(){
        return this.state.motoristas.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }*/
      tabRow2(){
        return this.state.multas.map(function(object, i){
            return <TableRow2 obj={object} key={i} />;
        });
      }
      logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`./login`)
      }
    render() {
        api.get('/empresas/'+this.state.id_empresa)
        .then(response => {
          this.setState({
           nm_empresa: response.data[0].nm_empresa,
             });
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/categorias/'+this.state.id_frota)
        .then(response => {
          this.setState({
           ds_frota: response.data[0].ds_frota,
             });
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/marcas/'+this.state.id_marca)
        .then(response => {
          this.setState({
           marca: response.data[0].marca,
             });
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/modelo/'+this.state.id_modelo)
        .then(response => {
          this.setState({
           desc_modelo: response.data[0].desc_modelo,
             });
        })
        .catch(function (error) {
          console.log(error);
        })
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
            <h1> Informações veículo </h1>
            

          <h2 className="titulo-empresa">  {this.state.ds_frota} {this.state.id_veiculo} - {this.state.ds_placa}</h2>
                 <h3>Visão geral</h3>
                 <div class="container">
                    <div class="row">

                        <div class="col-md-3">
                            <div class="card card-body align-items-center">
                                <p class="card-text"><a href="#"><img src={Card2}/>  Multas </a></p>
                                <p id="multas" class="numero">R$ </p>
                            </div>
                        </div>
                        <div class="col-md-3 ">
                            <div class="card card-body align-items-center">
                                <p class="card-text"><a href="#" class="manutencoes"><img src={Card3}/>Manutenções</a></p>
                                <p id="manutencoes" class="numero">R$ {this.state.manutencoes}</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card card-body align-items-center">
                                <p class="card-text"><a href="#"><img src={Card4}/>  Despesas </a></p>
                                <p id="despesas" class="numero">R$ 16.000,00</p>

                            </div>
                        </div>
                    </div>
                </div>
                <h3  onClick={this.expandir} className="links-expandir"> <span id="mais-info">+</span> Informações
            <span class="span-click">(Clique e veja as informações principais do veículo)</span>
            </h3>
            <div class="table-responsive informacoes" id="informacoes" >
                <Link to={/atualizar-veic/ + this.state.id_veiculo}><button type="button" class="btn btn-sm btn-outline-secondary editar-table" >
                <i className="fas fa-edit"></i>
                    Editar
                </button></Link>
               
                
                <table class=" table table-striped">
                <tr>
                        <td className="font-weight-bold">Empresa: </td>
                        <td class="tel">{this.state.nm_empresa}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">ID: </td>
                        <td class="id-empresa">{this.state.id_veiculo}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Categoria: </td>
                        <td class="empresa">{this.state.ds_frota}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Placa: </td>
                        <td class="cnpj">{this.state.ds_placa}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Marca e modelo: </td>
                        <td class="endereco">{this.state.marca} -  {this.state.desc_modelo} </td>
                    </tr>
                   
                    <tr>
                        <td className="font-weight-bold">Cel: </td>
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

            <h3  onClick={this.expandirMoto} className="links-expandir"> <span id="mais-moto">+</span> Manutenções
            <span class="span-click">(Clique e veja as manutenções do veículo)</span>
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
                    <tbody>
                    </tbody>
                </table> 

          <Link to={'/incluir-moto'} className="nav-link">incluir</Link>
          
            </div>


            <h3  onClick={this.expandirMultas} className="links-expandir"> <span id="mais-multa">+</span> Multas
            <span class="span-click">(Clique e veja as manutenções do veículo)</span>
            </h3>
            <div class="table-responsive informacoes-multa" id="informacoes-multa" >
                <Link to={'/incluir-multa'}><button type="button" class="btn btn-success editar-table" >
                <i class="fas fa-user-plus"></i>
                    Adicionar
                </button></Link>
               
                
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                        <th>ID</th>
                            <th>Motorista</th>
                            <th>Placa</th>
                            <th>Infração</th>
                            <th>Descrição</th>
                            <th>Gravidade</th>
                            <th>Preço</th>
                            <th>Status</th>
                            <th>Pagar</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow2() }
                    </tbody>
                </table> 
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