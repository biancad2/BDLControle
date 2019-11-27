import React, { Component } from 'react';
import api from '../../services/api'
import './empresas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


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
        this.onChangeQtVeic = this.onChangeQtVeic.bind(this);
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
            qt_veiculos: '',
            nm_responsavel: '',
            dt_validadecontrato: '',
            ds_status: "Ativa"
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
    onChangeQtVeic(e) {
        this.setState({
            qt_veiculos: e.target.value
        })
    }
    onChangeCelular(e) {
        this.setState({
            nr_celular: e.target.value
        })
    }
    onChangeCEP(e) {
        this.setState({
            cd_CEP: e.target.value
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
            qt_veiculos: this.state.qt_veiculos,
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
            qt_veiculos: '',
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

    render() {
        return (
            <div>
                 <nav class="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <Link class="navbar-brand" to="#">
                    <img src={Logo}/>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link class="nav-link" to="index.html">Home</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/empresas">Empresas<span class="sr-only">(atual)</span></Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="veiculos.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <Link class="dropdown-item" to="/veiculos">Todos</Link>
                                <Link class="dropdown-item" to="veiculos-alugados.html">Alugados</Link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/motoristas">Motoristas</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown03">
                                <Link class="dropdown-item" to="/viagens">Em andamento</Link>
                                <Link class="dropdown-item" to="viagens-concluidas.html">Concluídas</Link>
   
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <Link class="dropdown-item" to="multas.html">Multas</Link>
                                <Link class="dropdown-item" to="manutencoes.html">Manutenções</Link>
                                <Link class="dropdown-item" to="estoque.html">Estoque</Link>   
                            </div>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="#">Relatórios</Link>
                        </li>
                    </ul>
                   
                    <ul class="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li class="download">
                            <Link to="#"><img src={Download}/></Link>
                        </li>
                        <li class="nav-item notificacao dropdown-notifications">
                            <Link to="#" class="dropdown-toggle">
                                <img src={Notificacao}/>
                            </Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link to="#" class="dropdown-toggle usuario-nome" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}/> 
                                Usuário
                            </Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <Link class="dropdown-item" to="#">Item 1</Link>
                                <Link class="dropdown-item" to="#">Item 2</Link>
                                <Link class="dropdown-item" to="#">Item 3</Link>   
                            </div>
                        </li>
                    </ul>
                </div>
          </nav> 
            <main role="main" class="bg-light">
            <div class="quadrado">Quadrado</div>
            <h1> Adicionar empresa </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2>Informações </h2>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputNomeEmpresa">Nome*</label>
                        <input type="text" class="form-control" id="inputNome" placeholder="Nome da Empresa" required  value={this.state.nm_empresa}
                            onChange={this.onChangeEmpresa}/>
                    </div>
                
                    <div class="form-group col-md-2">
                        <label for="inputCNPJ">CNPJ*</label>
                        <input type="text" class="form-control" id="inputCNPJ" required value={this.state.cd_cnpj}
                            onChange={this.onChangeCNPJ}/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputQTVeic">Quantidade de veículos</label>
                        <input type="number" class="form-control" id="inputQTVeic" placeholder="Ex: 100" required  value={this.state.qt_veiculos}
                            onChange={this.onChangeQtVeic}/>
                    </div>
                    
                    <div class="form-group col-md-2">
                        <label for="inputTel">Telefone</label>
                        <input type="tel" class="form-control" id="inputTel" placeholder="Ex: (00)0000-0000" required value={this.state.nr_telefone}
                            onChange={this.onChangeTelefone}/>
                    </div>
                     <div class="form-group col-md-2">
                        <label for="inputCel">Celular*</label>
                        <input type="tel" class="form-control" id="inputCel" placeholder="Ex: (00)00000-0000" required value={this.state.nr_celular}
                            onChange={this.onChangeCelular}/>
                    </div>
                     <div class="form-group col-md-3">
                        <label for="inputEmail">E-mail*</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="E-mail do representante" required value={this.state.ds_email}
                            onChange={this.onChangeEmail}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputData">Data vencimento contrato*</label>
                        <input type="date" class="form-control" id="inputData" placeholder="Data" required value={this.state.dt_validadecontrato}
                            onChange={this.onChangeDtValidade}/>
                    </div>
                </div>
             </fieldset>
             <fieldset>
                 <legend>Endereço</legend>
             <div class="form-row">
                 <div class="form-group col-md-2">
                  <label for="inputCEP">CEP*</label>
                  <input type="text" class="form-control" id="inputCEP" placeholder="Ex: 00000-000" required value={this.state.cd_CEP}
                            onChange={this.onChangeCEP}/>
                </div>
                 
                 <div class="form-group col-md-4">
                  <label for="inputEstado">Estado*</label>
                  <select id="inputEstado" class="form-control" required value={this.state.sg_estado}
                            onChange={this.onChangeEstado}>
                    <option selected>Escolher...</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                  </select>
                </div>
                
                 <div class="form-group col-md-3">
                  <label for="inputCidade">Cidade*</label>
                  <input type="text" class="form-control" id="inputCidade" required value={this.state.nm_cidade}
                            onChange={this.onChangeCidade}/>
                </div>
               <div class="form-group col-md-4">
                <label for="inputRua">Rua*</label>
                <input type="text" class="form-control" id="inputRua" placeholder="Ex: Rua Aleatória" required value={this.state.ds_endereco}
                            onChange={this.onChangeEndereco}/>
            </div>
            <div class="form-group col-md-1">
                <label for="inputNumCasa">Número*</label>
                <input type="text" class="form-control" id="inputNumCasa" placeholder="Ex: 0000" required value={this.state.num_endereco}
                            onChange={this.onChangeNumEndereco}/>
            </div>
            <div class="form-group col-md-1">
                <label for="inputComp">Comp.</label>
                <input type="text" class="form-control" id="inputComp" placeholder="Ex: 3º andar Ap. 00" value={this.state.ds_complemento}
                            onChange={this.onChangeComplemento}/>
                 </div> 
                 </div>
                 </fieldset>
            <input type="submit" className="btn btn-primary" id="salvar" value="cadastrar"/>
            <input type="reset" className="btn btn-primary" id="cancelar" value="limpar"/>
        </form>
        </main>
        </div>)
    }
}