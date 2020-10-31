const express = require('express')
const app = express()

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.headers)
  next()
})

module.exports = app
