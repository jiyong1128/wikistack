const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

router.get('/', (req, res, next) => {
    User.findAll({})
    .then(users => res.render('user', { users }))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    User.findById(id)
    // .then(user => )
})

module.exports = router