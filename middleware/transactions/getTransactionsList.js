

/**
 * Load all the transactions
 * and put them on res.locals.transactions
 */
module.exports = function (objectrepository) {

  var transactionModel = objectrepository.transactions;

  return function (req, res, next) {

    //lets find the transaction
    transactionModel.find({}, function (err, results) {
      if (err) {
        return next(err);
      }

      res.locals.transactions = results;

      return next();
    });

  };

};