var express = require('express');
var router = express.Router();

   router.get('/', function (req, res, next) {
    res.send('got to GET /user/');
    //res.redirect("/wiki");
    console.log("HERE");
  });

   module.exports = router;

