var requireOption = require('../common').requireOption;

/**
 * Megkap egy vásárlást a transactionid alapján
 *  - ha nincs ilyen, átirányít a /transactions -re
 *  - Ha van akkor berakja a  res.locals.thisTrans-ba
 */

module.exports = function (objectrepository) {

    var transactionModel = require('../../models/transaction');

    return function (req, res, next) {

        console.log(req.param('transactionid'));
        transactionModel.findOne({
          _id: req.param('transactionid')
        }).exec(function (err, result) {
          if ((err) || (!result)) {
            return res.redirect('/home');
          }
    
          res.locals.thisTrans = result;
          console.log(res.locals.thisTrans);
          return next();
        });
      };

};