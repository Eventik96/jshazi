var requireOption = require('../common').requireOption;

/**
 * Töröl egy terméket
 */

module.exports = function (objectrepository) {

    var productModel = require('../../models/transaction');

    return function (req, res, next) {
        if (typeof res.locals.thisProd === 'undefined') {
            return next();
          }
      
          res.locals.thisProd.remove(function (err) {
            if (err) {
              return next(err);
            }
            console.log("\x1b[91m","Méz törölve");
            //redirect to all products
            res.redirect('/products');
          });
        };

};