import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.desativar = this.desativar.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.state = ({
          ds_status: ''
      })
    }
    delete() {
        api.delete('/empresas/'+this.props.obj.id_empresa)
            .then(console.log('Deleted'),
           window.location.reload()
           )
            .catch(err => console.log(err))
    }
    desativar(){
      this.setState({
        ds_status: "Desativada"
      })
    }
    onChangeStatus(e) {
      this.setState({
          ds_status: e.target.value
      })
  }
  render() {
    return (
      <tr key={this.props.obj.id_empresa}>
      <td >{this.props.obj.id_empresa}</td>
      <td>{this.props.obj.nm_empresa}</td>
      <td>{this.props.obj.cd_cnpj}</td>
      <td>{this.props.obj.ds_email}</td>
      <td>{this.props.obj.nm_responsavel}</td>
      <td>{this.props.obj.nr_telefone}</td>
      <td>{this.props.obj.nr_celular}</td>
      <td>{this.props.obj.sg_estado}, {this.props.obj.nm_cidade} - {this.props.obj.ds_endereco}, {this.props.obj.num_endereco} - {this.props.obj.ds_complemento}</td>
      <td>{this.props.obj.qt_veiculos}</td>
      <td>{this.props.obj.ds_status}</td>
      <td>{this.props.obj.dt_validadecontrato}</td>
      <td><Link to={`./alterar-empresa/${this.props.obj.id_empresa}`}><button className="edit"></button></Link><button className="rem" onClick={this.delete}></button><button className="rem" onClick={this.onChangeStatus} value="Desativada" ></button></td>
  </tr>
    );
  }
}

export default TableRow;