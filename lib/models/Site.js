const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Site  = new Schema({
    url     : String,
    files   : [{ type : Schema.Types.ObjectId, ref : 'File'}],
    status : String
});

module.exports = mongoose.model('Site', Site);
