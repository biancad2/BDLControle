import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';


class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {nm_empresa: ''};
    }
    delete() {
        api.delete('/motoristas/'+this.props.obj.id_motorista)
            .then(console.log('Deleted'),
            window.location.reload())
            .catch(err => console.log(err))
    }
    componentDidMount(){
      api.get('/empresas/'+this.props.obj.id_empresa)
      .then(response => {
        this.setState({nm_empresa: response.data[0].nm_empresa });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
 
  render() {
    return (
        <tr>
          <td>
            
            {this.props.obj.id_motorista}
          </td>
          <td>
            {this.props.obj.nm_motorista}
          </td>
          <td>
            {this.props.obj.cd_cnh}
          </td>
          <td>
            {this.props.obj.cd_cpf}
          </td>
          <td>
            {this.props.obj.nr_celular}
          </td>
          <td>
            {this.props.obj.cat_cnh}
          </td>
          <td>
            <Link to={"./atualizar-moto/"+this.props.obj.id_motorista} className="btn btn-primary edit"> <span class="sr-only">editar </span></Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;