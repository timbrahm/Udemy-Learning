var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require('passport');
var LocalStrategy = require("passport-local");



router.get('/', (req, res) => {
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect('/campgrounds');
});


module.exports = router;