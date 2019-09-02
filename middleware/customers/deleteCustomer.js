var requireOption = require('../common').requireOption;

/**
 * Töröl egy vásárlót
 */

module.exports = function (objectrepository) {


    return function (req, res, next) {
        if (typeof res.locals.thisCustomer === 'undefined') {
            return next();
          }
      
          res.locals.thisCustomer.remove(function (err) {
            if (err) {
              return next(err);
            }
            console.log("\x1b[0m");
            console.log("\x1b[36m","Deleted Customer");
            console.log("\x1b[0m");
            //redirect to all customers
            res.redirect('/customers');
          });
        };

};