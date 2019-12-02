import React, { Component } from 'react';
import api from '../../services/api'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';

import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';


export default class EditViagem extends Component {
    constructor(props) {
        super(props);
        this.onChangeOrigem = this.onChangeOrigem.bind(this);
        this.onChangeCidadeOrigem = this.onChangeCidadeOrigem.bind(this);
        this.onChangeDataSaida = this.onChangeDataSaida.bind(this);
        this.onChangeDestino = this.onChangeDestino.bind(this);
        this.onChangeCidadeDestino = this.onChangeCidadeDestino.bind(this);
        this.onChangeDtChegada = this.onChangeDtChegada.bind(this);
        this.onChangeKM = this.onChangeKM.bind(this);
        this.onChangeEmpresa = this.onChangeEmpresa.bind(this);
        this.onChangeVeiculo = this.onChangeVeiculo.bind(this);
        this.onChangeMotorista = this.onChangeMotorista.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
           
            id_empresa: '',
            id_motorista: '',
            id_veiculo: '',
            end_origem: '',
            cidade_origem: '',
            data_saida: '',
            end_destino: '',
            cidade_destino: '',
            data_chegada: '',
            km: '',
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
        api.get('/viagens/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id: response.data[0].id_viagem,
                id_empresa: response.data[0].id_empresa,
                id_motorista: response.data[0].id_motorista,   
                id_veiculo: response.data[0].id_veiculo,
                end_origem: response.data[0].end_origem,
                cidade_origem: response.data[0].cidade_origem,
                data_saida: response.data[0].data_saida,
                end_destino: response.data[0].end_destino,
                cidade_destino: response.data[0].cidade_destino,
                data_chegada: response.data[0].data_chegada,
                km: response.data[0].km
            });
                console.log(response);
                console.log(response.data.id_viagem);
          })
          .catch(function (error) {
              console.log(error);
          })
    }
    

    onChangeEmpresa(e) {
        this.setState({
            id_empresa: e.target.value
        })
    }
    onChangeOrigem(e) {
        this.setState({
            end_origem: e.target.value
        })
    }
    onChangeCidadeOrigem(e) {
        this.setState({
           cidade_origem: e.target.value
        })
    }
    onChangeDataSaida(e) {
        this.setState({
            data_saida: e.target.value
        })
    }
    onChangeDestino(e) {
        this.setState({
            end_destino: e.target.value
        })
    }
    onChangeCidadeDestino(e) {
        this.setState({
            cidade_destino: e.target.value
        })
    }
    onChangeDtChegada(e) {
        this.setState({
            data_chegada: e.target.value
        })
    }
    onChangeKM(e) {
        this.setState({
            km: e.target.value
        })
    }
    onChangeVeiculo(e) {
        this.setState({
            id_veiculo: e.target.value
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
            id_empresa: this.state.id_empresa,
            id_motorista: this.state.id_motorista,
            id_veiculo: this.state.id_veiculo,
            end_origem: this.state.end_origem,
            cidade_origem: this.state.cidade_origem,
            data_saida: this.state.data_saida,
            end_destino: this.state.end_destino,
            cidade_destino: this.state.cidade_destino,
            data_chegada: this.state.data_chegada,
            km: this.state.km
        };

        console.log('ID do motorista: ' + obj.id_motorista)

        api.put('/viagens/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('./index');
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
                    <li className="nav-item dropdown ">
                        <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <Link className="dropdown-item" to="/veiculos">Todos </Link>
                            <Link className="dropdown-item" to="/veiculos-alugados">Alugados</Link>
                        </div>
                    </li>
                  <li className="nav-item ">
                        <Link className="nav-link" to="/motoristas">Motoristas</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/viagens">Viagens <span className="sr-only">(atual)</span></Link>
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
            <h1> Editar viagem </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2>Informações </h2>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputEmpresa">Selecionar empresa*</label>
                        <input type="text" class="form-control" id="idEmpresa"  tabindex="" required value={this.state.id_empresa}
                    onChange={this.onChangeEmpresa} />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputMotorista">ID Motorista*</label>
                        <input type="text" class="form-control" id="inputMotorista" placeholder="Id do motorista" required value={this.state.id_motorista}
                            onChange={this.onChangeMotorista}/>
                    </div>
                    <div class="form-group vcol-md-2">
                        <label for="inputIdVeiculo">Id Veiculo*</label>
                        <input type="text" class="form-control" id="inputIdVeiculo" placeholder="Ex: 00.000.000-0" required value={this.state.id_veiculo}
                            onChange={this.onChangeVeiculo}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputEndOrigem">Endereço de Origem*</label>
                        <input type="text" class="form-control" id="inputEndOrigem" placeholder="Ex: Rua Aleatoria, nº 0" required value={this.state.end_origem}
                            onChange={this.onChangeOrigem}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputCidadeOrigem">Cidade Origem*</label>
                        <input type="text" class="form-control" id="inputCidadeOrigem" placeholder="Ex: Santos" required value={this.state.cidade_origem}
                            onChange={this.onChangeCidadeOrigem}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputDtSaida">Data de saída*</label>
                        <input type="text" class="form-control" id="inputDtSaida" placeholder="Ex: 04102019" required value={this.state.data_saida}
                            onChange={this.onChangeDataSaida}/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputEndDestino">Endereço de Destino*</label>
                        <input type="tel" class="form-control" id="inputEndDestino" placeholder="Ex: Rua Aleatória2, Nº 0" value={this.state.end_destino}
                            onChange={this.onChangeDestino}/>
                    </div>
                     <div class="form-group col-md-2">
                        <label for="inputCidadeDestino">Cidade de Destino*</label>
                        <input type="tel" class="form-control" id="inputCidadeDestino" placeholder="Ex: São Vicente" required value={this.state.cidade_destino}
                            onChange={this.onChangeCidadeDestino}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputDtChegada">Data de chegada*</label>
                        <input type="text" class="form-control" id="inputDtChegada" placeholder="Ex: 04102019" required value={this.state.data_chegada}
                            onChange={this.onChangeDtChegada}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputKM">Quilometragem *</label>
                        <input type="text" class="form-control" id="inputKM" placeholder="Ex: 04102019" required value={this.state.km}
                            onChange={this.onChangeKM}/>
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