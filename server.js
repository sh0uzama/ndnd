var http = require('http');
var path = require('path');

var marko = require('marko');

var express = require('express');
var bodyParser = require('body-parser');

var components = require('./components');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var lessMiddleware = require('less-middleware');
app.use(lessMiddleware(path.join(__dirname, 'client')));

var indexTemplate = marko.load(require.resolve('./index.marko'));
var loginTemplate = marko.load(require.resolve('./login/login.marko'));

app.get('/login', function(req, res) {
    loginTemplate.render(components, res);
});

app.get('/', function(req, res) {
    indexTemplate.render(components, res);
});

app.use('/client', express.static(__dirname + '/client'));

// API ENDPOINTS CONFIGURATION
app.use('/api/powers', require('./api/powers'));
app.use('/api/effects', require('./api/effects'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
