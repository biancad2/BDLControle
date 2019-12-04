import React, { Component } from 'react'
import { login } from './UserFunctions'
import { Link } from 'react-router-dom';
import Logo from '../assets/logobranco2.png';

class Login extends Component {
  constructor() {
    super()
    this.state = {
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

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        this.props.history.push(`./main`)
      }else{
        alert("Login ou senha inválidos")
      }
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
  
  .login  h1{
      animation: none;
      width: 100%;
  }
  
  .login{
      text-align: center;
      background-color: #060121;
  }
  
  .login h1, label{
      color: #55ACFE
  }
  .entrada{
      background-color: #060121;
      border: 1px solid #55ACFE;
      padding-left: 6%
  }
  
  .entrada::placeholder{
      color:  #55ACFE
  }
  .fas{
    color:  #55ACFE
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
  .box_icone_busca2{
    width: 25px;
    height: 25px;
    position: relative;
    top: -1.9rem;
    left: -44% ;
}
`}}></style>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto alinhar">
            
            <form noValidate onSubmit={this.onSubmit} className="login">
            <img src={Logo} alt="" className="logo"/>
              <h1 className="h3 mb-3 font-weight-normal">Entrar</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control entrada"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <span className="box_icone_busca2">
                  <i class="fas fa-user"></i>
                </span> 
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control entrada"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                 <span className="box_icone_busca2">
                 <i class="fas fa-lock"></i>
                </span> 
              </div>
              
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Entrar
              </button>
              <p>OU</p>
              <Link to="/register" className="registro cadastro">
                 <button
  
                className="btn btn-md cadastro"
              >
                Cadastre-se
              </button>
              </Link>
             
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login