const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const obterHash =  (pass, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, null, (err, hash) => callback(hash))
    })
  }

  const save = (req, res) => {
    obterHash(req.body.password, hash => {
      const password = hash
      app.database('users') // acessando a tabela users através do knex
      .insert({name: req.body.name, email: req.body.email, password})
      .then(_ => res.status(204).send())
      .catch(err => status(400).send().json(err))
    })
  }

  return {save}
} 