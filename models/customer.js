var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Customer;
try{
  Customer = db.model('Customer', {
    name: String,
    contact: String,
    address: String
  });
}
catch(e)
{
  Customer=db.model('Customer');
}


module.exports = Customer;