var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User;
try
{
User= db.model('User', {
    username: String,
    email: String,
    password: String,
  });
} 
catch(e)
{
    User=db.model('User');
}

module.exports = User;
