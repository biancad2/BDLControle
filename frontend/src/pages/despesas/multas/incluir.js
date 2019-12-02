import React, { Component } from 'react';
import api from '../../../services/api'
import './multas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import Logo from '../../../assets/logobranco2.png';
import Usuario from '../../../assets/usuario-branco.png';
import Notificacao from '../../../assets/icone.png';
import Download from '../../../assets/download.png';
export default class CreateMulta extends Component {
    constructor(props) {
        super(props);
        this.onChangeMotorista = this.onChangeMotorista.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.onChangeVeiculo = this.onChangeVeiculo.bind(this);
        this.onChangeGravidade = this.onChangeGravidade.bind(this);
        this.onChangePreco = this.onChangePreco.bind(this);
        this.onChangeMotorista = this.onChangeMotorista.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id_veiculo: '',
            id_motorista: '',
            dt_infracao: '',
            ds_infracao: '',
            ds_gravidade: '',
            qt_preco: '',
            motoristas: [],
            veiculos: []
        }
    }
    componentDidMount(){
        api.get('/motoristas/')
        .then(response => {
          this.setState({ motoristas: response.data });

        })
        .catch(function (error) {
          console.log(error);
        });
        api.get('/veiculos/')
        .then(response => {
          this.setState({ veiculos: response.data });

        })
        .catch(function (error) {
          console.log(error);
        });
    }
 
   
    
    onChangeEmpresa(e) {
        this.setState({
            id_empresa: e.target.value
        })
    }
    onChangeMotorista(e) {
        this.setState({
            id_motorista: e.target.value
        })
    }
    onChangeData(e) {
        this.setState({
           dt_infracao: e.target.value
        })
    }
    onChangeDescricao(e) {
        this.setState({
            ds_infracao: e.target.value
        })
    }
    onChangeVeiculo(e) {
        this.setState({
            id_veiculo: e.target.value
        })
    }
    onChangeGravidade(e) {
        this.setState({
            ds_gravidade: e.target.value
        })
    }
    onChangePreco(e) {
        this.setState({
            qt_preco: e.target.value
        })
    }
    onChangeMotorista(e) {
        this.setState({
            id_motorista: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id_veiculo: this.state.id_veiculo,
            id_motorista: this.state.id_motorista,
            dt_infracao: this.state.dt_infracao,
            ds_infracao: this.state.ds_infracao,
            ds_gravidade: this.state.ds_gravidade,
            qt_preco: this.state.qt_preco
        };


        api.post('/multas', obj)
            .then(res => console.log(res.data));

        this.setState({
            id_veiculo: '',
            id_motorista: '',
            dt_infracao: '',
            ds_infracao: '',
            ds_gravidade: '',
            qt_preco: ''
        })
    }
 
    render() {
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/empresas">Empresas</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <Link className="dropdown-item" to="/veiculos">Todos</Link>
                                <Link className="dropdown-item" to="veiculos-alugados.html">Alugados</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/motoristas">Motoristas </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle"  id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown03">
                                <Link className="dropdown-item" to="/viagens">Em andamento</Link>
                                <Link className="dropdown-item" to="viagens-concluidas.html">Concluídas</Link>
   
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle"  id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <Link className="dropdown-item" to="#">Multas <span className="sr-only">(atual)</span></Link>
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
            <h1> Adicionar multas </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2 style={{textAlign: 'left'}}>Informações </h2>
                <div className="form-row">
                <div className="form-group col-md-3">
                    <label for="inputMotorista">Selecionar motorista*</label>
                       <select  className="form-control" id="idMotorista" name="inputMotorista" tabindex=""  value={this.state.id_motorista}
               onChange={this.onChangeMotorista}>
                   <option value="">Selecionar...</option>
                   { this.state.motoristas.map(motorista =>(
    <option value={motorista.id_motorista}>{motorista.id_motorista} - {motorista.nm_motorista}</option>
                        
                   ))}
               </select>
                    
                    </div>
                    </div>
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
                        <label for="inputData">Data da infração*</label>
                        <input type="datetime-local" className="form-control" id="inputData" name="inputData"  required value={this.state.dt_infracao}
                            onChange={this.onChangeData}/>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-3">
                    <label for="inputGravidade">Selecionar gravidade*</label>
                       <select  className="form-control" id="idGravidade" name="inputGravidade"  tabindex=""  value={this.state.ds_gravidade}
               onChange={this.onChangeGravidade}>
                   <option value="">Selecionar...</option>
                   <option value="leve">Leve</option>
                   <option value="media">Média</option>
                   <option value="grave">Grave</option>
                   <option value="gravissima">Gravíssima</option>
               </select>
                    
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputPreco">Valor da infração*</label>
                        <input type="number" className="form-control" id="inputPreco" name="inputPreco" placeholder="Ex.: 150.00" required value={this.state.qt_preco}
                            onChange={this.onChangePreco}/>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputDescricao">Descrição da infração*</label>
                        <textarea className="form-control" id="inputDescricao" name="inputDescricao" placeholder="Descreva os detalhes da infração..." required value={this.state.ds_infracao}
                            onChange={this.onChangeDescricao} rows="6"> </textarea>
                        
                    </div>
                    
                </div>

             </fieldset>
        
           
            <button type="submit" className="btn btn-primary" id="salvar">Salvar</button>
            <button type="submit" className="btn btn-primary" id="cancelar">Cancelar</button>
        </form>
        </main>
        </div>
        )
    }
}