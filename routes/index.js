var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');
var models = require('../models');
var Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);
console.log('index routes');

router.get('/search', function (req, res, next) {
  res.render('tags');
});

module.exports = router;
