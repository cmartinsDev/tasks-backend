const config = require('../knexfile')
const knex = require('knex')(config)

// Rodar a migration então vamos criar as tabelas se não foi criada.
knex.migrate.latest([config])
module.exports = knex