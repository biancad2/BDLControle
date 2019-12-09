import React, { Component } from 'react'
import { register } from './UserFunctions'
import { Link } from 'react-router-dom';
import api from '../services/api';
import { cpfMask } from '../js/mascaras/cpfmask';

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
    this.pesquisar = this.pesquisar.bind(this)
    this.onChangeCPF = this.onChangeCPF.bind(this)

  }
  pesquisar(){
 
    api.get('/funcionarios/'+this.state.cd_cpf).then(response => {
      this.setState({

        nm_funcionario: response.data[0].nm_funcionario,
        nm_sobrenome: response.data[0].nm_sobrenome,
        email: response.data[0].email,
        cd_cpf: response.data[0].cd_cpf,
        cd_rg: response.data[0].cd_rg,
        nr_telefone: response.data[0].nr_telefone
    });
    console.log(response);
    
  },
  document.querySelector(".fa-search").classList.add("escondido"),
    document.querySelector(".fa-check").classList.remove("escondido")
  )
  .catch(function (error) {
    console.log(error);
    alert("Usuário não encontrado")
  })
    
  }

  onChangeCPF(e){
    this.setState({
      cd_cpf: cpfMask(e.target.value)
    })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      nm_usuario: this.state.nm_funcionario,
      nm_sobrenome: this.state.nm_sobrenome,
      cd_cpf: this.state.cd_cpf,
      cd_rg: this.state.cd_rg,
      nr_telefone: this.state.nr_telefone,
      email: this.state.email
    }

    register(newUser).then(res => {
      console.log(res)
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
  .fas{
    color:  #55ACFE
}
.box_icone_busca2{
  width: 25px;
  height: 25px;
  position: relative;
  top: -1.9rem;
  right: -44% ;
  cursor: pointer;
}
.fas:hover{
  color:  #0B467E
}
.escondido{
  display:none;
}

.fa-check{
  color:#1FC506;
  cursor: not-allowed
}
`}}></style>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit} className="registro">
              <h1 className="h3 mb-3 font-weight-normal">Registrar</h1>
              <div className="form-group">
               
              <div className="form-group">
              <label htmlFor="cpf">CPF</label>
                <input
                  type="cpf"
                  className="form-control entrada"
                  name="cd_cpf"
                  placeholder="Digite seu cpf"
                  value={this.state.cd_cpf}
                  onChange={this.onChangeCPF}
                  required
                />
                <span className="box_icone_busca2">
                <i class="fas fa-search" onClick={this.pesquisar}></i>
                <i class="fas fa-check escondido"></i>
                </span> 
               


              </div>
          
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