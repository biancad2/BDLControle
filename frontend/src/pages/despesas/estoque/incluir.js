import React, { Component } from 'react';
import api from '../../../services/api'
import './estoque.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import Logo from '../../../assets/logobranco2.png';
import Usuario from '../../../assets/usuario-branco.png';
import Notificacao from '../../../assets/icone.png';
import Download from '../../../assets/download.png';
export default class CreateEstoque extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nm_produto: '',
            qt_produto: '',
            ds_produto: '',
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
    }
    onChangeNome(e) {
        this.setState({
            nm_produto: e.target.value
        })
    }
    onChangeQuantidade(e) {
        this.setState({
            qt_produto: e.target.value
        })
    }
    onChangeDescricao(e) {
        this.setState({
           ds_produto: e.target.value
        })
    }
  

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            nm_produto: this.state.nm_produto,
            qt_produto: this.state.qt_produto,
            ds_produto: this.state.ds_produto
        };


        api.post('/estoques', obj)
            .then(res => console.log(res.data));

        this.setState({
            nm_produto: '',
            qt_produto: '',
            ds_produto: ''
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
                <Link className="nav-link" to="/main">Home</Link>
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
            <li className="nav-item dropdown active">
                <Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                <div className="dropdown-menu" aria-labelledby="dropdown04">
                    <Link className="dropdown-item" to="/multas">Multas</Link>
                    <Link className="dropdown-item" to="/manutencoes">Manutenções</Link>
                    <Link className="dropdown-item" to="/estoques">Estoque <span className="sr-only">(atual)</span></Link>   
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
    <h1> Adicionar produto </h1>
    
 <form id="formulario" onSubmit={this.onSubmit}>
     <fieldset>
         <h2 style={{textAlign: 'left'}}>Informações </h2>
        <div className="form-row">
        <div className="form-group col-md-3">
                <label for="inputNome">Nome do produto*</label>
                <input type="text" className="form-control" id="inputNome" name="inputNome"  required value={this.state.nm_produto}
                    onChange={this.onChangeNome}/>
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-3">
            <label for="inputDescricao">Descrição do produto*</label>
            <textarea className="form-control" id="inputDescricao" name="inputDescricao"  required value={this.state.ds_produto}
                    onChange={this.onChangeDescricao}></textarea>
            </div>
            
            </div>
            <div className="form-row">
            <div className="form-group col-md-3">
            <label for="inputQuantidade">Quantidade do produto*</label>
                <input type="number" className="form-control" id="inputQuantidade" name="inputQuantidade"  required value={this.state.qt_produto}
                    onChange={this.onChangeQuantidade}/>
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