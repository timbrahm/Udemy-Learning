var createError           = require('http-errors'),
    express               = require('express'),
    path                  = require('path'),
    cookieParser          = require('cookie-parser'),
    logger                = require('morgan'),
    passport              = require('passport'),
    bodyParser            = require('body-parser');
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User                  = require('./models/user'),
    app = express();


var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/auth_demo_app");



// Change Global Variables for Header and Footer Here
app.locals.globalTitle = "Global Title";
app.locals.globalCSS = '/stylesheets/style.css';
app.locals.globalJS = '/javascripts/index.js';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('express-session')({
  secret: "Andy is a big little retard",
  resave: false,
  saveUninitialized: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


let indexRouter           = require('./routes/index'),
    secretRouter          = require('./routes/secret'),
    registerRouter        = require('./routes/register'),
    loginRouter           = require('./routes/login'),
    logoutRouter          = require('./routes/logout');



app.use('/', indexRouter);
app.use('/secret', secretRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// app.get('/secret', isLoggedIn, (req, res) => {
//   res.render('secret');
// });




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

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

module.exports = app;