import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

class ListEmpresas extends Component {

  constructor(props) {
        super(props);
        this.state = {viagens: []};
    }
    
    componentDidMount(){
        this.loadEmpresas();
    }

    loadEmpresas = async() => {   
        const response = await api.get("/empresas");
        console.log(response);
        alert(response);
        this.setState({empresas: response.data});
      
    };

  render() {
    return (
     
                    <div>
                    {this.state.empresas.map(empresa => (
                    <option value={this.props.obj.id}> {this.props.obj.nm_empresa} </option>))}
                    </div>

    );
  }
}

export default ListEmpresas;