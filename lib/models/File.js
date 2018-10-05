const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File  = new Schema({
    name     : String,
    hash     : { type : String, unique: true },
    status   : String // analyzing / secured / unsecured
});

module.exports = mongoose.model('File', File);
