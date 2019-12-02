import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { parseISO, isAfter,  format, formatRelative, formatDistance, } from 'date-fns';
class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    
   
    delete() {
        api.delete('/estoques/'+this.props.obj.id_produto)
            .then(console.log('Deleted'),
           window.location.reload()
           )
            .catch(err => console.log(err))
    }
     
    
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_produto}
          </td>
          <td>
            {this.props.obj.nm_produto}
          </td>
          <td>
            {this.props.obj.ds_produto}
          </td>
          <td>
            {this.props.obj.qt_produto}
          </td>
          <td className="icones">
            <Link to={"./atualizar-estoque/"+this.props.obj.id_produto} > <button className=" edit"></button><span class="sr-only">editar </span></Link>
            <button onClick={this.delete} className=" rem"><span class="sr-only">remover </span></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;