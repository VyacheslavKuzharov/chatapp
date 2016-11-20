var express = require('express');
var router = express.Router();

module.exports = router;
const folder = __filename.split('/')[__filename.split('/').length-1].split('.')[0];


router.get('/', function(req, res){
    res.render(folder + '/home', { title: 'Home' });
});