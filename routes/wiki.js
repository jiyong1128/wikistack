const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

router.get('/', (req, res, next) => {
    // res.send('for testing get route')
    res.redirect('/')
})
router.post('/', (req, res, next) => {
    const page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        // urlTitle: req.body.urlTitle
    })

    page.save()
    res.json(page)
})

router.get('/add', (req, res, next) => {
    res.render('addpage')
})


module.exports = router