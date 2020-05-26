
const express = require('express')
const app = express()
const database = require('./config/db')
const consign = require('consign') // Responsavel por carregar todos os modulos

// Neste Caso ele vai saber que quando ele for carregar o module "middleware" ele deve passar o app como parametro.
consign()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api')
.then('./config/routes.js')
.into(app)


app.database = database

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Tasks-backend is up and listening on ${PORT}`)
})