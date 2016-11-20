var express = require('express');
var bodyParser =  require('body-parser');
var passport = require('passport');

require('./db/connect');
require('./lib/passport-init');


var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.set('views', './app/views');
app.set('view engine', 'jade');

app.use(require('./lib/logging'));


app.use(express.static('app/assets'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//     console.log(`request: ${req.url}`);
//     next()
// });

// Include auth module
var authRouter = require('./app/resources/auth');
app.use(authRouter);

app.use(function (req, res, next) {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        next();
        return;
    }

    res.redirect('/login');
});

// Include home module
var homeRouter = require('./app/resources/home');
app.use(homeRouter);



// Include admin module
var adminRouter = require('./app/resources/admin');
app.use('/admin', adminRouter);

// Include api module
app.use(require('./app/api/base'));


app.listen(port, function(){
    console.log("Server running at http://127.0.0.1:3000");
});