var requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function (objectrepository) {

  var UserModel = require('../../models/user');

  return function (req, res, next) {
    console.log("\x1b[96m","Regisztráció adatok: \n"+req.body);
    console.log("\x1b[0m");

    //not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
      (typeof req.body.md5HashPassword === 'undefined')) {
      return next();
    }

    //lets find the user
    UserModel.findOne({
      email: req.body.email
    }, function (err, result) {

      if ((err) || (result !== null)) {
        res.locals.error.push('Your email address is already registered!');
        return next();
      }

      if (req.body.username.length < 3) {
        res.locals.error.push('The username should be at least 3 characters!');
        return next();
      }

      //create user
      var newUser = new UserModel();
      newUser.username = req.body.username;
      newUser.email = req.body.email;
      newUser.password = req.body.md5HashPassword;
      newUser.save(function (err) {
        //redirect to /login
        return res.redirect('/login');
      });
    });
  };
};
