var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getProductsListMW = require('../middleware/products/getProductsList');
var gettransactionsListMW = require('../middleware/transactions/gettransactionsList');
var getCustomersListMW = require('../middleware/customers/getCustomersList');
var updateCustomerMW = require('../middleware/customers/updateCustomer');
var newCustomerMW = require('../middleware/customers/newCustomer');
var getCustomerMW = require('../middleware/customers/getCustomer');
var deleteCustomerMW = require('../middleware/customers/deleteCustomer');
var transactionsModel = require('../models/transaction');
var customersModel = require('../models/customer');
var productsModel = require('../models/product');

module.exports = function (app) {

    var objectRepository = {
        transactions: transactionsModel,
        customers:customersModel,
        products:productsModel
    };

    
    // Vevő törlése
    app.use('/customers/:customerid/delete',
    authMW(objectRepository),
    getCustomerMW(objectRepository),
    deleteCustomerMW(objectRepository),
    function (req, res, next) {
        return res.redirect('/customers');
    }
    );

    //Vevő szerkesztése
    app.use('/customers/:customerid/edit',
    authMW(objectRepository),
    gettransactionsListMW(objectRepository),
    getCustomersListMW(objectRepository),
    getProductsListMW(objectRepository),
    getCustomerMW(objectRepository),
    updateCustomerMW(objectRepository),
    renderMW(objectRepository, 'editcustomer'),
    function(req,res,next){
        return res.redirect("/customers");
    }
);


    //Új vásárló felvétele
    app.use('/customers/new',
        authMW(objectRepository),
        newCustomerMW(objectRepository),
        function(req,res,next){
            return res.redirect("/customers");
        }
    );

    //Vevők kilistázása
    app.use('/customers',
        authMW(objectRepository),
        gettransactionsListMW(objectRepository),
        getCustomersListMW(objectRepository),
        getProductsListMW(objectRepository),
        renderMW(objectRepository, 'customers')
    );

    
    
};