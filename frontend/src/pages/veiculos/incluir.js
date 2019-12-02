import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

export default class CreateVeiculo extends Component {
    constructor(props) {
        super(props);
        this.onChangeProprietario = this.onChangeProprietario.bind(this);
        this.onChangeEmpresa = this.onChangeEmpresa.bind(this);
        this.onChangeIdFrota = this.onChangeIdFrota.bind(this);
        this.onChangeAno = this.onChangeAno.bind(this);
        this.onChangeCor = this.onChangeCor.bind(this);
        this.onChangeCilindrada = this.onChangeCilindrada.bind(this);
        this.onChangeKM = this.onChangeKM.bind(this);
        this.onChangePassageiros = this.onChangePassageiros.bind(this);
        this.onChangePeso = this.onChangePeso.bind(this);
        this.onChangePlaca = this.onChangePlaca.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeRenavam = this.onChangeRenavam.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id_empresa: '',
            ds_proprietario: '',
            id_frota: '',
            qt_ano: '',
            qt_cilindrada: '',
            ds_cor: '',
            qt_quilometragem: '',
            qt_passageiros: '',
            qt_peso: '',
            ds_placa: '',
            nr_renavam: '',
            ds_status: '',
            empresas: [], 
            categorias: [],
            nm_usuario: '',
            nm_sobrenome: '',
            email: '',
            errors: {}
        }
    }
    componentDidMount() {
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
        api.get('/categorias/')
        .then(response => {
          this.setState({ categorias: response.data });

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
    onChangeAno(e) {
        this.setState({
            qt_ano: e.target.value
        })
    }
    onChangeCor(e) {
        this.setState({
           ds_cor: e.target.value
        })
    }
    onChangeCilindrada(e) {
        this.setState({
            qt_cilindrada: e.target.value
        })
    }
    onChangeProprietario(e) {
        this.setState({
            ds_proprietario: e.target.value
        })
    }
    onChangeIdFrota(e) {
        this.setState({
            id_frota: e.target.value
        })
    }
    onChangeKM(e) {
        this.setState({
            qt_quilometragem: e.target.value
        })
    }
    onChangePassageiros(e) {
        this.setState({
            qt_passageiros: e.target.value
        })
    }
    onChangePeso(e) {
        this.setState({
            qt_peso: e.target.value
        })
    }
    onChangePlaca(e) {
        this.setState({
            ds_placa: e.target.value
        })
    }
    onChangeRenavam(e) {
        this.setState({
            nr_renavam: e.target.value
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
            id_empresa: this.state.id_empresa,
            qt_ano: this.state.qt_ano,
            qt_cilindrada: this.state.qt_cilindrada,
            ds_cor: this.state.ds_cor,
            ds_proprietario: this.state.ds_proprietario,
            id_frota: this.state.id_frota,
            qt_quilometragem: this.state.qt_quilometragem,
            qt_passageiros: this.state.qt_passageiros,
            qt_peso: this.state.qt_peso,
            ds_placa: this.state.ds_placa,
            nr_renavam: this.state.nr_renavam,
            ds_status: this.state.ds_status
        };


        api.post('/veiculos', obj)
            .then(res => console.log(res.data));

        this.setState({
            id_empresa: '',
            ds_proprietario: '',
            id_frota: '',
            qt_ano: '',
            qt_cilindrada: '',
            ds_cor: '',
            qt_quilometragem: '',
            qt_passageiros: '',
            qt_peso: '',
            ds_placa: '',
            nr_renavam: '',
            ds_status: ''
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
                <li className="nav-item ">
                    <Link className="nav-link" to="/empresas">Empresas </Link>
                </li>
                <li className="nav-item dropdown active">
                    <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link className="dropdown-item" to="/veiculos">Todos <span className="sr-only">(atual)</span></Link>
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
        <h1> Adicionar veículo </h1>
        
     <form id="formulario" onSubmit={this.onSubmit}>
         <fieldset>
             <h2 className="titulo-form">Informações empresa</h2>
             <div className="form-row">
                 <div className="form-group  col-md-5">
                    <label for="proprietario"> Proprietário*</label>
                    <select name="proprietario" className="form-control" id="proprietario"  tabindex="1" required value={this.state.ds_proprietario}
                        onChange={this.onChangeProprietario}>
                        <option value=""> Selecione... </option>
                        <option value="empresa"> Empresa </option>
                        <option value="locacao">  Locação </option>
                    </select>
                 </div>
                 </div>

                 <div className="form-row">
            <div className="form-group col-md-5">
                <label for="inputEmpresa">Selecionar empresa*</label>
                   <select  className="form-control" id="idEmpresa"  tabindex="" required value={this.state.id_empresa}
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
         </fieldset>
         <fieldset>
             <h2 className="titulo-form">Veículo</h2>
             <div className="form-row">
                <div className="form-group col-md-5">
                    <label for="categoria"> Categoria*</label>
                    <select name="categoria" id="categoria" className="form-control" value={this.state.id_frota}
                        onChange={this.onChangeIdFrota}>
                            <option value="">Selecionar...</option>
                        { this.state.categorias.map(cat =>(
                    <option value={cat.id_frota}>{cat.ds_frota}</option>
                    
               ))}
                    </select>
                </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label for="inputAno">Ano do modelo</label>
                    <input type="number" className="form-control" id="inputAno" placeholder="Ex.: 2009" value={this.state.qt_ano}
                        onChange={this.onChangeAno}/>
                 </div>
                 <div className="form-group col-md-2">
                 <label for="inputCilindrada">Cilindrada</label>
                    <input type="number" className="form-control" id="inputCilindrada" placeholder="Ex.: 1.0" step="0.1" value={this.state.qt_cilindrada}
                        onChange={this.onChangeCilindrada}/>
                    
                 </div> 
                 </div>
                 <div className="form-row">
                <div className="form-group col-md-3">
                <label for="inputCor">Cor</label>
                    <input type="text" className="form-control" id="inputCor" placeholder="Ex.: Prata" value={this.state.ds_cor}
                        onChange={this.onChangeCor}/>
                 </div> 
                 <div className="form-group col-md-2">
                    <label for="inputQuilometragem">Quilometragem</label>
                    <input type="text" className="form-control" id="inputQuilometragem" name="inputQuilometragem" placeholder="Ex.: 15500" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Quantos KM o veículo percorreu"
                    value={this.state.qt_quilometragem}
                    onChange={this.onChangeKM}
                    />
                 </div>
                 </div>
                 <div className="form-row"> 
                  <div className="form-group col-md-3">
                  <label for="inputQtPassageiros">Peso máximo</label>
                    <input type="number" className="form-control" id="inputQtPassageiros" name="inputQtPassageiros" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Peso que o veículo suporta" placeholder="Ex.: 45 toneladas"
                    value={this.state.qt_peso}
                    onChange={this.onChangePeso}
                    />
                    
                 </div> 
                <div className="form-group col-md-2">
                <label for="inputQtPassageiros">Qt passageiros</label>
                    <input type="number" className="form-control" id="inputQtPassageiros" name="inputQtPassageiros" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Insira o limite de passageiros do veículo" placeholder="Ex.: 5"
                    value={this.state.qt_passageiros}
                    onChange={this.onChangePassageiros}
                    />
                 </div> 
                 </div>
                 <div className="form-row"> 
                 <div className="form-group col-md-3">
                 <label for="inputRenavam">Renavam</label>
                    <input type="text" className="form-control" id="inputRenavam" placeholder="Ex.: 0123456789" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Pode ser encontrado no canto esquerdo do CRLV"
                    value={this.state.nr_renavam}
                    onChange={this.onChangeRenavam}
                    /> 
                 </div>
                 <div className="form-group col-md-2">
                    
                    <label for="inputPlaca">Placa</label>
                    <input type="text" className="form-control" id="inputPlaca" placeholder="Ex.: AAA-000" value={this.state.ds_placa}
                        onChange={this.onChangePlaca}/>
                 </div>
                 </div>
                 <div className="form-row"> 
                 <div className="form-group col-md-5">
                    <label for="status"> Status*</label>
                    <select name="status" id="status" className="form-control" value={this.state.ds_status}
                        onChange={this.onChangeStatus}>
                        <option value="Ativo"> Disponível </option> 
                        <option value="Encerrado"> Indisponível </option> 
                    </select>
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