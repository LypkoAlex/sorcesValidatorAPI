/* eslint-disable */
const fs              = require('fs');
const crypto          = require('crypto');
const assert          = require('assert');
const path            = require('path');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server          = require('../server.js');
const File         = require('../lib/models/File.js');
const User         = require('../lib/models/User.js');
const Site         = require('../lib/models/Site.js');

const testData = {
    url    : 'google.com',
    userId : 'testUser',
    file   : path.join(__dirname, './mock-data/test-file.txt')
}

require('../lib/db.js').connect();
const clearDB = () => {
    return Promise.all([
        File.deleteMany({}),
        User.deleteMany({}),
        Site.deleteMany({})
    ]);
}
describe('LIST OF SITES', () => {
    before(async () => {
        await clearDB();
    });

    describe('Negative', () => {
        it('get list of sites by not existed user', async () => {
            const { body } = await chai.request(server).get(`/api/v1/users/${testData.userId}/sites`);
            assert.equal(body.status, 0);
            assert.equal(body.error.message, 'USER DOES NOT EXIST');
        });
    });

    describe('Positive', () => {
        it('open site', async () => {
            const { body } = await chai.request(server)
                .post(`/api/v1/users/${testData.userId}/sites?url=${testData.url}`)
                .attach('imageField', testData.file, 'test-file.txt');
    
            assert.equal(body.status, 1);
            const site = body.data.site;
            const dbSite = await Site.findOne({url : testData.url});
            assert.equal(site.url, testData.url);
            assert.equal(site.url, dbSite.url);
            assert.equal(site.files[0].name, 'test-file.txt');
        });

        it('get list', async () => {
            const { body } = await chai.request(server).get(`/api/v1/users/${testData.userId}/sites`);
            assert.equal(body.status, 1);
        });
    });
});

