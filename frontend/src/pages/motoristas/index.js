import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import api from '../../services/api'
import TableRow from './tableRow';
import './motoristas.css';
import jwt_decode from 'jwt-decode'


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

class Motoristas extends Component {
    
    constructor(props) {
        super(props);
        this.state = {motoristas: [], items: [],
          nm_usuario: '',
          nm_sobrenome: '',
          email: '',
          errors: {},
        };
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
        api.get('/motoristas/')
        .then(response => {
          this.setState({ motoristas: response.data, items: response.data});
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    filterList=(event)=>{
        let items = this.state.motoristas;
        items = items.filter((item)=>{
            return  item.nm_motorista.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1  || item.cd_cpf.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1  
        });
        this.setState({items: items});
        console.log(items);
    }
    filterList1=(event)=>{
      let items = this.state.motoristas;
      items = items.filter((item)=>{
          return item.cat_cnh.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1  
      });
      this.setState({items: items});
      console.log(items);
  }
    tabRow(){
        return this.state.motoristas.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
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
      const userLink = (<div>

        <nav className="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                    <Link class="navbar-brand" to="/main">
                        <img src={Logo}></img>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
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
                          <li className="nav-item active">
                                <Link className="nav-link" to="/motoristas">Motoristas <span className="sr-only">(atual)</span></Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/viagens">Viagens</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <Link className="dropdown-item" to="/multas">Multas</Link>
                                    <Link className="dropdown-item" to="/manutencoes">Manutenções</Link>
                                    <Link className="dropdown-item" to="/estoques">Estoque</Link>   
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
                  <div className="quadrado">Quadrado</div>
                    <h1> Motoristas </h1>
                    <form method="get" action="" className="centro row">
                 <h2 className="filtrar">Filtrar</h2>

                <div className="formulario selecionar centro col-md-2">
                    <label for="categoria"> Categoria CNH</label>
                    <select name="categoria" id="categoria"  tabindex="7" onChange={this.filterList1}>
                    <option value="">Selecionar...</option>
                    <option value="A"> A </option>
       <option value="B">  B </option>
       <option value="AB"> A/B </option>
       <option value="C"> C </option>
       <option value="D"> D </option>
       <option value="E"> E </option>
                    </select>
                </div>

                <div className="formulario busca col-md-2">
                    <label for="pesquisa"> Pesquisar	</label>
                    <input type="text" name="pesquisa" id="pesquisar-veic" size="9" minlength="6" maxlength="7" placeholder="Pesquisar Nome/CPF" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Você pode pesquisar o motorista pelo nome ou CPF." onChange={this.filterList}/>
                    <span id="box_icone_busca">
                        <i id="icone_busca" className="fa fa-search"></i>
                    </span> 
                </div>
            </form>
                    <div className="adc-rem">
                Adicionar motorista: 
               <Link to={'/incluir-moto'}> <button className="adc"></button></Link>
            </div>
                    <div className="table-responsive">
                  <table className="table table-md" style={{ marginTop: 20 }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CNH</th>
                                    <th>CPF</th>
                                    <th>Celular</th>
                                    <th>Cat. CNH</th>
                                    <th>Empresa</th>
                                    <th colSpan="2">Ações</th>
                                </tr>
                            </thead>
                            <tbody> {this.state.items.map(function(item, i){
                              return <TableRow obj={item} key={i} />;
                          })
                      }
                            </tbody>
                        </table> 
                    </div>
                
                  
                </div>)

    return (
        <div>

        {localStorage.usertoken==null ? this.props.history.push(`./login`)  : userLink}
        </div>
     
    );
  }
}

export default Motoristas;