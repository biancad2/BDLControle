import React, { Component } from 'react';
import api from '../../services/api'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TableRow from '../despesas/manutencoes/tableRow';
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
                id_empresa: "",
            },
            multas: [],
            manutencoes: [],
            empresas: [], 
            marcas: [],
            modelos: [],
            frota: [],
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
                id_empresa: response.data[0].id_empresa
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
             vl_manutencao: response.data[0].valor
               });
          })
          .catch(function (error) {
            console.log(error);
          })

          api.get('/frota-veic/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             ds_frota: response.data[0].ds_frota
               }
               );
               
          })
          .catch(function (error) {
            console.log(error);
          })
          api.get('/empresa-veic/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             nm_empresa: response.data[0].nm_empresa
               }
               );
               
          })
          .catch(function (error) {
            console.log(error);
          })
          api.get('/multa-veic/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             vl_multa: response.data[0].valor
               });
          })
          .catch(function (error) {
            console.log(error);
          })

          api.get('/marca-modelo/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             marca: response.data[0].marca,
             modelo: response.data[0].desc_modelo
               });
          })
          .catch(function (error) {
            console.log(error);
          })
          api.get('/manutencoes-veiculo/'+this.props.match.params.id)
          .then(response => {
            this.setState({
             manutencoes: response.data
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
        return this.state.manutencoes.map(function(object, i){
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
            <h1> Informações veículo </h1>
            

          <h2 className="titulo-empresa">  {this.state.ds_frota} - Placa:  {this.state.ds_placa}</h2>
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
                                <p id="manutencoes" className="numero">R$ {this.state.vl_manutencao}</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><Link to="#"><img src={Card4}/>  Total </Link></p>
                                <p id="despesas" className="numero">{this.state.resultado_soma}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <h3  onClick={this.expandir} className="links-expandir"> <span id="mais-info">+</span> Informações
            <span className="span-click">(Clique e veja as informações principais do veículo)</span>
            </h3>
            <div className="table-responsive informacoes" id="informacoes" >
                <Link to={/atualizar-veic/ + this.state.id_veiculo}><button type="button" className="btn btn-sm btn-outline-secondary editar-table" >
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
                        <td className="id-empresa">{this.state.id_veiculo}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold"> Categoria: </td>
                        <td className="empresa"> {this.state.ds_frota}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Placa: </td>
                        <td className="cnpj">{this.state.ds_placa}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Marca e modelo: </td>
                        <td className="endereco">{this.state.marca} -  {this.state.modelo} </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Status: </td>
                        <td className="status">{this.state.ds_status}</td>
                    </tr>
                </table>
            </div>

            <h3  onClick={this.expandirManutencoes} className="links-expandir"> <span id="mais-manutencao">+</span> Manutenções
            <span className="span-click">(Clique e veja as manutenções do veículo)</span>
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
                            <th>Veiculo</th>
                            <th>Quilometragem</th>
                            <th className="text-truncated">Tipo de manutenção</th>
                            <th>Descrição</th>
                            <th>Causa</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>  {this.tabRow()}
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