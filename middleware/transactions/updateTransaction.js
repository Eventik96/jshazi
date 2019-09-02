var requireOption = require('../common').requireOption;

 /**
  * Létrehoz egy vásárlás objektumot vagy frissíti azt ha már létezik
  * Ha minden oké, átirányít a /transactions/:transactionid-ra
  */

 module.exports = function (objectrepository) {

    var customerModel = require('../../models/customer');

    return function (req, res, next) {
        
      if ((typeof req.body.name === 'undefined'))
         {
           console.log("\x1b[91m","customer undefined at modified transaction");
           console.log("\x1b[0m");
            return next();
        }
        
  
      var newTransaction = res.locals.thisTrans;
      
      newTransaction.productsIDList = req.body.termeklista;
      newTransaction.discount = req.body.discount/100;
      newTransaction.place = req.body.place;

      customerModel.find({name:req.body.name}, function (err, results) {
        if(results.length>=1)
        {
        
         
      
          newTransaction._customerID = results[0]._id;
          
            newTransaction.save(function (err, result) {
                if (err) {
                    console.log(err);
                    return next(err);
                  }
                  console.log("\x1b[96m","Transaction modified");
                  console.log("\x1b[93m","Módosítások: "+newTransaction);
                  console.log("\x1b[0m");
                  return res.redirect('/home');
                });
        }
        else
        {
          var cdb=require('mongoose');
          var newCustomer = undefined;
    
          newCustomer = new customerModel();
          
          newCustomer.name = req.body.name;
          newCustomer.contact = "";
          newCustomer.address = "";
          newTransaction._customerID=new cdb.mongo.ObjectId();
          newCustomer._id=newTransaction._customerID;
          console.log(newTransaction._customerID);
          newCustomer.save(function (err, result) {
            if (err) {
              return next(err);
            }
            console.log("\x1b[96m","Added new Customer");
            console.log("\x1b[0m");
            newTransaction.date=new Date();
            newTransaction.save(function (err, result) {
                if (err) {
                    console.log(err);
                    return next(err);
                  }
                  console.log("\x1b[96m","Transaction modified");
                  console.log("\x1b[93m","Módosítások: "+newTransaction);
                  console.log("\x1b[0m");
                  return res.redirect('/home');
            });
          });
        
        
        }
    });




        };
 }
 






    




