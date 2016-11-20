var fs = require('fs');
var appRootDir = require('app-root-dir').get();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(appRootDir + '/logs/access.log', {flags: 'a'});

module.exports = require('morgan')('combined', {stream: accessLogStream});