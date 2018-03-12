const express = require('express')
const app = express()
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const router = require('./routes')
const path = require('path')

module.exports = app

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
const env = nunjucks.configure('views', {noCache: true});

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var server = app.listen(3000, () => console.log('listening on port 3000'))
app.get('/', function(req, res) {
    res.render('index.html');
});
app.use('/', router)
