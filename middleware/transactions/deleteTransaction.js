var requireOption = require('../common').requireOption;

/**
 * Töröl egy vásárlást
 */

module.exports = function (objectrepository) {

    var transactionModel = require('../../models/transaction');

    return function (req, res, next) {
        if (typeof res.locals.thisTrans === 'undefined') {
            return next();
          }
      
          res.locals.thisTrans.remove(function (err) {
            if (err) {
              return next(err);
            }
            console.log("\x1b[91m","tranzakció törölve");
            //redirect to all tranzactions
            res.redirect('/home');
          });
        };

        
    

};