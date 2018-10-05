const Base = require('./Base');

module.exports = class Fules extends Base {
    async open({ files, body, params, query }) {
        return this.run('sites/Open', {
            params : {
                ...body,
                ...params,
                ...query,
                files
            }
        });
    }

    async list({ params }) {
        return this.run('sites/List', {
            params : {
                ...params
            }
        });
    }
};
