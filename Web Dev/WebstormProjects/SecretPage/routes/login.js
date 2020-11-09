var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: '/login'
}), (req, res) => {

});

module.exports = router;