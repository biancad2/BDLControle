import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import api from '../../services/api'
import TableRow from './tableRow';
import './veiculos.css';


import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';

class Veiculos extends Component {
    
    constructor(props) {
        super(props);
        this.state = {veiculos: [], categorias:[], items: []};
    }

     componentDidMount() {
        api.get('/veiculos/')
        .then(response => {
          this.setState({ veiculos: response.data, items: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/categorias/')
        .then(response => {
          this.setState({ categorias: response.data });

        })
        .catch(function (error) {
          console.log(error);
        });
    }
    filterList=(event)=>{
        let items = this.state.veiculos;
        items = items.filter((item)=>{
            return item.id_frota.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1  || item.ds_status.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1  
        });
        this.setState({items: items});
        console.log(items);
    }
    tabRow(){
        return this.state.items.map(function(item, i){
            return <TableRow obj={item} key={i} />;
        });
      }
  render() {
    return (
        <div >
        <nav className="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <Link className="navbar-brand" to="#">
                    <img src={Logo}/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/main">Home</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/empresas">Empresas</Link>
                        </li>
                        <li className="nav-item dropdown active">
                            <Link className="nav-link dropdown-toggle" to="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <Link className="dropdown-item" to="/veiculs">Todos <span className="sr-only">(atual)</span></Link>
                                <Link className="dropdown-item" to="/veiculos-alugados">Alugados</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/motoristas">Motoristas</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown03">
                                <Link className="dropdown-item" to="/viagens">Em andamento</Link>
                                <Link className="dropdown-item" to="viagens-concluidas.html">Concluídas</Link>
   
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <Link className="dropdown-item" to="multas.html">Multas</Link>
                                <Link className="dropdown-item" to="manutencoes.html">Manutenções</Link>
                                <Link className="dropdown-item" to="estoque.html">Estoque</Link>   
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Relatórios</Link>
                        </li>
                    </ul>
                   
                    <ul className="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li className="download">
                            <Link to="#"><img src={Download}/></Link>
                        </li>
                        <li className="nav-item notificacao dropdown-notifications">
                            <Link to="#" className="dropdown-toggle">
                                <img src={Notificacao}/>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to="#" className="dropdown-toggle usuario-nome" to="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}/> 
                                Usuário
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <Link className="dropdown-item" to="#">Item 1</Link>
                                <Link className="dropdown-item" to="#">Item 2</Link>
                                <Link className="dropdown-item" to="#">Item 3</Link>   
                            </div>
                        </li>
                    </ul>
                </div>
          </nav>
          <div className="quadrado">Quadrado</div>
            <h1> Veículos </h1>

            <form method="get" action="" className="centro row">
                 <h2 className="filtrar">Filtrar</h2>
               
                <div className="formulario selecionar centro col-md-2">
                    <label for="disponibilidade"> Situação</label>
                    <select name="status" id="status"  tabindex="7" onChange={this.filterList}>
                        <option value=""> Todos </option>
                        <option value="Disponível"> Disponível </option>
                        <option value="Viagem"> Em viagem </option>
                        <option value="Encerrada"> Indisponível </option>
                    </select>
                </div>

                <div className="formulario selecionar centro col-md-2">
                    <label for="categoria"> Categoria</label>
                    <select name="categoria" id="categoria"  tabindex="7" onChange={this.filterList}>
                    <option value="">Selecionar...</option>
                            { this.state.categorias.map(cat =>(
                        <option value={cat.id_frota}>{cat.ds_frota}</option>
                        ))}
                    </select>
                </div>

                <div className="formulario busca col-md-2">
                    <label for="pesquisa"> Pesquisar	</label>
                    <input type="text" name="pesquisa" id="pesquisar-veic" size="9" minlength="6" maxlength="7" placeholder="Placa/Empresa" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Você pode pesquisar o veículo pela placa ou empresa associada." onChange={this.filterList}/>
                    <span id="box_icone_busca">
                        <i id="icone_busca" className="fa fa-search"></i>
                    </span> 
                </div>
            </form>
            <div className="adc-rem">
                Adicionar veículo: 
               <Link to={'./incluir-veic'}> <button className="adc"></button></Link>
            </div>
          <div className="table-responsive">
          <table className="table  table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Empresa</th>
                            <th>Ano</th>
                            <th>Cilindrada</th>
                            <th>Cor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow() }
                    </tbody>
                </table> 
            </div>
          <Link to='./incluir-veic' className="nav-link">incluir</Link>
          
        </div>
     
    );
  }
}

export default Veiculos;