import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      nm_usuario: '',
      nm_sobrenome: '',
      cd_cpf: '',
      cd_rg: '',
      nr_telefone: '',
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      nm_usuario: this.state.nm_usuario,
      nm_sobrenome: this.state.nm_sobrenome,
      cd_cpf: this.state.cd_cpf,
      cd_rg: this.state.cd_rg,
      nr_telefone: this.state.nr_telefone,
      email: this.state.email
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="nm_usuario"
                  placeholder="Enter your first name"
                  value={this.state.nm_usuario}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="nm_sobrenome"
                  placeholder="Enter your lastname name"
                  value={this.state.nm_sobrenome}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
                <input
                  type="telefone"
                  className="form-control"
                  name="nr_telefone"
                  placeholder="Enter tel"
                  value={this.state.nr_telefone}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
              <label htmlFor="cpf">CPF</label>
                <input
                  type="cpf"
                  className="form-control"
                  name="cd_cpf"
                  placeholder="Enter cpf"
                  value={this.state.cd_cpf}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
              <label htmlFor="rg">RG</label>
                <input
                  type="rg"
                  className="form-control"
                  name="cd_rg"
                  placeholder="Enter rg"
                  value={this.state.cd_rg}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register