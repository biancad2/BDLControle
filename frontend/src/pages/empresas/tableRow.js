import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './empresas.css';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        //this.verificar = this.verificar.bind(this);
        this.state = ({
          ds_status: this.props.obj.ds_status
      })
    }
    delete() {
        api.delete('/empresas/'+this.props.obj.id_empresa)
            .then(console.log('Deleted'),
            window.location.reload()
           
           )
            .catch(err => console.log(err))
    }
  componentDidMount(){
    //{this.verificar}
  //}
  //verificar(){
    //if(this.state.ds_status == "Desativada"){
      //document.querySelectorAll("tr").classList.add("desativada")
    //}
  }
    onChangeStatus(e) {
      if(this.state.ds_status === "Encerrada"){
        this.setState({ds_status: "Ativa"})
        this.state.ds_status= "Ativa"
      
      }else{
        if(this.state.ds_status === ''){
          this.setState({ds_status: "Ativa"})
          this.state.ds_status= "Ativa"
        
        }else{
          this.setState ({ds_status: "Encerrada"})
          this.state.ds_status= "Encerrada"
          
        }
        
      }
     
        const obj = {
          
          ds_status: this.state.ds_status
        };

        api.put('/empresas/' + this.props.obj.id_empresa, obj)
            .then(res => console.log(res.data));
            window.location.reload()
        
    }


  render() {
    return (
    
      <tr key={this.props.obj.id_empresa}>
      <td className="id">{this.props.obj.id_empresa}</td>
      <td>{this.props.obj.nm_empresa}</td>
      <td>{this.props.obj.cd_cnpj}</td>
      <td>{this.props.obj.ds_email}</td>
      <td>{this.props.obj.nm_responsavel}</td>
      <td className="telefone">{this.props.obj.nr_telefone}</td>
      <td>{this.props.obj.nr_celular}</td>
      <td>{this.props.obj.sg_estado}, {this.props.obj.nm_cidade} - {this.props.obj.ds_endereco}, {this.props.obj.num_endereco}  {this.props.obj.ds_complemento}</td>
      <td>{this.props.obj.ds_status}</td>
      <td className="validade">{this.props.obj.dt_validadecontrato}</td>
      <td className="icones">
        <Link to={`./alterar-empresa/${this.props.obj.id_empresa}`}><button className="editar"></button></Link>
        <Link to={`./info-empresa/${this.props.obj.id_empresa}`}><button className="info"></button></Link>
        <button className="rem" onClick={this.delete}></button>
        <button className="desativar" onClick={this.onChangeStatus} ></button>
      </td>
  </tr>
    );
  }
}

export default TableRow;