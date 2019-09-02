var requireOption = require('../common').requireOption;

/**
 * Load all the users
 * and put them on res.tpl.users
 */
module.exports = function (objectrepository) {

  var userModel = require('../../models/user');

  return function (req, res, next) {

    //lets find the user
    userModel.find({}, function (err, results) {
      if (err) {
        return next(err);
      }

      res.locals.users = results;

      return next();
    });

  };

};
