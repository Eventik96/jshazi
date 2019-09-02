var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Product;
try
{
  Product = db.model('Product', {
    name: String,
    price: Number,
    mass: Number,
    time: Schema.Types.Date,
    img: String
  });
}

catch(e)
{
  Product=db.model('Product');
}

module.exports = Product;