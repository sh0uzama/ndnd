var http = require('http');
var marko = require('marko');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require("passport");

var components = require('./components');
var db = require("./modules/database");

var app = express();
var server = http.createServer(app);

// INITIALIZE DATABASE
db.initialize(app);

// EXPRESS APP CONFIGURATION
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());

var requireAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
};

app.use('/client', express.static(__dirname + '/client'));

var loginTemplate = marko.load(require.resolve('./login/login.marko'));
app.get('/login', function(req, res) {
  loginTemplate.render(components, res);
});

var indexTemplate = marko.load(require.resolve('./index.marko'));
app.get('/', requireAuthentication, function(req, res) {
  indexTemplate.render(components, res);
});

// API ENDPOINTS CONFIGURATION
app.all('/api/*', requireAuthentication);
app.use('/api/powers', require('./api/powers'));
app.use('/api/perks', require('./api/perks'));
app.use('/api/effects', require('./api/effects'));
app.use('/api/equipments', require('./api/equipments'));
app.use('/api/profile', require('./api/profile'));
app.use('/api/heroes', require('./api/heroes'));
app.use('/api/sheets', require('./api/sheets'));

// AUTH ENDPOINTS CONFIGURATION
app.use('/auth', require('./modules/auth'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
