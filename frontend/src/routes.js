import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Main from './pages/main';
import Empresas from './pages/empresas/index';
import Create from './pages/empresas/incluir';
import Edit from './pages/empresas/alterar';
import InfoEmpresas from './pages/empresas/informacoes';
import Veiculos from './pages/veiculos';
import EditVeiculos from './pages/veiculos/alterar';
import CreateVeiculo from './pages/veiculos/incluir';
import InfoVeiculos from './pages/veiculos/informacoes';
import Motoristas from './pages/motoristas';
import EditMotorista from './pages/motoristas/alterar';
import CreateMotorista from './pages/motoristas/incluir';
import InfoMotorista from './pages/motoristas/informacoes';
import Viagens from './pages/viagens';
import EditViagem from './pages/viagens/alterar';
import CreateViagem from './pages/viagens/incluir';
import Multas from './pages/despesas/multas';
import EditMulta from './pages/despesas/multas/alterar';
import CreateMulta from './pages/despesas/multas/incluir';
import Manutencoes from './pages/despesas/manutencoes';
import EditManutencao from './pages/despesas/manutencoes/alterar';
import CreateManutencao from './pages/despesas/manutencoes/incluir';
import Estoques from './pages/despesas/estoque';
import EditEstoque from './pages/despesas/estoque/alterar';
import CreateEstoque from './pages/despesas/estoque/incluir';
import Locacoes from './pages/locacao';
import EditLocacao from './pages/locacao/alterar';
import CreateLocacao from './pages/locacao/incluir';
import Profile from './components/Profile';
import Login from './components/Login'
import Register from './components/Register'




export default function Routes() {
    return (
        <BrowserRouter>

          
           <Route exact path="/" component={Login} />
           <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/main" exact component={Main}/>
            <Route exact path="/perfil"  component={Profile}/>
           <Route path="/empresas"  component={Empresas}/>
           <Route path="/incluir-empresa"  component={Create}/>
           <Route path="/alterar-empresa/:id"  component={Edit}/>
           <Route path="/info-empresa/:id"  component={InfoEmpresas}/>
           <Route path="/veiculos"  component={Veiculos}/>
           <Route path="/atualizar-veic/:id" component={EditVeiculos}/>
           <Route path="/incluir-veic/" component={CreateVeiculo}/>
           <Route path="/info-veic/:id"  component={InfoVeiculos}/>
           <Route path="/motoristas"  component={Motoristas}/>
           <Route path="/atualizar-moto/:id" component={EditMotorista}/>
           <Route path="/incluir-moto/" component={CreateMotorista}/>
           <Route path="/info-moto/" component={InfoMotorista}/>
           <Route path="/viagens"  component={Viagens}/>
           <Route path="/atualizar-viagem/:id" component={EditViagem}/>
           <Route path="/incluir-viagem/" component={CreateViagem}/>
           <Route path="/multas"  component={Multas}/>
           <Route path="/atualizar-multa/:id" component={EditMulta}/>
           <Route path="/incluir-multa/" component={CreateMulta}/>
           <Route path="/manutencoes"  component={Manutencoes}/>
           <Route path="/atualizar-manutencao/:id" component={EditManutencao}/>
           <Route path="/incluir-manutencao/" component={CreateManutencao}/>
           <Route path="/estoques"  component={Estoques}/>
           <Route path="/atualizar-estoque/:id" component={EditEstoque}/>
           <Route path="/incluir-estoque/" component={CreateEstoque}/>
           <Route path="/veiculos-alugados"  component={Locacoes}/>
           <Route path="/atualizar-locacao/:id" component={EditLocacao}/>
           <Route path="/incluir-locacao/" component={CreateLocacao}/>
        </BrowserRouter>
    );
}