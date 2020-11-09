var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var girlfriendRouter = require('./routes/girlfriend');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/girlfriend', girlfriendRouter)

let teas = [
    "Taiwanese Water Fairy",
    "Da Hong Pao",
    "Dong Ding",
    "High Mountain Oolong",
    "Lavender Green"
];

app.get('/tealist', (req, res, next) => {
  res.render('tealist', {list: teas});
});

app.post('/addtea', (req, res) => {
  var item = req.body.item;
  teas.push(item);
  res.redirect('/tealist');
});

app.get('/girlfriend/:thing', function(req, res, next) {
  var thing = req.params.thing;
  console.log(thing);
  res.render('girlfriend', {name: thing});
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
