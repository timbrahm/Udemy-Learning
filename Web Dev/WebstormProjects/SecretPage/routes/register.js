var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');


router.get('/', (req, res) => {
    res.render('register');
});


router.post('/', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
       if (err) {
           console.log(err);
           res.render('register');
       }
       else {
           passport.authenticate("local")(req, res, () => {
               res.redirect('/secret');
           });
       }
    });
});

module.exports = router;