var createError                   = require('http-errors'),
    express                       = require('express'),
    path                          = require('path'),
    cookieParser                  = require('cookie-parser'),
    logger                        = require('morgan'),
    passport                      = require('passport'),
    LocalStrategy                 = require('passport-local'),
    User                          = require('./models/user'),
    methodOverride                = require('method-override'),
    flash                         = require('connect-flash'),
    seedDB                        = require('./seeds');


// seed the db
// seedDB();


var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.log("ERROR: ", err.message);
});


var app = express();

// Change Global Variables for Header and Footer Here
app.locals.globalTitle = "YelpCamp";
app.locals.globalCSS = '/stylesheets/style.css';
app.locals.globalJS = '/javascripts/index.js';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require("express-session")({
  secret: "Big Bois rule, Andy is a tiny boi",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser     = req.user;
  res.locals.error           = req.flash('error');
  res.locals.success         = req.flash('success');
  next();
});

//variable access 0,1,2

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var indexRouter                 = require('./routes/index'),
    campgroundsRouter           = require('./routes/campgrounds'),
    newCampgroundRouter         = require('./routes/newCampground'),
    loginRouter                 = require('./routes/login'),
    registerRouter              = require('./routes/register'),
    logoutRouter                = require('./routes/logout');


app.use('/', indexRouter);
app.use('/campgrounds/new', newCampgroundRouter);
app.use('/campgrounds', campgroundsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);




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
