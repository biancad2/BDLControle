export const cnpjMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d{1,3})(\d{1,3})(\d{1,4})(\d{1,2})/, '$1.$2.$3/$4-$5')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }