import React, { Component } from 'react';
import api from '../../services/api'
import './empresas.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
        this.onChangeFoto = this.onChangeFoto.bind(this);


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
            ds_email: '',
            foto_motorista:''
        }
    }
    
    onChangeEmpresa(e) {
        this.setState({
            id_empresa: e.target.value
        })
    }
    onChangeCPF(e) {
        this.setState({
            cd_cpf: e.target.value
        })
    }
    onChangeCNH(e) {
        this.setState({
           cd_cnh: e.target.value
        })
    }
    onChangeRg(e) {
        this.setState({
            cd_rg: e.target.value
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
            nr_telefone: e.target.value
        })
    }
    onChangeCelular(e) {
        this.setState({
            nr_celular: e.target.value
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

    onChangeFoto(e) {
        this.setState({
            foto_motorista: e.target.value
        })
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
            foto_motorista: this.state.foto_motorista,
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
            ic_seg:true,
            ic_ter:true,
            ic_quar: true,
            ic_quin: true,
            ic_sex: true, 
            ic_sab: true,
            ic_dom: true,  
            foto_motorista:''
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
                        <li class="nav-item">
                            <Link class="nav-link" to="/empresas">Empresas</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="veiculos.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <Link class="dropdown-item" to="/veiculos">Todos</Link>
                                <Link class="dropdown-item" to="veiculos-alugados.html">Alugados</Link>
                            </div>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/motoristas">Motoristas <span class="sr-only">(atual)</span></Link>
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
            <h1> Adicionar motorista </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2>Informações pessoais</h2>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputNome">Nome*</label>
                        <input type="text" class="form-control" id="inputNome" placeholder="Nome" required value={this.state.nm_motorista}
                            onChange={this.onChangeNome}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputSobrenome">Sobrenome*</label>
                        <input type="text" class="form-control" id="inputSobrenome" placeholder="Sobrenome" required value={this.state.sobrenome_motorista}
                            onChange={this.onChangeSobrenome}/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputRG">RG*</label>
                        <input type="text" class="form-control" id="inputRG" placeholder="Ex: 00.000.000-0" required value={this.state.cd_rg}
                            onChange={this.onChangeRg}/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputCPF">CPF*</label>
                        <input type="text" class="form-control" id="inputCPF" placeholder="Ex: 000.000.000-00" required value={this.state.cd_cpf}
                            onChange={this.onChangeCPF}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputCNH">CNH*</label>
                        <input type="text" class="form-control" id="inputCNH" placeholder="Ex: 000123456789" required value={this.state.cd_cnh}
                            onChange={this.onChangeCNH}/>
                    </div>
                    <div class="form-group  col-md-2">
                        <label for="catCNH"> Categoria CNH*</label>
                        <select name="catCNH" class="form-control" id="catCNH"  tabindex="" required value={this.state.cat_cnh}
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
                    <div class="form-group col-md-2">
                        <label for="inputTel">Telefone</label>
                        <input type="tel" class="form-control" id="inputTel" placeholder="Ex: (00)0000-0000" value={this.state.nr_telefone}
                            onChange={this.onChangeTelefone}/>
                    </div>
                     <div class="form-group col-md-2">
                        <label for="inputCel">Celular*</label>
                        <input type="tel" class="form-control" id="inputCel" placeholder="Ex: (00)00000-0000" required value={this.state.nr_celular}
                            onChange={this.onChangeCelular}/>
                    </div>
                    <div class="custom-file col-md-4">
                     <label class="custom-file-label" for="customFile">Selecionar foto do motorista</label>
                    <input type="file" class="custom-file-input" id="customFile " value={this.state.foto_motorista} onChange={this.onChangeFoto}/>
                </div>
             
                </div>
             </fieldset>
             <fieldset>
                 <legend>Endereço</legend>
             <div class="form-row">
                 <div class="form-group col-md-2">
                  <label for="inputCEP">CEP*</label>
                  <input type="text" class="form-control" id="inputCEP" placeholder="Ex: 00000-000" required/>
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
                            onChange={this.onChangeNrEnd}/>
            </div>
            <div class="form-group col-md-1">
                <label for="inputComp">Comp.</label>
                <input type="text" class="form-control" id="inputComp" placeholder="Ex: Ap. 00"/>
                 </div> 
                 </div>
                 </fieldset>
             <div class="form-row">
            <div class="form-group  col-md-2">
                    <label for="empresa"> Nome da empresa*</label>
                    <select name="empresa" class="form-control" id="empresa"  tabindex="">
                        <option value=""> Selecione... </option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                <label for="inputCNPJ">CNPJ*</label>
                <input type="text" class="form-control" id="inputCNPJ"  value={this.state.id_empresa}
                            onChange={this.onChangeEmpresa}/>
                </div> 
                 
                 
            </div>
           
            <button type="submit" class="btn btn-primary" id="salvar">Salvar</button>
            <button type="submit" class="btn btn-primary" id="cancelar">Cancelar</button>
        </form>
        </main>
        </div>
        )
    }
}