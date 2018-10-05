const Exception = require('../Exception');
const LIVR      = require('livr');

function testUrl(value) {
    return function(value) {
        const patt = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);

        if ( !patt.test(value) ) return 'NOT_VALID_URL';
    };
}

LIVR.Validator.registerDefaultRules({ url : testUrl });

module.exports = class Validator {
    validate(data, rules) {
        const validator = new LIVR.Validator(rules).prepare();

        const result = validator.validate(data);

        if (!result) {
            throw new Exception({
                code:   'FORMAT_ERROR',
                message: validator.getErrors()
            });
        }

        return result;
    }
};
