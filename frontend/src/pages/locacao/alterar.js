import React, { Component } from 'react';
import api from '../../services/api'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';

import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';


export default class EditLocacao extends Component {
    constructor(props) {
        super(props);
        this.onChangeDataALugada = this.onChangeDataALugada.bind(this);
        this.onChangeEmpresa = this.onChangeEmpresa.bind(this);
        this.onChangeVeiculo = this.onChangeVeiculo.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            id_empresa: '',
            id_veiculo: '',
            dt_alugada: '',
            vl_locacao: '',
            empresas: [],
            veiculos: [],
            nm_usuario: '',
            nm_sobrenome: '',
            email: '',
            errors: {}, 
      
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
        api.get('/locacoes/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id_empresa: response.data[0].id_empresa,
                id_veiculo: response.data[0].id_veiculo,
                dt_alugada: response.data[0].dt_alugada,
                vl_locacao: response.data[0].vl_locacao,
               
               
            });
                console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          })
          api.get('/empresas/')
        .then(response => {
          this.setState({ empresas: response.data });

        })
        .catch(function (error) {
          console.log(error);
        });
        api.get('/veiculos-locacao/')
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
    onChangeValor(e) {
        this.setState({
            vl_locacao: e.target.value
        })

    }
    onChangeDataALugada(e) {
        this.setState({
            dt_alugada: e.target.value
        })
    }
 
    onChangeVeiculo(e) {
        this.setState({
            id_veiculo: e.target.value
        })
    }
   
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id_empresa: this.state.id_empresa,
            id_veiculo: this.state.id_veiculo,
            dt_alugada: this.state.dt_alugada,
            vl_locacao: this.state.vl_locacao,
        };


        api.put('/locacoes/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('./locacoes');
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
                    <li className="nav-item ">
                        <Link className="nav-link" to="/empresas">Empresas </Link>
                    </li>
                    <li className="nav-item dropdown active">
                        <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <Link className="dropdown-item" to="/veiculos">Todos </Link>
                            <Link className="dropdown-item" to="/veiculos-alugados">Alugados <span className="sr-only">(atual)</span></Link>
                        </div>
                    </li>
                  <li className="nav-item ">
                        <Link className="nav-link" to="/motoristas">Motoristas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/viagens">Viagens </Link>
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
            <h1> Editar locação </h1>
            
            <form id="formulario" onSubmit={this.onSubmit}>
                     <fieldset>
                         <h2>Informações </h2>
                        <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmpresa">Selecionar empresa*</label>
                               <select  class="form-control" id="idEmpresa"  tabindex="" required value={this.state.id_empresa}
                       onChange={this.onChangeEmpresa}>
                           <option value="">Selecionar...</option>
                           { this.state.empresas.map(empresa =>(
                                <option value={empresa.id_empresa}>{empresa.nm_empresa}</option>
                                
                           ))}
                       </select>
                       </div>
                       <div class="form-group col-md-2">
                        <label for="inputCNPJ">ID*</label>
                        <input type="text" class="form-control" id="inputCNPJ"  value={this.state.id_empresa} ref="cnpj"/>
                        </div> 
                            
                            </div>
                            <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputVeiculo">Selecionar veiculo*</label>
                               <select  class="form-control" id="veiculo"  tabindex="" required value={this.state.id_veiculo}
                       onChange={this.onChangeVeiculo}>
                           <option value="">Selecionar...</option>
                           { this.state.veiculos.map(veiculo =>(
                                <option value={veiculo.id_veiculo}>{veiculo.ds_placa}</option>
                                
                           ))}
                       </select>
                            </div>
                            </div>
                            <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="inputDataLocacao">Data da Locação*</label>
                                <input type="datetime-local" class="form-control" id="inputDataLocacao" required value={this.state.dt_alugada}
                                    onChange={this.onChangeDataALugada}/>
                            </div>
                            </div>
                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputValor">Valor*</label>
                                <input type="number" class="form-control" id="inputValor" placeholder="Ex: 100.00" required value={this.state.vl_locacao}
                                    onChange={this.onChangeValor}/>
                            </div>
                            </div>
                           
                     </fieldset>
                   
                    <button type="submit" class="btn btn-primary" id="salvar">Salvar</button>
                    <button type="submit" class="btn btn-primary" id="cancelar">Cancelar</button>
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