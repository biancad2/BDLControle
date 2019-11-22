import React, { Component } from 'react';
import api from '../../services/api'
import listarEmpresas from './listEmpresas'
import Select from 'react-select';


export default class CreateViagens extends Component {
    constructor(props) {
        super(props);
        this.onChangeOrigem = this.onChangeOrigem.bind(this);
        this.onChangeCidadeOrigem = this.onChangeCidadeOrigem.bind(this);
        this.onChangeDataSaida = this.onChangeDataSaida.bind(this);
        this.onChangeDestino = this.onChangeDestino.bind(this);
        this.onChangeCidadeDestino = this.onChangeCidadeDestino.bind(this);
        this.onChangeDtChegada = this.onChangeDtChegada.bind(this);
        this.onChangeKM = this.onChangeKM.bind(this);
        this.onChangeEmpresa = this.onChangeEmpresa.bind(this);
        this.onChangeVeiculo = this.onChangeVeiculo.bind(this);
        this.onChangeMotorista = this.onChangeMotorista.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.state = {empresas: []};
        this.state = {
            id_empresa: '',
            id_motorista: '',
            id_veiculo: '',
            end_origem: '',
            cidade_origem: '',
            data_saida: '',
            end_destino: '',
            cidade_destino: '',
            data_chegada: '',
            km: ''
        }
    }
    //<label for="inputEmpresa">Selecionar empresa*</label>
      //                  <select name="idEmpresa" class="form-control" id="idEmpresa"  tabindex="" required value={this.state.id_empresa}
       //             onChange={this.onChangeEmpresa} onClick={'./listarEmpresas'}></select>
    onChangeEmpresa(e) {
        this.setState({
            id_empresa: e.target.value
        })
    }
    onChangeOrigem(e) {
        this.setState({
            end_origem: e.target.value
        })
    }
    onChangeCidadeOrigem(e) {
        this.setState({
           cidade_origem: e.target.value
        })
    }
    onChangeDataSaida(e) {
        this.setState({
            data_saida: e.target.value
        })
    }
    onChangeDestino(e) {
        this.setState({
            end_destino: e.target.value
        })
    }
    onChangeCidadeDestino(e) {
        this.setState({
            cidade_destino: e.target.value
        })
    }
    onChangeDtChegada(e) {
        this.setState({
            data_chegada: e.target.value
        })
    }
    onChangeKM(e) {
        this.setState({
            km: e.target.value
        })
    }
    onChangeVeiculo(e) {
        this.setState({
            id_veiculo: e.target.value
        })
    }
    onChangeMotorista(e) {
        this.setState({
            id_motorista: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id_empresa: this.state.id_empresa,
            id_motorista: this.state.id_motorista,
            id_veiculo: this.state.id_veiculo,
            end_origem: this.state.end_origem,
            cidade_origem: this.state.cidade_origem,
            data_saida: this.state.data_saida,
            end_destino: this.state.end_destino,
            cidade_destino: this.state.cidade_destino,
            data_chegada: this.state.data_chegada,
            km: this.state.km
        };


        api.post('/viagens', obj)
            .then(res => console.log(res.data));

        this.setState({
            id_empresa: '',
            id_motorista: '',
            id_veiculo: '',
            end_origem: '',
            cidade_origem: '',
            data_saida: '',
            end_destino: '',
            cidade_destino: '',
            data_chegada: '',
            km: ''
        })
    }
   
   
    render() {
        return (

            <main role="main" class="bg-light">
            <div class="quadrado">Quadrado</div>
            <h1> Adicionar viagem </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2>Informações </h2>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputEmpresa">Selecionar empresa*</label>
                        <input type="text" class="form-control" id="idEmpresa"  tabindex="" required value={this.state.id_empresa}
                    onChange={this.onChangeEmpresa} />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputMotorista">ID Motorista*</label>
                        <input type="text" class="form-control" id="inputMotorista" placeholder="Id do motorista" required value={this.state.id_motorista}
                            onChange={this.onChangeMotorista}/>
                    </div>
                    <div class="form-group vcol-md-2">
                        <label for="inputIdVeiculo">Id Veiculo*</label>
                        <input type="text" class="form-control" id="inputIdVeiculo" placeholder="Ex: 00.000.000-0" required value={this.state.id_veiculo}
                            onChange={this.onChangeVeiculo}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputEndOrigem">Endereço de Origem*</label>
                        <input type="text" class="form-control" id="inputEndOrigem" placeholder="Ex: Rua Aleatoria, nº 0" required value={this.state.end_origem}
                            onChange={this.onChangeOrigem}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputCidadeOrigem">Cidade Origem*</label>
                        <input type="text" class="form-control" id="inputCidadeOrigem" placeholder="Ex: Santos" required value={this.state.cidade_origem}
                            onChange={this.onChangeCidadeOrigem}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputDtSaida">Data de saída*</label>
                        <input type="text" class="form-control" id="inputDtSaida" placeholder="Ex: 04102019" required value={this.state.data_saida}
                            onChange={this.onChangeDataSaida}/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputEndDestino">Endereço de Destino*</label>
                        <input type="tel" class="form-control" id="inputEndDestino" placeholder="Ex: Rua Aleatória2, Nº 0" value={this.state.end_destino}
                            onChange={this.onChangeDestino}/>
                    </div>
                     <div class="form-group col-md-2">
                        <label for="inputCidadeDestino">Cidade de Destino*</label>
                        <input type="tel" class="form-control" id="inputCidadeDestino" placeholder="Ex: São Vicente" required value={this.state.cidade_destino}
                            onChange={this.onChangeCidadeDestino}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputDtChegada">Data de chegada*</label>
                        <input type="text" class="form-control" id="inputDtChegada" placeholder="Ex: 04102019" required value={this.state.data_chegada}
                            onChange={this.onChangeDtChegada}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputKM">Quilometragem *</label>
                        <input type="text" class="form-control" id="inputKM" placeholder="Ex: 04102019" required value={this.state.km}
                            onChange={this.onChangeKM}/>
                    </div>
                </div>
             </fieldset>
           
            <button type="submit" class="btn btn-primary" id="salvar">Salvar</button>
            <button type="submit" class="btn btn-primary" id="cancelar">Cancelar</button>
        </form>
        </main>
        )
    }
}