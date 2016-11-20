var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    text: String,
    roomId: String,
    userId: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', MessageSchema);