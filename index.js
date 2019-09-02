console.log('\x1b[96m','Elindult a szerver');
// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//a statikus fájlok is(képek, css, bootstrap, js-ek is olvashatóak legyenek)
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));


var session = require('express-session');
var bodyParser = require('body-parser');
app.use(session({
    secret: 'keyboard cat',
    cookie: {
      maxAge: 1800000
    },
    resave: true,
    saveUninitialized: false
  }));


  
/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.locals = {};
  res.locals.error = [];

  return next();
});

require('./routes/customers')(app);
require('./routes/products')(app);
require('./routes/transactions')(app);
require('./routes/outside')(app);





//port beállítása
app.listen(80);
console.log('\x1b[93m','80-as port használatban');
console.log("\x1b[0m");