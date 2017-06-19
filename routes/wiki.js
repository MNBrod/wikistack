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
        content: req.body.content,
        tags: req.body.tags.split(" ")
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

router.get('/search', function (req, res, next){
  Page.findAll({
    where: {
      tags: {
            $overlap: req.query.tags.split(' ')
        }
    }
  })
  .then(function (pages) {
    console.log(pages);
    res.render('index', {pages: pages});
  })
})

router.get('/:urlTitle', function (req, res, next) {
  // res.send(req.params.urlTitle);
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      { model: User, as: 'author' }
    ]
  })
    .then(function (foundPage) {
      if (foundPage === null) {
        res.status(404).send();
      } else {
        console.log(foundPage);
        res.render('wikipage', {
          // titles: foundPage.title,
          // author: foundPage.name,
          // content: foundPage.content,
          // url: foundPage.urlTitle
          page: foundPage
          //tags: foundPage.tags.join(" ")
        });
      }
    })
    .catch(next);
});

module.exports = router;
