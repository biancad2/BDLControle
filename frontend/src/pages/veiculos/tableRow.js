import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './veiculos.css';
import Logo from '../../assets/logobranco2.png';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.imagem = this.imagem.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.state = ({
          ds_status: this.props.obj.ds_status
      })
    }
    delete() {
        api.delete('/veiculos/'+this.props.obj.id)
            .then(console.log('Deleted'),
            window.location.reload())
            .catch(err => console.log(err))
    }
    componentDidMount(){
      this.imagem()
    }
    onChangeStatus(e) {
      if(this.state.ds_status === "Desativado"){
        this.setState({ds_status: "Disponível"})
        this.state.ds_status= "Disponível"
      
      }else{
        if(this.state.ds_status === ''){
          this.setState({ds_status: "Disponível"})
          this.state.ds_status= "Disponível"
        
        }else{
          if(this.state.ds_status==="Em viagem"){
            alert("Impossível desativar, veículo em viagem")
          }else{
            if(this.state.ds_status === "Disponível"){
              this.setState ({ds_status: "Desativado"})
            this.state.ds_status= "Desativado"
            }else{
              this.setState ({ds_status: "Disponível"})
            this.state.ds_status= "Disponível"
            }
          }
        }
        
      }
     
        const obj = {
          
          ds_status: this.state.ds_status
        };

        api.put('/veiculos/' + this.props.obj.id_veiculo, obj)
            .then(res => console.log(res.data));
            window.location.reload()
        
    }
    imagem(){
      if(this.props.obj.ds_status == "Disponível"){
        return <img src={Logo}></img>
     }
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
            {this.props.obj.ds_status}
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