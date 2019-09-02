

/**
 * Load all the products
 * and put them on res.locals.products
 */
module.exports = function (objectrepository) {

  var productModel = require('../../models/product');

  return function (req, res, next) {

    //lets find the product
    productModel.find({}, function (err, results) {
      if (err) {
        return next(err);
      }
      res.locals.products = results;

      return next();
    });

  };

};