var uuid =  require('node-uuid');
var _ = require('lodash');
var express = require('express');
var router = express.Router();

var rooms = require('./../../data/rooms.json');
const folder = 'admin/';

module.exports = router;

router.use(function (req, res, next) {
    if(req.user.isAdmin){
        next();
        return;
    }

    res.redirect('/login');
});

router.get('/rooms', function(req, res){
    res.render(folder + 'rooms', {
        title: 'Admin Rooms',
        rooms: rooms
    });
});

router.get('/rooms/new', function(req, res){
    res.render(folder + 'new');
});

router.post('/room', function(req, res){
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);
    res.redirect(req.baseUrl + '/rooms')
});

router.get('/room/:id/delete', function(req, res){
    var roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);

    res.redirect(req.baseUrl + '/rooms')
});

router.route('/room/:id/edit')
    .all(function (req, res, next) {
        var roomId = req.params.id;
        var room = _.find(rooms, r => r.id === roomId);
        if(!room){
            res.sendStatus(404);
            return;
        }
        res.locals.room = room;
        next()
    })
    .get(function(req, res){
        res.render(folder + 'edit')
    }).post(function(req, res){

        res.locals.room.name = req.body.name;

        res.redirect(req.baseUrl + '/rooms')
    });
