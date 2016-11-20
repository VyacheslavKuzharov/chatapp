var express = require('express');
var appRootDir = require('app-root-dir').get();
var apiHandler = require(appRootDir + '/lib/api-version');

var router = express.Router();
module.exports = router;

router.get('/status', function (req, res) {
    
    var status = {
        status: 'ok', 
        time: new Date(), 
        version: apiHandler.getVersion(req)
    };
    res.json(status)
});