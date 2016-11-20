// load mongoose package
var mongooseHandler = require('mongoose');
// Use native Node promises
mongooseHandler.Promise = global.Promise;
// connect to MongoDB
mongooseHandler.connect('mongodb://localhost/chatApp')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

module.exports = mongooseHandler;