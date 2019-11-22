import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Main from './pages/main';
import Empresas from './pages/empresas/index';
import Create from './pages/empresas/incluir';
import Edit from './pages/empresas/alterar';
import Veiculos from './pages/veiculos';
import EditVeiculos from './pages/veiculos/alterar';
import CreateVeiculo from './pages/veiculos/incluir';
import Motoristas from './pages/motoristas';
import EditMotorista from './pages/motoristas/alterar';
import CreateMotorista from './pages/motoristas/incluir';
import Viagens from './pages/viagens';
import EditViagem from './pages/viagens/alterar';
import CreateViagem from './pages/viagens/incluir';
import { isAuthenticated } from "./services/auth";



export default function Routes() {
    return (
        <BrowserRouter>

           <Route path="/" component={Header} />
           <Route path="/" exact component={Main}/>
           <Route path="/empresas"  component={Empresas}/>
           <Route path="/incluir-empresa"  component={Create}/>
           <Route path="/alterar-empresa/:id"  component={Edit}/>
           <Route path="/veiculos"  component={Veiculos}/>
           <Route path="/atualizar-veic/:id" component={EditVeiculos}/>
           <Route path="/incluir-veic/" component={CreateVeiculo}/>
           <Route path="/motoristas"  component={Motoristas}/>
           <Route path="/atualizar-moto/:id" component={EditMotorista}/>
           <Route path="/incluir-moto/" component={CreateMotorista}/>
           <Route path="/viagens"  component={Viagens}/>
           <Route path="/atualizar-viagem/:id" component={EditViagem}/>
           <Route path="/incluir-viagem/" component={CreateViagem}/>
        </BrowserRouter>
    );
}