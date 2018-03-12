const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

router.get('/', (req, res, next) => {
    // res.send('for testing get route')
    Page.findAll({})
    .then(allPages => res.render('index', { pages: allPages }))
    // res.redirect('/')
})
router.post('/', (req, res, next) => {
    const page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        // urlTitle: req.body.urlTitle
    })

    page.save()
    .then(page => res.redirect(page.route))
})

router.get('/add', (req, res, next) => {
    res.render('addpage')
})

router.get('/:urlTitle', (req, res, next) => {
    // res.send('hit dynamic route at ' + req.params.urlTitle);
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    // .then(foundPage => res.json(foundPage))
    .then(foundPage => { 
        res.render('wikipage', { page: foundPage })
    })
    // .then(data => res.json(data))
    .catch(next);
})


module.exports = router