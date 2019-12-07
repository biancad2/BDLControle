import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
class TableRow2 extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.pagar=this.pagar.bind(this);
        this.state = ({
            ds_status: this.props.obj.ds_status
        })
    
    }
    componentDidMount(){
      api.get('/veiculos/'+this.props.obj.id_veiculo)
      .then(response => {
        this.setState({
          ds_status: response.data[0].ds_status,
          ds_placa: response.data[0].ds_placa });
      })
      .catch(function (error) {
        console.log(error);
      })
      if(this.props.obj.id_motorista != null) {
        api.get('/motoristas/'+this.props.obj.id_motorista)
        .then(response => {
          this.setState({
           
            nm_motorista: response.data[0].nm_motorista });
        })
        .catch(function (error) {
          console.log(error);
        })
      }else{
          this.state.nm_motorista = "Não identificado"
      }
     
     
    }
   
    delete() {
        api.delete('/multas/'+this.props.obj.id_multa)
            .then(console.log('Deleted'),
           window.location.reload()
           )
            .catch(err => console.log(err))
    }
     
    pagar(){
        this.setState ({ds_status: "Pago"})
        this.state.ds_status= "Pago"
        const obj = {
          
            ds_status: this.state.ds_status
          };
  
          api.put('/multas/' + this.props.obj.id_multa, obj)
              .then(res => console.log(res.data));
              window.location.reload()
          
    }
 
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_multa}
          </td>
          <td value={this.props.obj.id_motorista}>
            {this.state.nm_motorista}
          </td>
          <td>
            {this.state.ds_placa}
          </td>
         
          <td>
            {this.props.obj.dt_infracao}
          </td>
          <td>
            {this.props.obj.ds_infracao}
          </td>
          <td>
            {this.props.obj.ds_gravidade}
          </td>
          <td>
            {this.props.obj.qt_preco}
          </td>
          <td>
            {this.props.obj.ds_status}
          </td>
          <td className="iniciar">
            <button className="btn btn-success" id="pagar" onClick={this.pagar}> <i class="fas fa-check"></i>



</button>
          </td>
          
          <td className="icones">
            <Link to={"/atualizar-multa/"+this.props.obj.id_multa} > <button className=" edit"></button><span class="sr-only">editar </span></Link>
            <button onClick={this.delete} className=" rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow2;