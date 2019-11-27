const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nm_usuario: {
      type: Sequelize.STRING
    },
    nm_sobrenome: {
      type: Sequelize.STRING
    },
    cd_cpf: {
      type: Sequelize.STRING
    },
    cd_rg: {
      type: Sequelize.STRING
    },
    nr_telefone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)