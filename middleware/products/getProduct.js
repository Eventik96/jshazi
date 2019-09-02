var requireOption = require('../common').requireOption;

/**
 * Megkap egy mézet a productid alapján
 *  - ha nincs ilyen, átirányít a /products -re
 *  - Ha van akkor berakja a  res.locals.thisProd-ba
 */

module.exports = function (objectrepository) {

    var productModel = require('../../models/product');

    return function (req, res, next) {

        console.log(req.param('productid'));
        productModel.findOne({
          _id: req.param('productid')
        }).exec(function (err, result) {
          if ((err) || (!result)) {
            return res.redirect('/products');
          }
    
          res.locals.thisProd = result;
          console.log("THISPROD: \n"+res.locals.thisProd);
          return next();
        });
      };

};