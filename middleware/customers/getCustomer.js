var requireOption = require('../common').requireOption;

/**
 * Megkap egy vásárlót a customerid alapján
 *  - ha nincs ilyen, átirányít a /customers -re
 *  - Ha van akkor berakja a  res.locals.customer-be
 */

module.exports = function (objectrepository) {

    var customerModel = require('../../models/customer');

    return function (req, res, next) {

        console.log(req.param('customerid'));
        customerModel.findOne({
          _id: req.param('customerid')
        }).exec(function (err, result) {
          if ((err) || (!result)) {
            return res.redirect('/customers');
          }
    
          res.locals.thisCustomer = result;
          console.log(res.locals.thisCustomer);
          return next();
        });
      };

};