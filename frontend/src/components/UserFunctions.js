import api from '../services/api';

export const register = newUser => {
  return api
    .post('user/register', {
      nm_usuario: newUser.nm_usuario,
      nm_sobrenome: newUser.nm_sobrenome,
      cd_cpf: newUser.cd_cpf,
      cd_rg: newUser.cd_rg,
      nr_telefone: newUser.nr_telefone,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered');
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
}

export const login = user => {
  return api
    .post('user/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}