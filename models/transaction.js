
var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Transaction;


try{
Transaction = db.model('Transaction', {
    _customerID: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    productsIDList: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    date:Schema.Types.Date,
    discount: {
        type: Number,
        default: 0
      },
    place: Boolean
});
}
catch(e)
{
  Transaction=db.model('Transaction');
}

module.exports = Transaction;