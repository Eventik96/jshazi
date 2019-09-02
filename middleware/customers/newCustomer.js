var requireOption = require('../common').requireOption;

 /**
  * Létrehoz egy vásárló objektumot vagy frissíti azt ha már létezik
  * Ha minden oké, átirányít a /customers/:customerid-ra
  */

module.exports = function (objectrepository) {

    var customerModel = require('../../models/customer');

    return function (req, res, next) {
        console.log("\x1b[93m","Név: " +req.body.name);
        console.log("\x1b[93m","Telefonszám: " +req.body.contact);
        console.log("\x1b[93m","Cím: " +req.body.address);
        if ((typeof req.body.name === 'undefined'))
         {
            return next();
        }
  
      var newCustomer = undefined;
      
      newCustomer = new customerModel();
      
      newCustomer.name = req.body.name;
      newCustomer.contact = req.body.contact;
      newCustomer.address = req.body.address;
  
      newCustomer.save(function (err, result) {
        if (err) {
          return next(err);
        }
        console.log("\x1b[96m","Added new Customer");
        console.log("\x1b[0m");
        return res.redirect('/customers');
      });
    };

};