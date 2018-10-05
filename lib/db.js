const mongoose     = require('mongoose');
const { database } = require('../etc/config.json')[process.env.ENV];

module.exports = {
    connect : () => {
        mongoose.connect(`mongodb://${database.username}:${database.password}@${database.host}`);
    }
};
