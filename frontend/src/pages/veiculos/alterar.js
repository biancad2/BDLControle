import React, { Component } from 'react';
import api from '../../services/api'

export default class EditVeiculos extends Component {
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
            ds_status: ''
        };
    }

    async componentDidMount() {
        api.get('/veiculos/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id: response.data[0].id,
                id_empresa: response.data[0].id_empresa,
                qt_ano: response.data[0].qt_ano,   
                ds_cor: response.data[0].ds_cor,
               qt_cilindrada: response.data[0].qt_cilindrada,
               ds_proprietario: response.data[0].ds_proprietario,
               qt_quilometragem: response.data[0].qt_quilometragem,
               qt_passageiros: response.data[0].qt_passageiros,
               qt_peso: response.data[0].qt_peso,
              ds_placa: response.data[0].ds_placa,
              nr_renavam: response.data[0].nr_renavam,
              ds_status: response.data[0].ds_status,
              id_frota: response.data[0].id_frota
            });
                console.log(response);
                console.log(response.data.id);
          })
          .catch(function (error) {
              console.log(error);
          })
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
       

        console.log('ID do veículo: ' + obj.id)

        api.put('/veiculos/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/listar');
    }

    render() {
        return (
            <main role="main" class="bg-light">
            <div class="quadrado">Quadrado</div>
            <h1> Adicionar veículo </h1>
            
         <form id="formulario" onSubmit={this.onSubmit}>
             <fieldset>
                 <h2>Informações empresa</h2>
                 <div class="form-row">
                     <div class="form-group  col-md-2">
                        <label for="proprietario"> Proprietário*</label>
                        <select name="proprietario" class="form-control" id="proprietario"  tabindex="1" required value={this.state.ds_proprietario}
                            onChange={this.onChangeProprietario}>
                            <option value=""> Selecione... </option>
                            <option value="empresa"> Empresa </option>
                            <option value="locacao">  Locação </option>
                        </select>
                     </div>
                     <div class="form-group col-md-2">
                        <label for="inputIDEmpresa">Empresa*</label>
                        <input type="text" class="form-control" id="inputIDEmpresa" value={this.state.id_empresa}
                            onChange={this.onChangeEmpresa}/>
                     </div>
                 </div>
             </fieldset>
             <fieldset>
                 <h2>Veículo</h2>
                 <div class="form-row">
                    <div class="form-group col-md-2">
                        <label for="categoria"> Categoria*</label>
                        <select name="categoria" id="categoria" class="form-control" value={this.state.id_frota}
                            onChange={this.onChangeIdFrota}>
                            <option value=""> Selecione </option>
                            <option value="1"> Caminhão </option>
                            <option value="2">  Caminhonete </option>
                            <option value="3"> Carro </option>
                            <option value="4"> Moto </option>
                            <option value="5"> Ônibus </option>
                            <option value="6"> Van </option>
                        </select>
                    </div>
                      <div class="form-group ano">
                        <label for="inputAno">Ano do modelo</label>
                        <input type="number" class="form-control" id="inputAno" placeholder="Ex.: 2009" value={this.state.qt_ano}
                            onChange={this.onChangeAno}/>
                     </div>
                     <div class="form-group col-md-1">
                        <label for="inputCor">Cor</label>
                        <input type="text" class="form-control" id="inputCor" placeholder="Ex.: Prata" value={this.state.ds_cor}
                            onChange={this.onChangeCor}/>
                     </div> 
                    <div class="form-group col-md-1">
                        <label for="inputCilindrada">Cilindrada</label>
                        <input type="number" class="form-control" id="inputCilindrada" placeholder="Ex.: 1.0" step="0.1" value={this.state.qt_cilindrada}
                            onChange={this.onChangeCilindrada}/>
                     </div> 
                     <div class="form-group col-md-2">
                        <label for="inputQuilometragem">Quilometragem</label>
                        <input type="text" class="form-control" id="inputQuilometragem" name="inputQuilometragem" placeholder="Ex.: 15500" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Quantos KM o veículo percorreu"
                        value={this.state.qt_quilometragem}
                        onChange={this.onChangeKM}
                        />
                     </div> 
                      <div class="form-group col-md-2">
                        <label for="inputQtPassageiros">Qt passageiros</label>
                        <input type="number" class="form-control" id="inputQtPassageiros" name="inputQtPassageiros" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Insira o limite de passageiros do veículo" placeholder="Ex.: 5"
                        value={this.state.qt_passageiros}
                        onChange={this.onChangePassageiros}
                        />
                     </div> 
                    <div class="form-group col-md-2">
                        <label for="inputQtPassageiros">Peso máximo</label>
                        <input type="number" class="form-control" id="inputQtPassageiros" name="inputQtPassageiros" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Peso que o veículo suporta" placeholder="Ex.: 45 toneladas"
                        value={this.state.qt_peso}
                        onChange={this.onChangePeso}
                        />
                     </div> 
                     <div class="form-group col-md-2">
                        <label for="inputPlaca">Placa</label>
                        <input type="text" class="form-control" id="inputPlaca" placeholder="Ex.: AAA-000" value={this.state.ds_placa}
                            onChange={this.onChangePlaca}/>
                     </div>
                     <div class="form-group col-md-2">
                        <label for="inputRenavam">Renavam</label>
                        <input type="text" class="form-control" id="inputRenavam" placeholder="Ex.: 0123456789" data-toggle="tooltip" data-trigger="hover" data-placement="bottom" title="Pode ser encontrado no canto esquerdo do CRLV"
                        value={this.state.nr_renavam}
                        onChange={this.onChangeRenavam}
                        /> 
                     </div>
                     <div class="form-group col-md-2">
                        <label for="status"> Status*</label>
                        <select name="status" id="status" class="form-control" value={this.state.ds_status}
                            onChange={this.onChangeStatus}>
                            <option value="ativado"> Disponível </option> 
                            <option value="desativado"> Indisponível </option> 
                        </select>
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