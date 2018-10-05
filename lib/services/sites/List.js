const Base = require('../Base');
const User = require('../../models/User');
const X = require('../../Exception.js');
const { dumpSite } = require('../../utils/dump');

module.exports =  class List extends Base {
    validate(params) {
        const rules = {
            userId : ['required', 'string']
        };

        return this.validator.validate(params, rules);
    }

    async execute(data) {
        const user = await User
            .findOne({ _id : data.userId })
            .populate({
                path  : 'sites',
                model : 'Site',
                populate : {
                    path : 'files',
                    model : 'File'
                }
            });
        if (!user) {
            throw new X({
                message : 'USER DOES NOT EXIST'
            });
        }
        return { sites : user.sites.map(dumpSite) };
    }
};
