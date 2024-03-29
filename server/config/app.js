// moddules for node and express
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors'); 

//modules for authentication 
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// import "mongoose" - required for DB Access
let mongoose = require('mongoose');
// URI
let DB = require('./db');

//mongoose.connect(process.env.URI || DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true}); 

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log("Connected to MongoDB...");
});


// define routers
let index = require('../routes/index'); // top level routes
let surveys = require('../routes/surveys'); // routes for surveys

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//activations
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client'))); //equivalente a public 
app.use(express.static(path.join(__dirname, '../../node_modules'))); 

//setup express session 
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//initialize flash 
app.use(flash());

//initialize passport 
app.use(passport.initialize());
app.use(passport.session());

//create a survey model instance 
let userModel = require('../models/user');
let User = userModel.User;

// implement a User Authentication Strategy 
passport.use(User.createStrategy());

//serialize and deserialize the user info 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//initialize JWT 
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

// route redirects
app.use('/', index); 
app.use('/surveys', surveys); 


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
