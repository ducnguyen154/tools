const express = require('express')
const helmet = require('helmet')
const nocache = require('nocache')
const app = express()

app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
app.use(nocache())

app.use(express.json())

// app.use(require('./middleware'))
app.use(require('./route'))

app.use((err, req, res, next) => {
  const code = err.status
  const message = err.message
  const response = {
    status: {
      code,
      message
    }
  }
  res.status(code)
  res.json(response)
})
module.exports = app
