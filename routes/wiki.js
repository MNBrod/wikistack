var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function (req, res, next) {
  //res.redirect('/');
  Page.findAll({})
    .then(function (pages) {
      res.render('index', {
        pages: pages
      });
    })
});

router.post('/', function (req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
});


router.get('/add', function (req, res, next) {
  res.render('addpage')
  //res.send('got to GET /wiki/add');
});

router.get('/:urlTitle', function (req, res, next) {
  // res.send(req.params.urlTitle);
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function (foundPage) {
      //res.json(foundPage);
      res.render('wikipage', {
        titles: foundPage.title,
        author: foundPage.name,
        content: foundPage.content,
        url: foundPage.urlTitle
      });
    })
    .catch(next);
});

module.exports = router;
