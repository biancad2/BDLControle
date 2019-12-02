import React, { Component } from 'react';
import api from '../../../services/api'
import './manutencoes.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import Logo from '../../../assets/logobranco2.png';
import Usuario from '../../../assets/usuario-branco.png';
import Notificacao from '../../../assets/icone.png';
import Download from '../../../assets/download.png';
export default class CreateManutencao extends Component {
    constructor(props) {
        super(props);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangeServico = this.onChangeServico.bind(this);
        this.onChangeCausa= this.onChangeCausa.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeKM = this.onChangeKM.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.onChangeVeiculo = this.onChangeVeiculo.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id_veiculo: '',
            tipo_manut: '',
            servico: '',
            causa: '',
            valor_manut: '',
            km: '',
            dt_manutencao: '',
            veiculos: [],
            nm_usuario: '',
          nm_sobrenome: '',
          email: '',
          errors: {}
        }
    }
    componentDidMount(){
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
        api.get('/veiculos/')
        .then(response => {
          this.setState({ veiculos: response.data });

        })
        .catch(function (error) {
          console.log(error);
        });
    }
 
   
    
    onChangeTipo(e) {
        this.setState({
            tipo_manut: e.target.value
        })
    }
    onChangeData(e) {
        this.setState({
            dt_manutencao: e.target.value
        })
    }
    onChangeServico(e) {
        this.setState({
           servico: e.target.value
        })
    }
    onChangeCausa(e) {
        this.setState({
           causa: e.target.value
        })
    }
    onChangeValor(e) {
        this.setState({
            valor_manut: e.target.value
        })
    }
    onChangeKM(e) {
        this.setState({
            km: e.target.value
        })
    }
    onChangeVeiculo(e){
        this.setState({
            id_veiculo: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            dt_manutencao: this.state.dt_manutencao,
            id_veiculo: this.state.id_veiculo,
            tipo_manut: this.state.tipo_manut,
            servico: this.state.servico,
            causa: this.state.causa,
            valor_manut: this.state.valor_manut,
            km: this.state.km
        };


        api.post('/manutencoes', obj)
            .then(res => console.log(res.data));

        this.setState({
            id_veiculo: '',
            tipo_manut: '',
            servico: '',
            causa: '',
            valor_manut: '',
            km: '',
            dt_manutencao: ''
        })
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
                    <li className="nav-item active">
                        <Link className="nav-link" to="/main">Home <span className="sr-only">(atual)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/empresas">Empresas</Link>
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
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdown04">
                            <Link className="dropdown-item" to="/multas">Multas</Link>
                            <Link className="dropdown-item" to="/manutencoes">Manutenções</Link>
                            <Link className="dropdown-item" to="/estoques">Estoque</Link>   
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
            <h1> Adicionar manutenções </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2 style={{textAlign: 'left'}}>Informações </h2>
                <div className="form-row">
                <div className="form-group col-md-3">
                    <label for="inputVeiculo">Selecionar veículo*</label>
                       <select  className="form-control" id="idVeiculo" name="inputVeiculo"  tabindex=""  value={this.state.id_veiculo}
               onChange={this.onChangeVeiculo}>
                   <option value="">Selecionar...</option>
                   { this.state.veiculos.map(veiculo =>(
    <option value={veiculo.id_veiculo}>{veiculo.ds_placa}</option>
                        
                   ))}
               </select>
                    
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-3">
                    <label for="inputTipo">Selecionar tipo*</label>
                       <select  className="form-control" id="idTipo" name="inputTipo"  tabindex=""  value={this.state.tipo_manut}
               onChange={this.onChangeTipo}>
                   <option value="">Selecionar...</option>
                  <option value="preventiva">Preventiva</option>
                  <option value="corretiva">Corretiva</option>
               </select>
                    
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-3">
                        <label for="inputData">Data da manutenção*</label>
                        <input type="datetime-local" className="form-control" id="inputData" name="inputData"  required value={this.state.dt_infracao}
                            onChange={this.onChangeData}/>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-4">
                    <label for="inputServico">Serviço realizado*</label>
                       <textarea className="form-control" id="idServico" name="inputServico"  tabindex=""  value={this.state.servico}
               onChange={this.onChangeServico}></textarea>
                    
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputPreco">Valor do servico*</label>
                        <input type="number" className="form-control" id="inputPreco" name="inputPreco" placeholder="Ex.: 150.00" required value={this.state.valor_manut}
                            onChange={this.onChangeValor}/>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="inputDescricao">Causa*</label>
                        <textarea className="form-control" id="inputDescricao" name="inputDescricao" placeholder="Descreva a causa da manutenção..." required value={this.state.causa}
                            onChange={this.onChangeCausa} rows="3"> </textarea>
                        
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputKM" className="text-truncate" title="Quilometragem do veículo">Quilometragem do veículo</label>
                        <input type="number" className="form-control" id="idKM" name="inputKM" placeholder="Ex.: 10000" required value={this.state.km}
                            onChange={this.onChangeKM}/>
                    </div>
                    
                </div>

             </fieldset>
        
           
            <button type="submit" className="btn btn-primary" id="salvar">Salvar</button>
            <button type="submit" className="btn btn-primary" id="cancelar">Cancelar</button>
        </form>
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