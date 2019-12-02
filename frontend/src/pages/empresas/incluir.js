import React, { Component } from 'react';
import api from '../../services/api';
import './empresas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { cepMask } from '../../js/mascaras/cepmask';
import jwt_decode from 'jwt-decode'


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmpresa = this.onChangeEmpresa.bind(this);
        this.onChangeCNPJ = this.onChangeCNPJ.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangeEndereco = this.onChangeEndereco.bind(this);   
        this.onChangeEstado = this.onChangeEstado.bind(this); 
        this.onChangeNumEndereco = this.onChangeNumEndereco.bind(this);
        this.onChangeComplemento = this.onChangeComplemento.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeCelular = this.onChangeCelular.bind(this);
        this.onChangeCEP = this.onChangeCEP.bind(this);
        this.onChangeResponsavel = this.onChangeResponsavel.bind(this);
        this.onChangeDtValidade = this.onChangeDtValidade.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nm_empresa: '',
            cd_cnpj: '',
            ds_email: '',
            ds_endereco: '',
            sg_estado: '',
            num_endereco: '',
            ds_complemento: '',
            nm_cidade: '',
            nr_telefone: '',
            nr_celular: '',
            cd_CEP: '',
            nm_responsavel: '',
            dt_validadecontrato: '',
            ds_status: "Ativa",
            nm_usuario: '',
            nm_sobrenome: '',
            email: '',
            errors: {}
        }
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
    }
    onChangeEmpresa(e) {
        this.setState({
            nm_empresa: e.target.value
        })
    }
    onChangeCNPJ(e) {
        this.setState({
            cd_cnpj: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            ds_email: e.target.value
        })
    }
    onChangeEndereco(e) {
        this.setState({
            ds_endereco: e.target.value
        })
    }
    onChangeEstado(e) {
        this.setState({
            sg_estado: e.target.value
        })
    }
    onChangeNumEndereco(e) {
        this.setState({
            num_endereco: e.target.value
        })
    }
    onChangeComplemento(e) {
        this.setState({
            ds_complemento: e.target.value
        })
    }
    onChangeCidade(e) {
        this.setState({
            nm_cidade: e.target.value
        })
    }
    onChangeTelefone(e) {
        this.setState({
            nr_telefone: e.target.value
        })
    }
  
    onChangeCelular(e) {
        this.setState({
            nr_celular: e.target.value
        })
    }
    onChangeCEP(e) {
        this.setState({
            cd_CEP: cepMask(e.target.value)
        })
    }
    onChangeResponsavel(e) {
        this.setState({
            nm_responsavel: e.target.value
        })
    }
    onChangeDtValidade(e) {
        this.setState({
            dt_validadecontrato: e.target.value
        })
    }
    onChangeStatus(e) {
        this.setState({
            ds_status: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            nm_empresa: this.state.nm_empresa,
            cd_cnpj: this.state.cd_cnpj,
            ds_email: this.state.ds_email,
            ds_endereco: this.state.ds_endereco,
            sg_estado: this.state.sg_estado,
            num_endereco: this.state.num_endereco,
            ds_complemento: this.state.ds_complemento,
            nm_cidade: this.state.nm_cidade,
            nr_telefone: this.state.nr_telefone,
            nr_celular: this.state.nr_celular,
            cd_CEP: this.state.cd_CEP,
            nm_responsavel: this.state.nm_responsavel,
            dt_validadecontrato: this.state.dt_validadecontrato,
            ds_status: this.state.ds_status
        };
        api.post('/empresas', obj)
            .then(res => console.log(res.data));

        this.setState({
            nm_empresa: '',
            cd_cnpj: '',
            ds_email: '',
            ds_endereco: '',
            sg_estado: '',
            num_endereco: '',
            ds_complemento: '',
            nm_cidade: '',
            nr_telefone: '',
            nr_celular: '',
            cd_CEP: '',
            nm_responsavel: '',
            dt_validadecontrato: '',
            ds_status: "Ativa"
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
        <main role="main" className="bg-light">
        <div className="quadrado">Quadrado</div>
        <h1> Adicionar empresa </h1>
        
     <form id="formulario" onSubmit={this.onSubmit}>
         <fieldset>
             <h2 class="info-empresas">Informações </h2>
            <div className="form-row">
                <div className="form-group col-md-5">
                    <label for="inputNomeEmpresa">Nome*</label>
                    <input type="text" className="form-control" id="inputNome" placeholder="Nome da Empresa" required  value={this.state.nm_empresa}
                        onChange={this.onChangeEmpresa}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-5">
                    <label for="inputCNPJ">CNPJ*</label>
                    <input type="text" className="form-control" id="inputCNPJ" required value={this.state.cd_cnpj}
                        onChange={this.onChangeCNPJ} placeholder="Ex.: "/>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-2">
                    <label for="inputTel">Telefone</label>
                    <input type="tel" className="form-control" id="inputTel" placeholder="Ex: (00)0000-0000" required value={this.state.nr_telefone}
                        onChange={this.onChangeTelefone}/>
                </div>
                <div className="form-group col-md-3">
                    <label for="inputCel">Celular*</label>
                    <input type="tel" className="form-control" id="inputCel" placeholder="Ex: (00)00000-0000" required value={this.state.nr_celular}
                        onChange={this.onChangeCelular}/>
                </div>
                </div>
                <div className="form-row">
                 <div className="form-group col-md-5">
                    <label for="inputResponsavel">Nome responsável*</label>
                    <input type="text" className="form-control" id="inputResponsavel" placeholder="Ex.: Rodrigo das Neves" required value={this.state.nm_responsavel}
                        onChange={this.onChangeResponsavel}/>
                </div>
                </div>
                <div className="form-row">
                 <div className="form-group col-md-5">
                    <label for="inputEmail">E-mail*</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="E-mail do representante" required value={this.state.ds_email}
                        onChange={this.onChangeEmail}/>
                </div>
                </div>
                <div className="form-row">
                
                
               
                <div className="form-group col-md-3">
                    <label for="inputData">Data vencimento contrato*</label>
                    <input type="date" className="form-control" id="inputData" placeholder="Data" required value={this.state.dt_validadecontrato}
                        onChange={this.onChangeDtValidade}/>
                </div>
            </div>
         </fieldset>
         <fieldset>
             <legend>Endereço</legend>
         <div className="form-row">
             <div className="form-group col-md-2">
              <label for="inputCEP">CEP*</label>
              <input type="text" className="form-control" id="inputCEP" placeholder="Ex: 00000-000" required value={this.state.cd_CEP}
                        onChange={this.onChangeCEP}/>
            </div>
             
             <div className="form-group col-md-4">
              <label for="inputEstado">Estado (Sigla)*</label>
              <input type="text" maxLength='2' id="inputEstado" className="form-control" required value={this.state.sg_estado}
                        onChange={this.onChangeEstado}/>
             
            </div>
            
             <div className="form-group col-md-3">
              <label for="inputCidade">Cidade*</label>
              <input type="text" className="form-control" id="inputCidade" required value={this.state.nm_cidade}
                        onChange={this.onChangeCidade}/>
            </div>
           <div className="form-group col-md-4">
            <label for="inputRua">Rua*</label>
            <input type="text" className="form-control" id="inputRua" placeholder="Ex: Rua Aleatória" required value={this.state.ds_endereco}
                        onChange={this.onChangeEndereco}/>
        </div>
        <div className="form-group col-md-1">
            <label for="inputNumCasa">Número*</label>
            <input type="text" className="form-control" id="inputNumCasa" placeholder="Ex: 0000" required value={this.state.num_endereco}
                        onChange={this.onChangeNumEndereco}/>
        </div>
        <div className="form-group col-md-1">
            <label for="inputComp">Comp.</label>
            <input type="text" className="form-control" id="inputComp" placeholder="Ex: 3º andar Ap. 00" value={this.state.ds_complemento}
                        onChange={this.onChangeComplemento}/>
             </div> 
             </div>
             </fieldset>
        <input type="submit" className="btn btn-primary" id="salvar" value="Cadastrar"/>
        <input type="reset" className="btn btn-primary" id="cancelar" value="Limpar"/>
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