import React, { Component } from "react";
import api from "../../services/api";
import './index.css';
import './carousel.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';


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



  /*  dashboard = () => {
        this.grafico();
        feather.replace()

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
    };*/
    render(){
        return ( 
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-menu" id="menuu">
                <Link class="navbar-brand" to="#">
                    <img src={Logo}></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(atual)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/empresas">Empresas</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="veiculos.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veículos</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="veiculos.html">Todos</a>
                                <a className="dropdown-item" href="veiculos-alugados.html">Alugados</a>
                            </div>
                        </li>
                      <li className="nav-item">
                            <a className="nav-link" href="motoristas.html">Motoristas</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Viagens</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown03">
                                <a className="dropdown-item" href="#">Item 1</a>
                                <a className="dropdown-item" href="#">Item 2</a>
                                <a className="dropdown-item" href="#">Item 3</a>   
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Despesas</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <a className="dropdown-item" href="multas.html">Multas</a>
                                <a className="dropdown-item" href="manutencoes.html">Manutenções</a>
                                <a className="dropdown-item" href="estoque.html">Estoque</a>   
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Relatórios</a>
                        </li>
                    </ul>
                    <ul className="usuario navbar-nav nav-link navbar-nav" id="usuario">
                        <li className="download">
                            <a href="#"><img src={Download}></img></a>
                        </li>
                        <li className="nav-item notificacao dropdown-notifications">
                            <a href="#" className="dropdown-toggle">
                                <img src={Notificacao}></img>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="dropdown-toggle usuario-nome" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                <img src={Usuario}></img>
                                Usuário
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <a className="dropdown-item" href="#">Item 1</a>
                                <a className="dropdown-item" href="#">Item 2</a>
                                <a className="dropdown-item" href="#">Item 3</a>   
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
                                <p className="card-text"><a href="#"><img src={Card1} title="em viagem"></img>  Veículos </a></p>
                                <p id="veiculos-viagem" className="numero">5500</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><a href="#"><img src={Card2}></img>  Multas </a></p>
                                <p id="multas" className="numero">R$ 10.500,00</p>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><a href="#" className="manutencoes"><img src={Card3}></img>Manutenções</a></p>
                                <p id="manutencoes" className="numero">R$ 5.500,00</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-body align-items-center">
                                <p className="card-text"><a href="#"><img src={Card4}></img>  Despesas </a></p>
                                <p id="despesas" className="numero">R$ 16.000,00</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">Gastos mensais </h2>
                <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary"> <span className="oi oi-document"></span>Exportar</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            Esse ano
          </button>
        </div>
      </div>
            <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>
        </main>
        <footer className="container" id="rodape">
            <p className="float-right"><a href="#">Voltar ao topo</a></p>
            <p>&copy; Companhia BDL &middot; <a href="#">Privacidade</a> &middot; <a href="#">Termos</a></p>
        </footer>
        <script src="../../js/popper.js"></script>
        <script src="../../js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js" type="text/javascript"></script> 
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
        <script src="../../js/dashboard.js"></script>
        </div>);
    }
}