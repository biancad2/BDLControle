import React, { Component } from 'react';
import api from '../../services/api'
import './motoristas.css';
import { cepMask } from '../../js/mascaras/cepmask';
import { telMask } from '../../js/mascaras/telmask';
import { celMask } from '../../js/mascaras/celmask';
import { cpfMask } from '../../js/mascaras/cpfmask';
import { rgMask } from '../../js/mascaras/rgmask';
import cep from 'cep-promise'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';
export default class CreateMotorista extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeEmpresa = this.onChangeEmpresa.bind(this);
        this.onChangeSobrenome = this.onChangeSobrenome.bind(this);
        this.onChangeCPF = this.onChangeCPF.bind(this);
        this.onChangeCNH = this.onChangeCNH.bind(this);
        this.onChangeRg = this.onChangeRg.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeCelular = this.onChangeCelular.bind(this);
        this.onChangeCatCnh = this.onChangeCatCnh.bind(this);
        this.onChangeEndereco = this.onChangeEndereco.bind(this);
        this.onChangeEstado = this.onChangeEstado.bind(this);
        this.onChangeNrEnd = this.onChangeNrEnd.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCEP = this.onChangeCEP.bind(this);
        this.onBlurCEP = this.onBlurCEP.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
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
            cd_cep: '',
            ds_email: '',
            password: '',
            empresas: [],
            nm_usuario: '',
            nm_sobrenome: '',
            email: '',
            errors: {},
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
        api.get('/empresas/')
        .then(response => {
          this.setState({ empresas: response.data });

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
    onChangeCPF(e) {
        this.setState({
            cd_cpf: cpfMask(e.target.value)
        })
    }
    onChangeCNH(e) {
        this.setState({
           cd_cnh: e.target.value
        })
    }
    onChangeRg(e) {
        this.setState({
            cd_rg: rgMask(e.target.value)
        })
    }
    onChangeNome(e) {
        this.setState({
            nm_motorista: e.target.value
        })
    }
    onChangeSobrenome(e) {
        this.setState({
            sobrenome_motorista: e.target.value
        })
    }
    onChangeTelefone(e) {
        this.setState({
            nr_telefone: telMask(e.target.value)
        })
    }
    onChangeCelular(e) {
        this.setState({
            nr_celular: celMask(e.target.value)
        })
    }
    onChangeCatCnh(e) {
        this.setState({
            cat_cnh: e.target.value
        })
    }
    onChangeEndereco(e) {
        this.setState({
            ds_endereco: e.target.value
        })
    }
    onChangeNrEnd(e) {
        this.setState({
            num_endereco: e.target.value
        })
    }
    onChangeEstado(e) {
        this.setState({
            sg_estado: e.target.value
        })
    }
    onChangeCidade(e) {
        this.setState({
           nm_cidade: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            ds_email: e.target.value
        })
    }

    onChangeCEP(e){
        this.setState({
            cd_cep: cepMask(e.target.value)
        })
    }
    onBlurCEP(){
        cep(this.state.cd_cep)
        .then(response => {
          console.log(response)
          this.setState({
              sg_estado: response.state,
              nm_cidade: response.city,
              ds_endereco: response.street
        })
        }
          
          );
         
    }
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`./login`)
      }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id_empresa: this.state.id_empresa,
            cd_cpf: this.state.cd_cpf,
            cd_rg: this.state.cd_rg,
            cd_cnh: this.state.cd_cnh,
            nm_motorista: this.state.nm_motorista,
            sobrenome_motorista: this.state.sobrenome_motorista,
            nr_telefone: this.state.nr_telefone,
            nr_celular: this.state.nr_celular,
            cat_cnh: this.state.cat_cnh,
            ds_endereco: this.state.ds_endereco,
            num_endereco: this.state.num_endereco,
            sg_estado: this.state.sg_estado,
            nm_cidade: this.state.nm_cidade,
            ds_email: this.state.ds_email,
            cd_cep: this.state.cd_cep,
            password: this.state.cd_cpf
        };


        api.post('/motoristas', obj)
            .then(res => console.log(res.data));

        this.setState({
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
            cd_cep: '',
            password:''
        })
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
                                    <Link className="nav-link" to="/empresas">Empresas </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                                        <Link className="dropdown-item" to="/veiculos">Todos</Link>
                                        <Link className="dropdown-item" to="/veiculos-alugados">Alugados</Link>
                                    </div>
                                </li>
                              <li className="nav-item active">
                                    <Link className="nav-link" to="/motoristas">Motoristas <span className="sr-only">(atual)</span></Link>
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
<h1> Adicionar motorista </h1>

