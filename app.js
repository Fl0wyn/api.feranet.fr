var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var cors = require('cors');

var dnsRouter = require('./routes/dns');
var indexRouter = require('./routes/index');
var ipRouter = require('./routes/ip');
var whoisRouter = require('./routes/whois');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/',
  dnsRouter,
  indexRouter,
  ipRouter,
  whoisRouter,
);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  var api = false
  res.render('error', {
    api: api
  });
});

module.exports = app;
