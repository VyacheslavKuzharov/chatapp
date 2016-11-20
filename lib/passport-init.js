var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var _ = require('lodash');
var users = require('./../data/users.json');

passport.use(new localStrategy(function (username, password, done) {
    var user = _.find(users, u => u.name === username);

    if(!user || user.password !== password){
        done(null, false);
        return;
    }

    done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});