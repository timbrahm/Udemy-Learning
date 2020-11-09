var createError       = require('http-errors'),
    express           = require('express'),
    path              = require('path'),
    cookieParser      = require('cookie-parser'),
    logger            = require('morgan');




var app = express();

// Change Global Variables for Header and Footer Here
app.locals.globalTitle = "Global Title";
app.locals.globalCSS = '/stylesheets/style.css';
app.locals.globalJS = '/javascripts/index.js';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter       = require('./routes/index'),
    profileRouter     = require('./routes/profile');



app.use('/', indexRouter);
app.use('/')



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