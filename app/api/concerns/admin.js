var express = require('express');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var appRootDir = require('app-root-dir').get();
var uuid =  require('node-uuid');
var _ = require('lodash');
Promise.promisifyAll(mongoose);

// define models
var Room = require(appRootDir + '/app/models/Room.js');
var User = require(appRootDir + '/app/models/User.js');
var Message = require(appRootDir + '/app/models/Message.js');

var router = express.Router();
module.exports = router;

router.get('/rooms', function (req, res) {
    Room.find(function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

router.route('/rooms/:roomId/messages')
    .get(function (req, res) {

        var roomId = req.params.roomId;

        Promise.props({
            room: Room.findById({_id: roomId}).execAsync(),
            messages: Message.find({roomId: roomId}).execAsync()
        })
        .then(function(results) {
            if(!results.room){
                res.sendStatus(404);
                return;
            }

            res.json(results)
        })
        .catch(function(err) {
            res.send(500); // oops - we're even handling errors!
        });

    }).post(function (req, res) {
        var callback = function (err, data) {
            if (err) { return console.error(err); }
            else {
                console.log(data);
            }
        };
        var roomId = req.params.roomId;

        var message = {
            userId: req.user._id,
            roomId: roomId,
            text: req.body.text
        };
        Message.create(message, callback);
        res.sendStatus(200);

    }).delete(function (req, res) {
        var callback = function (err, data) {
            if (err) { return console.error(err); }
            else { console.log(data); }
        };
        var roomId = req.params.roomId;
        Message.remove({roomId: roomId}, callback);
        res.sendStatus(200);
    });