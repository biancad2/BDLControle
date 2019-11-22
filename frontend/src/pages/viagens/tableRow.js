import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
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
            {this.props.obj.id_empresa}
          </td>
          <td>
            {this.props.obj.id_veiculo}
          </td>
          <td>
            {this.props.obj.id_motorista}
          </td>
          <td>
            {this.props.obj.end_origem}
          </td>
          <td>
            {this.props.obj.data_saida}
          </td>
          <td>
            {this.props.obj.end_destino}
          </td>
          <td>
            {this.props.obj.data_chegada}
          </td>
          <td>
            <Link to={"./atualizar-viagem/"+this.props.obj.id_viagem} className="btn btn-primary edit"> <span class="sr-only">editar </span></Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;