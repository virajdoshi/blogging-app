var createError = require('http-errors');
var express = require('express');
var methodOverride = require("method-override")

var usersRouter = require('./routes/user');
var profileRouter = require('./routes/profile');
var articleRouter = require('./routes/article');
const con = require("./config/db.js")

var app = express();

//connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})

// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//routes
app.use('/user', usersRouter);
app.use('/profile', profileRouter);
app.use('/article', articleRouter);

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

var server = app.listen( process.env.PORT || 3001, function(){
  console.log('Listening on port ' + server.address().port);
});