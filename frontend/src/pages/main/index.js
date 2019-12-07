import React, { Component } from "react";
import api from "../../services/api";
import './index.css';
import './carousel.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart} from 'recharts';
import Logo from '../../assets/logobranco2.png';
import Usuario from '../../assets/usuario-branco.png';
import Notificacao from '../../assets/icone.png';
import Download from '../../assets/download.png';
import Slider1 from '../../assets/sustentavel2.png';
import Slider2 from '../../assets/slider2.jpg';
import Slider3 from '../../assets/frota-aleatora.jpg';
import Card1 from '../../assets/Veiculos/carro.png';
import Card2 from '../../assets/multa.png';
import Card3 from '../../assets/manutencoes.png';
import Card4 from '../../assets/despesas.png';



export default class Main extends Component{

    constructor() {
        super()
        this.state = {
          nm_usuario: '',
          nm_sobrenome: '',
          email: '',
          errors: {},
          nrVeiculos: [],
          motoristas: [],
          empresas: [],
          qtveiculos: []
        }
        this.carregar = this.carregar.bind(this)
      }
    componentDidMount() {
        if (localStorage.usertoken == null ){
            alert("Faça login para continuar")
        }else{
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                nm_usuario: decoded.nm_usuario,
                nm_sobrenome: decoded.nm_sobrenome,
                email: decoded.email
              })
        }
        
        api.get('/nr-veic')
        .then(response => {
          this.setState({ nrVeiculos: response.data[0].qt_veiculos });
          console.log(response)
          
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/empresas')
        .then(response => {
          this.setState({ empresas: response.data});
          console.log(response)
          
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/multa-geral')
        .then(response => {
          this.setState({ multasGeral: response.data[0].qt_multas });
          console.log(response)
          
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/manutencao-geral')
        .then(response => {
          this.setState({ manutencaoGeral: response.data[0].qt_manutencao });
          console.log(response)
          
        })
        .catch(function (error) {
          console.log(error);
        })
        api.get('/motoristas')
        .then(response => {
          this.setState({ motoristas: response.data });
          console.log(response)

        })
        .catch(function (error) {
          console.log(error);
        })

        api.get('/qtveiculos')
        .then(response => {
          this.setState({ qtveiculos: response.data});
          console.log("VEICULOS AQUI Ó")
          console.log(response)
          
        })
        .catch(function (error) {
          console.log(error);
        })
        
      }

      logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`./login`)
      }
      componentDidUpdate(){
        var valor = parseFloat(this.state.multasGeral) + parseFloat(this.state.manutencaoGeral);
       
        this.state.valor_soma= valor
        
      }
carregar(){

}
    render(){
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
                    <li className="nav-item active">
                        <Link className="nav-link" to="/main">Home <span className="sr-only">(atual)</span></Link>
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
    <main role="main" className="bg-light">
        <div className="quadrado">Quadrado</div>
        <h1> Página inicial</h1>
        <Carousel class="carousel">
            <Carousel.Item className="item-carousel">
                <img className="d-block w-100 h-100" src={Slider1} alt="First slide"/>
                <Carousel.Caption className="text-left">
                    <div className="sustentavel">
                    <h2>Veículos sustentáveis</h2>
                    <p className="capt">Os veículos sustentáveis trazem maiores facilidades para sua empresa, com um rendimento maior em aproximadamente 50% comparando com os veículos comuns e uma maior economia nos impostos aplicados.</p>
                    </div>
                    <p><Link class="btn btn-lg btn-primary botao-um" to="#" role="button">Veja aqui os benefícios</Link></p>
                </Carousel.Caption>
            </Carousel.Item>
             <Carousel.Item className="item-carousel">
                <img
                className="d-block w-100 h-100"
                src={Slider2}
                alt="Third slide"
                />

                <Carousel.Caption>
                    <div class="gastos">
                        <h2>Redução de 35% nos gastos</h2>
                            <p>Contratando nossos serviços para gerenciar sua frota, você reduz em 35% as despesas, retornando o investimento em lucro.</p>
                    </div>
                    <p><Link class="btn btn-lg btn-primary botao-dois" to="#" role="button">Ver planos</Link></p>
                </Carousel.Caption>
             </Carousel.Item>
            <Carousel.Item className="item-carousel">
            <img
            className="d-block w-100 h-100"
            src={Slider3}
            alt="Third slide"
            />

            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

        <section id="conteudo">
            <h2>Visão geral</h2>
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card card-body align-items-center">
                            <p className="card-text"><Link to="#"><img src={Card1} title="em viagem"></img>  Veículos </Link></p>
                            <p id="veiculos-viagem" className="numero">{this.state.nrVeiculos}</p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card card-body align-items-center">
                            <p className="card-text"><Link to="#"><img src={Card2}></img>  Multas </Link></p>
                            <p id="multas" className="numero">R$ {this.state.multasGeral}</p>
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="card card-body align-items-center">
                            <p className="card-text"><Link to="#" className="manutencoes"><img src={Card3}></img>Manutenções</Link></p>
                            <p id="manutencoes" className="numero">R$ {this.state.manutencaoGeral}</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card card-body align-items-center">
                            <p className="card-text"><Link to="#"><img src={Card4}></img>  Despesas </Link></p>
                            <p id="despesas" className="numero">R$ {this.state.valor_soma}</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">Veículos por empresa </h2>
  </div>
  
  <ResponsiveContainer
        width={'99%'} height={400}
      >
  <LineChart
        
        data= { this.state.qtveiculos.map(veic =>(
           {name: veic.nm_empresa, quantidade: veic.qt_veiculos}
          
     ))}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
       >
        <Line
          type='monotone'
          dataKey='quantidade'
          stroke='#8884d8'
          activeDot={{r: 8}}
          />
        <CartesianGrid strokeDasharray='3 3'/>
        <Tooltip/>
        <YAxis/>
        <XAxis dataKey='name'/>
        <Legend />
      </LineChart>
      </ResponsiveContainer>
    </main>
    <footer className="container" id="rodape">
        <p className="float-right"><Link to="#">Voltar ao topo</Link></p>
        <p>&copy; Companhia BDL &middot; <Link to="#">Privacidade</Link> &middot; <Link to="#">Termos</Link></p>
    </footer>
    <script src="../../js/popper.js"></script>
    <script src="../../js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js" type="text/javascript"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    <script src="../../js/dashboard.js"></script>
            </div>
          )
      
        return ( 
        <div>

        {localStorage.usertoken==null ? this.props.history.push(`./login`)  : userLink}
        </div>);
    }
}