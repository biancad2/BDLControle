import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { parseISO, isAfter,  format, formatRelative, formatDistance, } from 'date-fns';
class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state=({
            ds_placa: ''
        })
        
    }
    componentDidMount(){
      api.get('/veiculos/'+this.props.obj.id_veiculo)
      .then(response => {
        this.setState({
          
          ds_placa: response.data[0].ds_placa });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
   
    delete() {
        api.delete('/manutencoes/'+this.props.obj.id_manutencao)
            .then(console.log('Deleted'),
           window.location.reload()
           )
            .catch(err => console.log(err))
    }
     
    
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_manutencao}
          </td>
          <td value={this.props.obj.id_veiculo}>
            {this.state.ds_placa}
          </td>
          <td >
            {this.props.obj.km}
          </td>
          <td>
            {this.props.obj.tipo_manut}
          </td>
          <td>
            {this.props.obj.servico}
          </td>
          <td>
            {this.props.obj.causa}
          </td>
          <td>
            {this.props.obj.valor_manut}
          </td>
          <td>
            {this.props.obj.dt_manutencao}
          </td>
         
        
          
          <td className="icones">
            <Link to={"./atualizar-manutencao/"+this.props.obj.id_manutencao} > <button className=" edit"></button><span class="sr-only">editar </span></Link>
            <button onClick={this.delete} className=" rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;