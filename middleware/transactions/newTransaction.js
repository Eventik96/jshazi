var requireOption = require('../common').requireOption;

 /**
  * Létrehoz egy vásárló objektumot vagy frissíti azt ha már létezik
  * Ha minden oké, átirányít a /Transactions/:Transactionid-ra
  */

module.exports = function (objectrepository) {

    var TransactionModel = require('../../models/transaction');
    var customerModel = require('../../models/customer');
    return function (req, res, next) {
        console.log("\x1b[93m","Név: " +req.body.name);
        console.log("\x1b[93m","Hely: " +req.body.place);
        console.log("\x1b[93m","Kedvezmény: " +req.body.discount);
        if ((typeof req.body.name === 'undefined'))
         {
            return next();
        }
  
      var newTransaction = undefined;
      
      newTransaction = new TransactionModel();
      
     
      newTransaction.discount = req.body.discount/100;
      newTransaction.place = req.body.place;
      newTransaction.productsIDList=req.body.termeklista;


     
      customerModel.find({name:req.body.name}, function (err, results) {
        //Ha a megadott vásárló neve már létezik az adatbázisban, az ő userid-ját rakja be a 
        //tranzakció _customerID-jába. Ha nem létezik akkor létrehoz azzal a névvel egy új Customer-t
          if(results.length>=1)
          {
          
           console.log(results);
        
            newTransaction._customerID = results[0]._id;
            newTransaction.date=new Date();
              newTransaction.save(function (err, result) {
                if (err) {
                  return next(err);
                }
                console.log("\x1b[96m","Added new Transaction");
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
                  return next(err);
                }
                console.log("\x1b[96m","Added new Transaction");
                console.log("\x1b[0m");
                return res.redirect('/home');
              });
            });
          
          }
        
      });
      
  
      
      
    };

};