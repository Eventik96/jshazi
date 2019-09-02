var requireOption = require('../common').requireOption;


 /**
  *Terméknél a kép módosítása
  */

module.exports = function (objectrepository) {

    var customerModel = require('../../models/product');

    return function (req, res, next) {
      

        
  
      var newProduct = res.locals.thisProd;


      
      var modifyingFlag=false;

      if(req.file)
      {
        newProduct.img=req.file.path.split("\\")[2];
        modifyingFlag=true;
      }

      newProduct.save(function (err, result) {
        if (err) {
          console.log(err);
          return next(err);
        }
        if(modifyingFlag)
        {
          console.log("\x1b[96m","Product IMAGE UPDATED");
          console.log("\x1b[93m","Módosítások: "+newProduct.img);
        }
        else{
          console.log("\x1b[96m","Nem történt kép módosítás");
        }
        
        console.log("\x1b[0m");
        return res.redirect('/products');
      });
    };

};