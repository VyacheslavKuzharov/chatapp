var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    name: String,
    id: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Room', RoomSchema);
