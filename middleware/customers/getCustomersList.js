
/**
 * Load all customers
 * and put them on res.locals.customers
 */
module.exports = function (objectrepository) {

  var customerModel = require('../../models/customer');

  return function (req, res, next) {

    //lets find the customer
    customerModel.find({}, function (err, results) {
      if (err) {
        return next(err);
      }

      res.locals.customers = results;

      return next();
    });

  };

};