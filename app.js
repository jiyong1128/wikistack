const express = require('express')
const app = express()
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const router = require('./routes')
const path = require('path')
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var server = app.listen(3000, () => console.log('listening on port 3000'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

// app.get(express.static(path.join(__dirname, 'index.html')))

app.use('/', router)
// app.use(app.router)
// router.initialize(app);
