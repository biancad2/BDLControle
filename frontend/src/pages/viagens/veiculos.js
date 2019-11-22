import React, { Component } from "react";
import Veiculos from "./index";
 
class Items extends Component {
  state = {
    veiculos: []
  };
 
  async componentDidMount() {
    try {
       const response = await api.get('/veiculos');
       this.setState({ veiculos: response.data })
   }
   catch (error) {
       console.log(error)
   }
}
handleDelete = veiculoId => {
    const veiculos = this.state.veiculos.filter(veiculo => veiculo.id !== veiculoId);
    this.setState({ veiculos: veiculos });
  };
 
  render() {
    return (
      <React.Fragment>
        {this.state.items.map(item => (
          <Item 
          key={item.id} 
          value={item.value} 
          onDelete={this.handleDelete} 
          id={veiculo.id}
          />
        ))}
      </React.Fragment>
    );
  }
}
 
export default Items;