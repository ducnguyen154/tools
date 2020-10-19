const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const headers = req.headers
    res.json(headers)
  } catch (err) {
    res.json({
      err: 'Internal server error'
    })
  }
})
module.exports = router

