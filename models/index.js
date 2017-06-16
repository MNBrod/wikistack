var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
    getterMethods: {
      route: function () { return '/wiki/' + this.getDataValue('urlTitle') }
    }
  });

Page.hook('beforeValidate', function (page) {
  page.urlTitle = noSpace(page.title);
})

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, { as: 'author' });


module.exports = {
  db: db,
  Page: Page,
  User: User
};

var noSpace = function (str) {
  if (str) {
    var arr = str.split(' ');
    return arr.join('_');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}
