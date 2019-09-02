var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var gettransactionsListMW = require('../middleware/transactions/gettransactionsList');
var getProductsListMW = require('../middleware/products/getProductsList');
var getCustomersListMW = require('../middleware/customers/getCustomersList');
var updateTransactionMW = require('../middleware/transactions/updateTransaction');
var newTransactionMW = require('../middleware/transactions/newTransaction');

var getTransactionMW = require('../middleware/transactions/getTransaction');
var deleteTransactionMW = require('../middleware/transactions/deleteTransaction');
var transactionsModel = require('../models/transaction');
var customersModel = require('../models/customer');
var productsModel = require('../models/product');

module.exports = function (app) {

    var objectRepository = {
        transactions: transactionsModel,
        customers:customersModel,
        products:productsModel
    };

    //Vásárlás szerkesztése
    app.use('/home/:transactionid/edit',
    authMW(objectRepository),
    gettransactionsListMW(objectRepository),
    getCustomersListMW(objectRepository),
    getProductsListMW(objectRepository),
    getTransactionMW(objectRepository),
    updateTransactionMW(objectRepository),
    renderMW(objectRepository, 'thistrans'),
    function(req,res,next){
        return res.redirect("/home");
    }
    );

    //Vásárlás törlése
    //redirect to /home
    app.use('/home/:transactionid/delete',
        authMW(objectRepository),
        getTransactionMW(objectRepository),
        deleteTransactionMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/home');
        }
    );

     //új vásárlás hozzáadása
     app.use('/home/new',
     authMW(objectRepository),
     newTransactionMW(objectRepository),
     function(req,res,next){
        return res.redirect("/home");
    }
 );

    //Összes vásárlás kilistázása
    app.use('/home',
        authMW(objectRepository),
        gettransactionsListMW(objectRepository),
        getCustomersListMW(objectRepository),
        getProductsListMW(objectRepository),
        renderMW(objectRepository, 'home')
    );
    

   

    
};