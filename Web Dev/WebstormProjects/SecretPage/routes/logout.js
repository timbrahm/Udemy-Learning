var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');

router.get('/', (req, res) => {
   req.logout();
   res.redirect('/');
});

module.exports = router;