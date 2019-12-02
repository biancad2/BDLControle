import React, { Component } from 'react'
import { register } from './UserFunctions'
import { Link } from 'react-router-dom';

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
         <style dangerouslySetInnerHTML={{__html: `
  #acessibilidade{display: none;}
  body{background-color: #060121;}
  .logo{
      width: 10rem;
  }
  
  .alinhar{
      display: flex;
        flex-direction: row;
         justify-content: center;
         align-items: center
  }
  
  .registro  h1{
      animation: none;
      width: 100%;
  }
  
  .registro{
      text-align: center;
      background-color: #060126;
      border: 1px solid #060126;
      padding: 3%
  }
  
  .registro h1, label{
      color: #55ACFE
  }
  .entrada{
      background-color: #060121;
      border: 1px solid #55ACFE;
      
  }
  
  .entrada::placeholder{
      color:  #B1D9FE
  }

  p{margin-top: 2%}
  .cadastro{
    background-color:#3626A7;
    color: #fff 
  }

  .cadastro:hover{
    background-color:#1E155C;
    color: #fff 
  }
`}}></style>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit} className="registro">
              <h1 className="h3 mb-3 font-weight-normal">Registrar</h1>
              <div className="form-group">
                <label htmlFor="name"> Nome</label>
                <input
                  type="text"
                  className="form-control entrada"
                  name="nm_usuario"
                  placeholder="Digite seu primeiro nome"
                  value={this.state.nm_usuario}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Sobrenome</label>
                <input
                  type="text"
                  className="form-control entrada"
                  name="nm_sobrenome"
                  placeholder="Digite seu sobrenome"
                  value={this.state.nm_sobrenome}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control entrada"
                  name="email"
                  placeholder="Digite seu email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
                <input
                  type="telefone"
                  className="form-control entrada"
                  name="nr_telefone"
                  placeholder="Digite seu telefone"
                  value={this.state.nr_telefone}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
              <label htmlFor="cpf">CPF</label>
                <input
                  type="cpf"
                  className="form-control entrada"
                  name="cd_cpf"
                  placeholder="Digite seu cpf"
                  value={this.state.cd_cpf}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
              <label htmlFor="rg">RG</label>
                <input
                  type="rg"
                  className="form-control entrada"
                  name="cd_rg"
                  placeholder="Digite seu rg"
                  value={this.state.cd_rg}
                  onChange={this.onChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Registrar!
              </button>
              <p>OU</p>
              <Link to="/login" className=" cadastro">
                 <button
  
                className="btn btn-md cadastro"
              >
                Entrar
              </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register