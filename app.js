var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
const compression = require('compression');

require('dotenv').config()

var routes = require("./routes/index");
var handler = require("./routes/handler");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public','assets','img', 'favicon.png')));
app.use(compression());

//Express-Session n
app.use(require("express-session")({
  secret: "Secrets shall not be disclosed",
  resave: false,
  saveUninitialized: false
}));
app.use('/', handler);
app.use('/', routes);

// //catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;