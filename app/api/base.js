var express = require('express');
var app = express();
var appRootDir = require('app-root-dir').get();


module.exports = app.use('/api', require(appRootDir + '/app/api/v1/root'));
module.exports = app.use('/api', require(appRootDir + '/app/api/v2/root'));

