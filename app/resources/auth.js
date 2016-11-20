var express = require('express');
var passport = require('passport');
var router = express.Router();
var users = require('./../../data/users.json');

module.exports = router;

router.get('/login', function (req, res) {
   if(req.app.get('env') === 'development'){
      var user = users[0];
      req.logIn(user, function (error) {
         if (error){return next(error)}
         return res.redirect('/')
      });
      return;
   }
   res.render('login')
});

router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
   req.logout();
   res.redirect('/login');
});