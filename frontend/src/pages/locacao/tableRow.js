import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { parseISO, isAfter,  format, formatRelative, formatDistance, } from 'date-fns';
class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = ({
          dt_alugada: this.props.obj.dt_alugada,
          dt_devolvida: this.props.obj.dt_devolvida,
          data: new Date(),
      
      })

      this.onChangeFinalizar = this.onChangeFinalizar.bind(this);
      
      //this.teste=this.teste.bind(this);
    }
    componentDidMount(){
      
        var e = new Date(this.state.dt_alugada);
        this.state.formattedDate = format(e, "dd/MM/yyyy 'as' HH:mm");
  
      if(this.state.dt_devolvida != null){
        var d = new Date(this.state.dt_devolvida);
        this.state.formattedDate2 = format(d, "dd/MM/yyyy 'as' HH:mm");
      }else{
        //if(this.state.dt_finalizada == null){document.getElementById("iniciar").disabled=true;}
        
      }

    this.setState({
      formattedDate: this.state.formattedDate,
        formattedDate2: this.state.formattedDate2,
        formattedDate3: this.state.formattedDate3,
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
      api.get('/empresas/'+this.props.obj.id_empresa)
      .then(response => {
        this.setState({
         
          nm_empresa: response.data[0].nm_empresa });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
    onChangeFinalizar(e) {
      
        this.state.dt_devolvida= this.state.data
        var f = new Date(this.state.dt_devolvida);
        this.state.formattedDate3 = format(f, 'yyyy-MM-dd HH:mm:ss');
      this.setState({
        dt_devolvida: this.state.formattedDate3
      })
        const obj = {
          dt_devolvida: this.state.formattedDate3
        };
        alert(obj.dt_devolvida)
       
        api.put('/locacoes/' + this.props.obj.id_locacao, obj)
            .then(res => console.log(res.data));
            
       
    }

  
    delete() {
        api.delete('/locacoes/'+this.props.obj.id_locacao)
            .then(console.log('Deleted'),
           window.location.reload()
           )
            .catch(err => console.log(err))
    }
     
 
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_locacao}
          </td>
          <td>
            {this.state.nm_empresa}
          </td>
          <td>
            {this.state.ds_placa}
          </td>
          <td>
          {this.state.formattedDate}
          </td>
          <td>
          {this.state.formattedDate2}
          </td>
          <td>
          {this.props.obj.vl_locacao}
          </td>
          <td className="encerrar">
            <button className="btn btn-success " id="finalizar"  onClick={this.onChangeFinalizar} ><i class="fas fa-check"></i>

</button>
          </td>
          <td>
            <Link to={"./atualizar-locacao/"+this.props.obj.id_locacao} className="btn btn-primary edit"> <span class="sr-only">editar </span></Link>
            <button onClick={this.delete} className="btn btn-danger rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;