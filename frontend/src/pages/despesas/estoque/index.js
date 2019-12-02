import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import api from '../../../services/api'
import TableRow from './tableRow';
import './manutencoes.css';


import Logo from '../../../assets/logobranco2.png';
import Usuario from '../../../assets/usuario-branco.png';
import Notificacao from '../../../assets/icone.png';
import Download from '../../../assets/download.png';

class Estoque extends Component {
    
    constructor(props) {
        super(props);
        this.state = {estoques: [], items:[]};
    }

     componentDidMount() {
        api.get('/estoques/')
        .then(response => {
          this.setState({ estoques: response.data, items: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    filterList=(event)=>{
        let items = this.state.estoques;
        
        items = items.filter((item)=>{
           
            return item.nm_produto.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1 || item.id_produto.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1 || item.id_veiculo.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1
        });
        this.setState({items: items});
        console.log(items);
    }
    tabRow(){
        return this.state.estoques.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
  render() {
    return (
        <div >
        <nav class="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <a class="navbar-brand" href="#">
                    <img src={Logo}/>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/main">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/empresas">Empresas</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/veiculos" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <a class="dropdown-item" href="/veiculos">Todos</a>
                                <a class="dropdown-item" href="veiculos-alugados.html">Alugados</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/motoristas">Motoristas</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown03">
                                <a class="dropdown-item" href="/viagens">Em andamento</a>
                                <a class="dropdown-item" href="multas-concluidas.html">Concluídas</a>
   
                            </div>
                        </li>
                        <li class="nav-item dropdown active">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                                <a class="dropdown-item" href="/multas">Multas<span class="sr-only">(atual)</span></a>
                                <a class="dropdown-item" href="/manutencoes">Manutenções</a>
                                <a class="dropdown-item" href="/estoque">Estoque</a>   
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Relatórios</a>
                        </li>
                    </ul>
                   
                    <ul class="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li class="download">
                            <a href="#"><img src={Download}/></a>
                        </li>
                        <li class="nav-item notificacao dropdown-notifications">
                            <a href="#" class="dropdown-toggle">
                                <img src={Notificacao}/>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="dropdown-toggle usuario-nome" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}/> 
                                Usuário
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <a class="dropdown-item" href="#">Item 1</a>
                                <a class="dropdown-item" href="#">Item 2</a>
                                <a class="dropdown-item" href="#">Item 3</a>   
                            </div>
                        </li>
                    </ul>
                </div>
          </nav>
          <div className="quadrado">Quadrado</div>
          <h1>Multas</h1>

                      
          <form method="get" action="" className="centro row">
                 <h2 className="filtrar">Filtrar</h2>
               
               

                 <div className="form-group col-md-3">
                    <label for="inputGravidade" className="label-pesquisa"> Tipo</label>
                       <select  className="form-control" id="idGravidade" name="inputGravidade"  tabindex="" onChange={this.filterList}>
                       <option value="">Selecionar...</option>
                  <option value="preventiva">Preventiva</option>
                  <option value="corretiva">Corretiva</option>
               </select>
                    
                    </div>
                <div className="col-md-3">
                    <label for="pesquisa" className="label-pesquisa"> Pesquisar	</label> 
                    <input type="datetime" name="pesquisa" id="pesquisarr" size="9" minlength="6" maxlength="7" placeholder="Pesquisar..." data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Você pode pesquisar pelo ID do motorista, do veículo e da multa" onChange={this.filterList}/>
                    <span id="box_icone_busca">
                        <i id="icone_busca" className="fa fa-search"></i>
                    </span> 
                </div>
            </form>
            <div className="adc-rem">
                Adicionar manutenção: 
               <Link to={'./incluir-manutencao'}> <button className="adc"></button></Link>
            </div>
          <div className="table-responsive">
          <table className="table table-md" >
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Veiculo</th>
                            <th>Quilometragem</th>
                            <th className="text-truncated">Tipo de manutenção</th>
                            <th>Descrição</th>
                            <th>Causa</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>  {
                    this.state.items.map(function(item, i){
                        return <TableRow obj={item} key={i} />;
                    })
                }
                    </tbody>
                </table> 
                </div>
          
        </div>
     
    );
  }
}

export default Estoque;