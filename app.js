var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var about = require('./routes/about');
var gallery = require('./routes/gallery');
var groups = require('./routes/groups');
var registration = require('./routes/registration');
var logout = require('./routes/logout');

var app = express();
var securePaths = ['/gallery', '/groups'];
app.use(cookieParser('loginKey'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// redirect from a scure page to home page if cookies aren't set 
// (TODO: database check if cookie exists)
app.all('*', function(req, res, next) {
    if ((req.signedCookies.username == undefined) && 
            (securePaths.indexOf(req.path.toLowerCase()) > -1)) {
        res.redirect('/');
    }
    else {
        next();
    }
});
app.use('/about', about);
app.use('/gallery', gallery);
app.use('/groups', groups);
app.use('/registration', registration);
app.use('/logout', logout);



// send cookie info to each page
/*app.use(function(req, res, next) {
    res.send(req.signedCookies.username);
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
