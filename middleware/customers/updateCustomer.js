var requireOption = require('../common').requireOption;

 /**
  * Létrehoz egy vásárló objektumot vagy frissíti azt ha már létezik
  * Ha minden oké, átirányít a /customers/:customerid-ra
  */

module.exports = function (objectrepository) {

    var customerModel = require('../../models/customer');

    return function (req, res, next) {
      if ((typeof req.body.nameEditor === 'undefined'))
         {
           console.log("\x1b[91m","name undefined at modified customer");
           console.log("\x1b[0m");
            return next();
        }
        
  
      var newCustomer = res.locals.thisCustomer;
      
      newCustomer.name = req.body.nameEditor;
      newCustomer.contact = req.body.contactEditor;
      newCustomer.address = req.body.billAddressEditor;

      newCustomer.save(function (err, result) {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("\x1b[96m","Customer modified");
        console.log("\x1b[93m","Módosítások: "+newCustomer);
        console.log("\x1b[0m");
        return res.redirect('/customers');
      });
    };

};