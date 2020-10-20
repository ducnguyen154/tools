const express = require('express')

const router = express.Router()

router.use('/api/sample', require('./sample'))

module.exports = router
