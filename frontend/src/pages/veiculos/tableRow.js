import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './veiculos.css';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        api.delete('/veiculos/'+this.props.obj.id)
            .then(console.log('Deleted'),
            window.location.reload())
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_veiculo}
          </td>
          <td>
            {this.props.obj.ds_placa}
          </td>
          <td>
            {this.props.obj.id_empresa}
          </td>
          <td>
            {this.props.obj.qt_ano}
          </td>
          <td>
            {this.props.obj.qt_cilindrada}
          </td>
          <td>
            {this.props.obj.ds_cor}
          </td>

          <td className="icones">
            <Link to={"./atualizar-veic/"+this.props.obj.id_veiculo} > <button className=" editar"></button></Link>
            <Link to={`./info-veic/${this.props.obj.id_veiculo}`}><button className="info"></button></Link>
            <button onClick={this.delete} className=" rem"><span class="sr-only">remover </span></button>
            <button className="desativar" onClick={this.onChangeStatus} ></button>
      </td>
      
        </tr>
    );
  }
}

export default TableRow;