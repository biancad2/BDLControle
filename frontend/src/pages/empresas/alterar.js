import React, { Component } from 'react';
import api from '../../services/api'
import './empresas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
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
        this.onChangeQtVeic = this.onChangeQtVeic.bind(this);
        this.onChangeResponsavel = this.onChangeResponsavel.bind(this);
        this.onChangeDtValidade = this.onChangeDtValidade.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


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
                validadecontrato: ""
            },
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
                veiculos: response.data[0].qt_veiculos,
                estado: response.data[0].sg_estado,
                nrendereco: response.data[0].num_endereco,
                complemento: response.data[0].ds_complemento,
                CEP: response.data[0].cd_CEP,
                cidade: response.data[0].nm_cidade,
                telefone: response.data[0].nr_telefone,
                celular: response.data[0].nr_celular,
                responsavel: response.data[0].nm_responsavel,
                validadecontrato: response.data[0].dt_validadecontrato
            });
                console.log(response);
                console.log(response.data.id_empresa);
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    onChangeId(e) {
        this.setState({
            id_emp: e.target.value
        });
    }
    onChangeEmpresa(e) {
        this.setState({
            nm_emp: e.target.value
        })
    }
    onChangeCNPJ(e) {
        this.setState({
            cnpj: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeEndereco(e) {
        this.setState({
            endereco: e.target.value
        })
    }
    onChangeEstado(e) {
        this.setState({
            estado: e.target.value
        })
    }
    onChangeNumEndereco(e) {
        this.setState({
            nrendereco: e.target.value
        })
    }
    onChangeComplemento(e) {
        this.setState({
            complemento: e.target.value
        })
    }
    onChangeCidade(e) {
        this.setState({
            cidade: e.target.value
        })
    }
    onChangeTelefone(e) {
        this.setState({
            telefone: e.target.value
        })
    }
    onChangeQtVeic(e) {
        this.setState({
            veiculos: e.target.value
        })
    }
    onChangeCelular(e) {
        this.setState({
            celular: e.target.value
        })
    }
    onChangeCEP(e) {
        this.setState({
            CEP: e.target.value
        })
    }
    onChangeResponsavel(e) {
        this.setState({
            responsavel: e.target.value
        })
    }
    onChangeDtValidade(e) {
        this.setState({
            validadecontrato: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            nm_empresa: this.state.nm_emp,
            cd_cnpj: this.state.cnpj,
            ds_email: this.state.email,
            qt_veiculos: this.state.veiculos,
            ds_endereco: this.state.endereco,
            sg_estado: this.state.estado,
            num_endereco: this.state.nrendereco,
            ds_complemento: this.state.complemento,
            nm_cidade: this.state.cidade,
            nr_telefone: this.state.telefone,
            nr_celular: this.state.celular,
            cd_CEP: this.state.CEP,
            nm_responsavel: this.state.responsavel,
            dt_validadecontrato: this.state.validadecontrato,
            qt_veiculos: this.state.veiculos
        };

        console.log('Nome da empresa: ' + obj.nome)

        api.put('/empresas/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/empresas');
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
            <h1> Atualizar empresa </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2>Informações </h2>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputNomeEmpresa">Nome*</label>
                        <input type="text" class="form-control" id="inputNome" placeholder="Nome da Empresa" required  value={this.state.nm_emp}
                            onChange={this.onChangeEmpresa}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputNomeR">Nome responsavel*</label>
                        <input type="text" class="form-control" id="inputNomeR" placeholder="Nome do responsável" required  value={this.state.responsavel}
                            onChange={this.onChangeResponsavel}/>
                    </div>
                
                    <div class="form-group col-md-2">
                        <label for="inputCNPJ">CNPJ*</label>
                        <input type="text" class="form-control" id="inputCNPJ" required value={this.state.cnpj}
                            onChange={this.onChangeCNPJ}/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputQTVeic">Quantidade de veículos</label>
                        <input type="number" class="form-control" id="inputQTVeic" placeholder="Ex: 100" required  value={this.state.veiculos}
                            onChange={this.onChangeQtVeic}/>
                    </div>
                    
                    <div class="form-group col-md-2">
                        <label for="inputTel">Telefone</label>
                        <input type="tel" class="form-control" id="inputTel" placeholder="Ex: (00)0000-0000" required value={this.state.telefone}
                            onChange={this.onChangeTelefone}/>
                    </div>
                     <div class="form-group col-md-2">
                        <label for="inputCel">Celular*</label>
                        <input type="tel" class="form-control" id="inputCel" placeholder="Ex: (00)00000-0000" required value={this.state.celular}
                            onChange={this.onChangeCelular}/>
                    </div>
                     <div class="form-group col-md-3">
                        <label for="inputEmail">E-mail*</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="E-mail do representante" required value={this.state.email}
                            onChange={this.onChangeEmail}/>
                    </div>
                </div>
             </fieldset>
             <fieldset>
                 <legend>Endereço</legend>
             <div class="form-row">
                 <div class="form-group col-md-2">
                  <label for="inputCEP">CEP*</label>
                  <input type="text" class="form-control" id="inputCEP" placeholder="Ex: 00000-000" required value={this.state.CEP}
                            onChange={this.onChangeCEP}/>
                </div>
                 
                 <div class="form-group col-md-4">
                  <label for="inputEstado">Estado*</label>
                  <select id="inputEstado" class="form-control" required value={this.state.estado}
                            onChange={this.onChangeEstado}>
                    <option selected>Escolher...</option>
                    <option value="SP">São paulo</option>
                    <option value="RJ">Rio de janeiro</option>
                  </select>
                </div>
                
                 <div class="form-group col-md-3">
                  <label for="inputCidade">Cidade*</label>
                  <input type="text" class="form-control" id="inputCidade" required value={this.state.cidade}
                            onChange={this.onChangeCidade}/>
                </div>
               <div class="form-group col-md-4">
                <label for="inputRua">Rua*</label>
                <input type="text" class="form-control" id="inputRua" placeholder="Ex: Rua Aleatória" required value={this.state.endereco}
                            onChange={this.onChangeEndereco}/>
            </div>
            <div class="form-group col-md-1">
                <label for="inputNumCasa">Número*</label>
                <input type="text" class="form-control" id="inputNumCasa" placeholder="Ex: 0000" required value={this.state.nrendereco}
                            onChange={this.onChangeNumEndereco}/>
            </div>
            <div class="form-group col-md-1">
                <label for="inputComp">Comp.</label>
                <input type="text" class="form-control" id="inputComp" placeholder="Ex: 3º andar Ap. 00" value={this.state.complemento}
                            onChange={this.onChangeComplemento}/>
                 </div> 
                 </div>
                 </fieldset>
            <input type="submit" className="btn btn-primary" id="salvar" value="salvar"/>
            <input type="reset" className="btn btn-primary" id="cancelar" value="limpar"/>
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