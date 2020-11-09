var express = require('express');
var router = express.Router();


// profile get
app.get('/', (req, res) => {
   res.render("hi");
});

module.exports = router;