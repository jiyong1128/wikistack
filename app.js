const express = require('express')
const app = express()
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const router = require('./routes')
const path = require('path')
const {Page, User, db} = require('./models')

module.exports = app;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
const env = nunjucks.configure('views', {noCache: true});

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Page.sync();
// User.sync();

// var server = app.listen(3000, () => console.log('listening on port 3000'))

// User.sync()
// .then(() => {
// 	console.log('User table created!');
// 	return Page.sync();
// })
// .then(() => {
// 	console.log('Page table created!');
// 	app.listen(3000, () => {
// 		console.log('Server is listening on port 3000!');
// 	});
// })
// .catch(console.error.bind(console));

db.sync({ force: true })
.then(() => {
    console.log('All tables created!');
    app.listen(3000, () => {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.use('/', router)
