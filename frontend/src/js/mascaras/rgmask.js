export const rgMask = value => {
    return value
      .replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
      .replace(/(-\d{1})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }