var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

const fs=require('fs');
const multer = require('multer');

var getProductsListMW = require('../middleware/products/getProductsList');
var getTransactionsListMW = require('../middleware/transactions/gettransactionsList');
var getCustomersListMW = require('../middleware/customers/getCustomersList');
var updateProductMW = require('../middleware/products/updateProduct');
var updateImageMW = require('../middleware/products/updateImage');
var newProductMW = require('../middleware/products/newProduct');
var getProductMW = require('../middleware/products/getProduct');
var deleteProductMW = require('../middleware/products/deleteProduct');
var transactionsModel = require('../models/transaction');
var customersModel = require('../models/customer');
var productsModel = require('../models/product');

module.exports = function (app) {

    var objectRepository = {
        transactions: transactionsModel,
        customers:customersModel,
        products:productsModel
    };
    
    //Kép feltöltés helye
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/img')
        },
        filename: function (req, file, cb) {
          cb(null, "image_"+Date.now()+".jpg")
        }
      });
       
      var upload = multer({ storage: storage });
  

    //Új termék felvétele
    //-kép feltöltése
    //többi adat átadása és mentése adatbázisba
    // back to /products
    app.post('/products/new', 
        upload.single('image'), 
        newProductMW(objectRepository),
        function (req, res, next) {
          return res.redirect('/products');
    });
         
  

   //törlés
    app.use('/products/:productid/del',
    authMW(objectRepository),
    getProductMW(objectRepository),
    deleteProductMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/products');
    }
);

/**
* Edit the product details
  * */
app.use('/products/:productid/edit',
        authMW(objectRepository),
        getProductMW(objectRepository),     
        updateProductMW(objectRepository),
        renderMW(objectRepository, 'editproduct'),
        function (req, res, next) {
          console.log('edit redirect\n');
          return res.redirect('/products');
        }
    );

    //Kép módosítása
    app.use('/products/:productid/image',
        upload.single('image'), 
        authMW(objectRepository),
        getProductMW(objectRepository),     
        updateImageMW(objectRepository),
        renderMW(objectRepository, 'editproduct'),
        function (req, res, next) {
          console.log('edit redirect\n');
          return res.redirect('/products');
        }
    );

    app.use('/products',
        authMW(objectRepository),
        getTransactionsListMW(objectRepository),
        getCustomersListMW(objectRepository),
        getProductsListMW(objectRepository),
        renderMW(objectRepository, 'products')
    );

};