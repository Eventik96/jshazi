var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require('../middleware/generic/render');
var authMW = require('../middleware/generic/auth');
var logoutMW = require('../middleware/generic/logout');

var userModel = require('../models/user');




module.exports = function (app) {

    var objectRepository = {
      userModel: userModel
    };
  
    
    
    
    
    // login page 
    
    app.use('/login',
    inverseAuthMW(objectRepository),
    checkUserLoginMW(objectRepository),
    renderMW(objectRepository, 'login')
  );
  
    //Log out
    app.use('/logout',
      logoutMW(objectRepository),
      function(req, res, next){
        res.redirect('/');
      }
    );
  
    //Registration
    app.use('/register',
      inverseAuthMW(objectRepository),
      checkUserRegistrationMW(objectRepository),
      renderMW(objectRepository, 'register')
    );


  
  
  
  
  app.get('/', function(req, res) {
      return res.redirect('/home');
      
  });
  
  };