<form id="formulario" onSubmit={this.onSubmit}>
<fieldset>
<h2>Informações pessoais</h2>
<div className="form-row">
<div className="form-group col-md-4">
   <label for="inputNome">Nome*</label>
   <input type="text" className="form-control" id="inputNome" placeholder="Nome" required value={this.state.nm_motorista}
       onChange={this.onChangeNome}/>
</div>

<div className="form-group col-md-4">
   <label for="inputSobrenome">Sobrenome*</label>
   <input type="text" className="form-control" id="inputSobrenome" placeholder="Sobrenome" required value={this.state.sobrenome_motorista}
       onChange={this.onChangeSobrenome}/>
</div>
</div>
<div className="form-row">
<div className="form-group col-md-4">
   <label for="inputRG">RG*</label>
   <input type="text" className="form-control" id="inputRG" placeholder="Ex: 00.000.000-0" required value={this.state.cd_rg}
       onChange={this.onChangeRg}/>
</div>
<div className="form-group col-md-4">
   <label for="inputCPF">CPF*</label>
   <input type="text" className="form-control" id="inputCPF" placeholder="Ex: 000.000.000-00" required value={this.state.cd_cpf}
       onChange={this.onChangeCPF}/>
</div>
</div>
<div className="form-row">
<div className="form-group col-md-4">
   <label for="inputCNH">CNH*</label>
   <input type="text" className="form-control" id="inputCNH" placeholder="Ex: 000123456789" required value={this.state.cd_cnh}
       onChange={this.onChangeCNH}/>
</div>
<div className="form-group  col-md-2">
   <label for="catCNH"> Categoria CNH*</label>
   <select name="catCNH" className="form-control" id="catCNH"  tabindex="" required value={this.state.cat_cnh}
       onChange={this.onChangeCatCnh}>
       <option value=""> Selecione... </option>
       <option value="A"> A </option>
       <option value="B">  B </option>
       <option value="AB"> A/B </option>
       <option value="C"> C </option>
       <option value="D"> D </option>
       <option value="E"> E </option>
   </select>
</div>
</div>
<div className="form-row">
<div className="form-group col-md-4">
   <label for="inputTel">Telefone</label>
   <input type="tel" className="form-control" id="inputTel" placeholder="Ex: (00)0000-0000" value={this.state.nr_telefone}
       onChange={this.onChangeTelefone}/>
</div>
<div className="form-group col-md-4">
   <label for="inputCel">Celular*</label>
   <input type="tel" className="form-control" id="inputCel" placeholder="Ex: (00)00000-0000" required value={this.state.nr_celular}
       onChange={this.onChangeCelular}/>
</div>


</div>
</fieldset>
<fieldset>
<legend>Endereço</legend>
<div className="form-row">
<div className="form-group col-md-4">
<label for="inputCEP">CEP*</label>
<input type="text" className="form-control" id="inputCEP" placeholder="Ex: 00000-000" required onChange={this.onChangeCEP} value={this.state.cd_cep} onBlur={this.onBlurCEP}/>
</div>

<div className="form-group col-md-4">
<label for="inputEstado">Estado*</label>
<input id="inputEstado" className="form-control" required value={this.state.sg_estado}
       onChange={this.onChangeEstado}/>

</div>
</div>
<div className="form-row">
<div className="form-group col-md-2">
<label for="inputCidade">Cidade*</label>
<input type="text" className="form-control" id="inputCidade" required value={this.state.nm_cidade}
       onChange={this.onChangeCidade}/>
</div>
<div className="form-group col-md-4">
<label for="inputRua">Rua*</label>
<input type="text" className="form-control" id="inputRua" placeholder="Ex: Rua Aleatória" required value={this.state.ds_endereco}
       onChange={this.onChangeEndereco}/>
</div>
<div className="form-group col-md-2">
<label for="inputNumCasa">Número*</label>
<input type="text" className="form-control" id="inputNumCasa" placeholder="Ex: 0000" required value={this.state.num_endereco}
       onChange={this.onChangeNrEnd}/>
</div>
<div className="form-group col-md-1">
<label for="inputComp">Comp.</label>
<input type="text" className="form-control" id="inputComp" placeholder="Ex: Ap. 00"/>
</div> 
</div>
</fieldset>
<div className="form-row">
<div className="form-group col-md-3">
<label for="inputEmpresa">Selecionar empresa*</label>
  <select  className="form-control" id="idEmpresa"  tabindex="" required value={this.state.id_empresa}
onChange={this.onChangeEmpresa}>
<option value="">Selecionar...</option>
{ this.state.empresas.map(empresa =>(
   <option value={empresa.id_empresa}>{empresa.nm_empresa}</option>
   
))}
</select>
</div>
<div className="form-group col-md-3">
<label for="inputCNPJ">ID*</label>
<input type="text" className="form-control" id="inputCNPJ"  value={this.state.id_empresa} ref="cnpj"/>
</div> 


</div>

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