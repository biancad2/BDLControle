import React, { Component } from 'react';


class ListEmpresas extends Component {

  constructor(props) {
        super(props);
    }
    
    
  render() {
    return (
                    
        <option value={this.props.obj.id}> {this.props.obj.nm_empresa} </option>

    );
  }
}

export default ListEmpresas;