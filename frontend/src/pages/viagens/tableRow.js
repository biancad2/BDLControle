import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { parseISO, isAfter,  format, formatRelative, formatDistance, } from 'date-fns';
class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = ({
          dt_iniciada: this.props.obj.dt_iniciada,
          dt_finalizada: this.props.obj.dt_finalizada,
          data_saida: this.props.obj.data_saida,
          data_chegada: this.props.obj.data_chegada,
          data: new Date(),
      
      })
      this.onChangeInicializar = this.onChangeInicializar.bind(this);
      this.onChangeFinalizar = this.onChangeFinalizar.bind(this);
      
      //this.teste=this.teste.bind(this);
    }
    componentDidMount(){
      if(this.state.dt_iniciada != null){
        var e = new Date(this.state.dt_iniciada);
        this.state.formattedDate = format(e, "dd/MM/yyyy 'as' HH:mm");
        
      }
      if(this.state.dt_finalizada != null){
        var d = new Date(this.state.dt_finalizada);
        this.state.formattedDate2 = format(d, "dd/MM/yyyy 'as' HH:mm");
      }else{
        //if(this.state.dt_finalizada == null){document.getElementById("iniciar").disabled=true;}
        
      }

    

    var saida = new Date(this.state.data_saida);
    var chegada = new Date(this.state.data_chegada);


    

    this.state.formattedDate3 = format(saida, "dd/MM/yyyy 'as' HH:mm");
    this.state.formattedDate4 = format(chegada, "dd/MM/yyyy 'as' HH:mm");
    this.setState({
      formattedDate: this.state.formattedDate,
        formattedDate2: this.state.formattedDate2,
        formattedDate3: this.state.formattedDate3,
        formattedDate4: this.state.formattedDate4
      })
      api.get('/veiculos/'+this.props.obj.id_veiculo)
      .then(response => {
        this.setState({
          ds_status: response.data[0].ds_status,
          ds_placa: response.data[0].ds_placa });
      })
      .catch(function (error) {
        console.log(error);
      })
      api.get('/motoristas/'+this.props.obj.id_motorista)
      .then(response => {
        this.setState({
         
          nm_motorista: response.data[0].nm_motorista });
      })
      .catch(function (error) {
        console.log(error);
      })
      api.get('/empresas/'+this.props.obj.id_empresa)
      .then(response => {
        this.setState({
         
          nm_empresa: response.data[0].nm_empresa });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    onChangeInicializar(e) {
      e.target.disabled = true;
      document.getElementById("encerrar-viagem").disabled=false;
        this.state.dt_iniciada= this.state.data
        
        const obj = {
          
          dt_iniciada: this.state.dt_iniciada.toISOString().split('T')[0] + ' '  
          +  this.state.dt_iniciada.toTimeString().split(' ')[0]
        };
        this.state.ds_status = "Em viagem"
        this.setState({ds_status: this.state.ds_status})
        console.log(this.state.ds_status)
        const obj2={
          ds_status: this.state.ds_status
        }
        api.put('/viagens/' + this.props.obj.id_viagem, obj)
            .then(res => console.log(res.data));
           
        api.put('/veiculos/' + this.props.obj.id_veiculo, obj2)
            .then(res => console.log(res.data)); 
      window.location.reload()
    }
   
    onChangeFinalizar(e) {
      
        this.state.dt_finalizada= this.state.data
        const obj = {
          dt_finalizada: this.state.dt_finalizada.toISOString().slice(0, 19).replace('T', ' ')
        };

        this.state.ds_status = "Disponível"

        this.setState({ds_status: this.state.ds_status})

        console.log(this.state.ds_status)

        const obj2={
          ds_status: this.state.ds_status
        }
        api.put('/viagens/' + this.props.obj.id_viagem, obj)
            .then(res => console.log(res.data));
            window.location.reload()
        api.put('/veiculos/' + this.props.obj.id_veiculo, obj2)
            .then(res => console.log(res.data));  
    }

    /*teste(){
      
        var data = this.props.obj.dt_iniciada,
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
            console.log(diaF, mesF, anoF)
        return diaF+"/"+mesF+"/"+anoF;
  
    }*/
    delete() {
        api.delete('/viagens/'+this.props.obj.id_viagem)
            .then(console.log('Deleted'),
           window.location.reload()
           )
            .catch(err => console.log(err))
    }
     
 
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_viagem}
          </td>
          <td>
            {this.state.nm_empresa}
          </td>
          <td>
            {this.state.ds_placa}
          </td>
          <td>
            {this.state.nm_motorista}
          </td>
          <td>
            {this.props.obj.end_origem}
          </td>
          <td>
            {this.state.formattedDate3}
          </td>
          <td>
            {this.props.obj.end_destino}
          </td>
          <td>
            {this.state.formattedDate4}
          </td>
          <td onChange={this.onChangeIniciado}>
            {this.state.formattedDate}
          </td>
          <td>
            {this.state.formattedDate2}
          </td>
          <td className="iniciar">
            <button className="btn btn-success" id="iniciar" onClick={this.onChangeInicializar}> <i class="fas fa-play"></i> </button>
          </td>
          <td className="encerrar">
            <button className="btn btn-danger " id="encerrar-viagem"  onClick={this.onChangeFinalizar} ><i class="fas fa-stop"></i></button>
          </td>
          <td>
            <Link to={"/atualizar-viagem/"+this.props.obj.id_viagem} className="btn btn-primary edit"> <span class="sr-only">editar </span></Link>
            <button onClick={this.delete} className="btn btn-danger rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;