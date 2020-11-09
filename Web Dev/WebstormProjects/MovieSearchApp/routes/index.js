var express = require('express');
var rp = require('request-promise');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  rp('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb')
      .then(function (htmlString) {
          let data = JSON.parse(htmlString);
        res.send(data);
      })
      .catch(function (err) {
        // Crawling failed...
      });

  // res.render('index', { title: 'Express' });
});

module.exports = router;
