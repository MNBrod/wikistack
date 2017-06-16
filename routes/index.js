var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');

  router.use('/wiki', wikiRouter);
  router.use('/user', userRouter);
  console.log("index routes");

module.exports = router;
