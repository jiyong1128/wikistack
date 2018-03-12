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
    User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      })
      .then(function (values) {
      
        const user = values[0];
      
        const page = Page.build({
          title: req.body.title,
          content: req.body.content
        });
      
        return page.save().then(function (page) {
          return page.setAuthor(user);
        });
      
      })
      .then(function (page) {
        res.redirect(page.route);
      })
      .catch(next);
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