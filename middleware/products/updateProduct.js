var requireOption = require('../common').requireOption;


 /**
  * Létrehoz egy vásárló objektumot vagy frissíti azt ha már létezik
  * Ha minden oké, átirányít a /customers/:customerid-ra
  */

module.exports = function (objectrepository) {

    var customerModel = require('../../models/product');

    return function (req, res, next) {
      
      if ((typeof req.body.name === 'undefined'))
         {
           console.log("\x1b[91m","name undefined at modified product");
           console.log("\x1b[0m");
            return next();
        }
        
  
      var newProduct = res.locals.thisProd;
      
      newProduct.name = req.body.name;
      newProduct.mass = req.body.mass;
      newProduct.price = req.body.price;
      newProduct.time = req.body.time;


      if(req.file)
      {
        newProduct.img=req.file.path.split("\\")[2];
      }

      newProduct.save(function (err, result) {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("\x1b[96m","Product modified");
        console.log("\x1b[93m","Módosítások: "+newProduct);
        console.log("\x1b[0m");
        return res.redirect('/products');
      });
    };

};