import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
        nm_usuario: '',
        nm_sobrenome: '',
        cd_cpf: '',
        cd_rg: '',
        nr_telefone: '',
        email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      nm_usuario: decoded.nm_usuario,
      nm_sobrenome: decoded.nm_sobrenome,
      cd_cpf: decoded.cd_cpf,
      cd_rg: decoded.cd_rg,
      nr_telefone: decoded.nr_telefone,
      email: decoded.email,

    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{this.state.nm_usuario} {this.state.nm_sobrenome}</td>
              </tr>
              <tr>
                <td>CPF</td>
                <td>{this.state.cd_cpf}</td>
              </tr>
              <tr>
                <td>RG</td>
                <td>{this.state.cd_rg}</td>
              </tr>
              <tr>
                <td>Telefone</td>
                <td>{this.state.nr_telefone}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile
