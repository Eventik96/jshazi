var requireOption = require('../common').requireOption;


const fs=require('fs');
const multer = require('multer');
 /**
  * Létrehoz egy vásárló objektumot vagy frissíti azt ha már létezik
  * Ha minden oké, átirányít a /Transactions/:Transactionid-ra
  */

module.exports = function (objectrepository) {

  
    var ProductModel = require('../../models/product');
    return function (req, res, next) {
      
    
        
        var newProduct = undefined;
        newProduct = new ProductModel();
        newProduct.name=req.body.name;
        newProduct.mass=req.body.mass;
        newProduct.price=req.body.price;
        newProduct.time=req.body.time;
        newProduct.img=req.file.path.split("\\")[2];
        newProduct.save(function (err, result) {
         if (err) {
           return next(err);
         }
         console.log("\x1b[96m","Added new Product");
         console.log("\x1b[0m");
         return res.redirect('/products');
       });
    };
    

};