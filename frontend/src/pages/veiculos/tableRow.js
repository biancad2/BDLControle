import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

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
          <td>
            <Link to={"./atualizar-veic/"+this.props.obj.id_veiculo} className="btn btn-primary edit"> <span class="sr-only">editar </span></Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;