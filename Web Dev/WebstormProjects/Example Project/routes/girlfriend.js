var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var thing = req.params.thing;
    console.log(thing);
    res.render('girlfriend', {name: 'Peepee'});
});

module.exports = router;
