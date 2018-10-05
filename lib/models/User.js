const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User  = new Schema({
    _id   : String,
    sites : [{ type : Schema.Types.ObjectId, ref : 'Site' }]
});

module.exports = mongoose.model('User', User);
