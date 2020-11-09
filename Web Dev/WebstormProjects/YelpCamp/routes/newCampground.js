var express = require('express');
var router = express.Router();
let middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, (req, res) => {
   res.render('campgrounds/newCampground');
});


module.exports = router;