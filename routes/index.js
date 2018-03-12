const express = require('express')
const router = express.Router()
const user = require('./user.js')
const wiki = require('./wiki.js')

// router.get('/', (req, res, next) => {
//     res.
// })
router.use('/wiki', wiki)
router.use('/users', user)

module.exports = router