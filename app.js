var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
//var makesRouter = require('./routes');
var models = require('./models')
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes');


models.db.sync({ force: false })
  .then(() => {
    app.listen(1337, function () {
      console.log('listening on port 1337!');
    })
  })
  .catch(console.error);

// templating boilerplate setup
console.log("hi");
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off


// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
//console.log(path.join(__dirname, '/public'));

/////////////////////////////////
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);
/////////////////////////////////
