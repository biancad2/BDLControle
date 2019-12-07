import React, { Component } from 'react';
import api from '../../services/api'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TableRow from '../viagens/tableRow';
import TableRow2 from '../veiculos/multas';
import jwt_decode from 'jwt-decode'



import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

import Card1 from '../../assets/Veiculos/carro.png';
import Card2 from '../../assets/multa.png';
import Card3 from '../../assets/manutencoes.png';
import Card4 from '../../assets/despesas.png';

export default class InfoMotorista extends Component {
    constructor(props) {
        super(props);

        this.state = {
            motorista: {
                id_empresa: '',
                nm_motorista: '',
                sobrenome_motorista: '',
                cd_cpf: '',
                cd_rg: '',
                cd_cnh: '',
                nr_telefone: '',
                nr_celular: '',
                cat_cnh: '',
                ds_endereco: '',
                num_endereco: '',
                sg_estado: '',
                nm_cidade: '',
                ds_email: '',
                foto_motorista:'',
                password:''
            },
            multas: [],
            viagens: [], 
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
        api.get('/motoristas/'+this.props.match.params.id)
        .then(response => {
            this.setState({ 
              id_motorista: response.data[0].id_motorista,
              id_empresa: response.data[0].id_empresa,
              nm_motorista: response.data[0].nm_motorista,   
              sobrenome_motorista: response.data[0].sobrenome_motorista,
              cd_cpf: response.data[0].cd_cpf,
              cd_rg: response.data[0].cd_rg,
              cd_cnh: response.data[0].cd_cnh,
              nr_telefone: response.data[0].nr_telefone,
              nr_celular: response.data[0].nr_celular,
              cat_cnh: response.data[0].cat_cnh,
              ds_endereco: response.data[0].ds_endereco,
              num_endereco: response.data[0].num_endereco,
              sg_estado: response.data[0].sg_estado,
              nm_cidade: response.data[0].nm_cidade,
              ds_email: response.data[0].ds_email
          });
              console.log(response);
              console.log(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        })
          api.get('/empresa-moto/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             nm_empresa: response.data[0].nm_empresa
               }
               );
               
          })
          .catch(function (error) {
            console.log(error);
          })
          api.get('/multaGeral-moto/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             vl_multa: response.data[0].valor
               });
          })
          .catch(function (error) {
            console.log(error);
          })

          api.get('/multas-moto/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             multas: response.data
               });
          })
          .catch(function (error) {
            console.log(error);
          })
          api.get('/viagens-moto/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             viagens: response.data
               });
          })
          .catch(function (error) {
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

    expandirManutencoes(){
        var maisManutencao = document.querySelector("#mais-manutencao").innerHTML;
                //Informações motoristas
        if(maisManutencao=="+")
                document.querySelector("#mais-manutencao").innerHTML='-'
            else
                document.querySelector("#mais-manutencao").innerHTML='+'
                if(document.getElementById("informacoes-manutencao").classList.contains("informacoes-manutencao"))
                document.getElementById("informacoes-manutencao").classList.remove("informacoes-manutencao")
            else
                document.getElementById("informacoes-manutencao").classList.add("informacoes-manutencao")
    }
    
    tabRow(){
        return this.state.viagens.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
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
      componentDidUpdate(){
        var resultado = parseFloat(this.state.vl_multa) + parseFloat(this.state.vl_manutencao);
       
           this.state.resultado_soma= resultado
       
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
        <Link className="navbar-brand" to="/main">
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
                <li className="nav-item ">
                    <Link className="nav-link" to="/empresas">Empresas</Link>
                </li>
                <li className="nav-item dropdown active">
                    <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link className="dropdown-item" to="/veiculos">Todos  <span className="sr-only">(atual)</span></Link>
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
            <main role="main" className="bg-light">
            <div className="quadrado">Quadrado</div>
            <h1> Informações motorista </h1>
            

          <h2 className="titulo-empresa">  {this.state.nm_motorista} -  {this.state.cd_cpf}</h2>
                 <h3>Visão geral</h3>
                 <div className="container">
                    <div className="row alinhar">

                        <div className="col-md-3">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><Link to="/multas"><img src={Card2}/>  Multas </Link></p>
                                <p id="multas" className="numero">R$ {this.state.vl_multa}</p>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><Link to="/manutencoes" className="manutencoes"><img src={Card3}/>Manutenções</Link></p>
                                <p id="manutencoes" className="numero">R$ </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><Link to="#"><img src={Card4}/>  Total </Link></p>
                                <p id="despesas" className="numero"></p>

                            </div>
                        </div>
                    </div>
                </div>
                <h3  onClick={this.expandir} className="links-expandir"> <span id="mais-info">+</span> Informações
            <span className="span-click">(Clique e veja as informações principais do motorista)</span>
            </h3>
            <div className="table-responsive informacoes" id="informacoes" >
                <Link to={/atualizar-moto/ + this.state.id_motorista}><button type="button" className="btn btn-sm btn-outline-secondary editar-table" >
                <i className="fas fa-edit"></i>
                    Editar
                </button></Link>
               
                
                <table className=" table table-striped">
                <tr>
                        <td className="font-weight-bold"> Empresa: </td>
          <td className="tel"> {this.state.nm_empresa} </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">ID: </td>
                        <td className="id-empresa">{this.state.id_motorista}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold"> Nome: </td>
                        <td className="empresa"> {this.state.nm_motorista}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">CPF: </td>
                        <td className="cnpj">{this.state.cd_cpf}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">E-mail: </td>
                        <td className="endereco">{this.state.ds_email}  </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Celular: </td>
                        <td className="status">{this.state.nr_celular}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Endereço: </td>
          <td className="status">{this.state.sg_estado} - {this.state.nm_cidade} - {this.state.ds_endereco}, {this.state.num_endereco}</td>
                    </tr>
                </table>
            </div>

            <h3  onClick={this.expandirManutencoes} className="links-expandir"> <span id="mais-manutencao">+</span> Multas
            <span className="span-click">(Clique e veja as multas do motorista)</span>
            </h3>
            <div className="table-responsive informacoes-manutencao" id="informacoes-manutencao" >
                <Link to={'/incluir-manutencao'}><button type="button" className="btn btn-success editar-table" >
                <i className="fas fa-user-plus"></i>
                    Adicionar
                </button></Link>
               
                <div className="table-responsive">
          <table className="table table-md" >
                    <thead className="thead-dark">
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
                    <tbody> {this.tabRow()}
                    </tbody>
                </table> 
                </div>
                </div>


            <h3  onClick={this.expandirMultas} className="links-expandir"> <span id="mais-multa">+</span> Multas
            <span className="span-click">(Clique e veja as manutenções do veículo)</span>
            </h3>
            <div className="table-responsive informacoes-multa" id="informacoes-multa" >
                <Link to={'/incluir-multa'}><button type="button" className="btn btn-success editar-table" >
                <i className="fas fa-user-plus"></i>
                    Adicionar
                </button></Link>
               
                
                <div className="table-responsive">
          <table className="table table-md" >
                    <thead>
                        <tr>
                        <th>ID</th>
                                  <th>Empresa</th>
                                  <th>Veículo</th>
                                  <th>Motorista</th>
                                  <th className="text-truncate">End. Origem</th>
                                  <th>Dt. Saída</th>
                                  <th className="text-truncate">End. Destino</th>
                                  <th>Dt. Chegada</th>
                                  <th>Dt. Iniciada</th>
                                  <th >Dt. Finalizada</th>
                                  <th>Iniciar</th>
                                  <th>Encerrar</th>
                                  <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow2()}
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