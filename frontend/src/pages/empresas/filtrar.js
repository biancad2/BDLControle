import React, { Component } from 'react'

class filterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empresaFilter: ""
    }
  }
  
  handleChange = (e) => {
    this.setState({
      empresaFilter: e.target.value
    })
    this.props.onChange(event.target.value)
  }
  
  render() {
    return (
      <div>
        <label htmlFor="filter">Filter by Poet: </label>
        <input type="text" id="filter" 
          value={this.state.empresaFilter} 
          onChange={this.handleChange}/>
      </div>
      )
  }
}

export default filterForm