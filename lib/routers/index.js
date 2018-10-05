const Sites = require('./Sites.js');

module.exports = function init() {
    return {
        sites : new Sites()
    };
};
