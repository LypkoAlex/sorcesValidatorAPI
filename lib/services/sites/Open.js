const crypto     = require('crypto');

const Base         = require('../Base');
const File         = require('../../models/File');
const Site         = require('../../models/Site');
const User         = require('../../models/User');
const clients      = require('../../wsClients.js');
const { dumpSite } = require('../../utils/dump.js');

const { startAnalyzer } = require('../../utils/workflows.js');

module.exports =  class List extends Base {
    validate(params) {
        const rules = {
            url   : ['required', 'string', 'url'],
            files : ['required', 'not_empty_list', { 'list_of_objects' : [{
                fieldname    : ['required'],
                buffer       : ['required'],
                originalname : ['required']
            }]}],
            userId    : ['required', 'string']
        };

        return this.validator.validate(params, rules);
    }

    async execute(data) {
        const existedFiles = [];
        let existedSite;
        let currentUser;
        let isExistedSiteInCurrentUser = true;

        const existedUser = await User.findOne({ _id : data.userId }).populate({
            path  : 'sites',
            model : 'Site',
            populate : {
                path : 'files',
                model : 'File'
            }
        });

        if (existedUser) {
            existedSite = existedUser.sites.find(site => site.url === data.url);
            currentUser = existedUser;
        } else {
            currentUser = new User({ _id : data.userId, sites : [] });
        }
        
        if (!existedSite) {
            existedSite = await Site.findOne({ url : data.url }).populate('files');
            isExistedSiteInCurrentUser = false;
        }

        const files = await Promise.all(data.files.map(async rawFile => {
            const hash = crypto.createHash('md5').update(rawFile.buffer).digest('hex');
            const existedFile = await File.findOne({ hash });

            if (existedFile) {
                existedFiles.push(existedFile);
                return existedFile;
            }

            const file = new File({
                hash,
                name   : rawFile.originalname,
                status : 'ANALYZING'
            });

            rawFile.hash = hash;

            startAnalyzer(rawFile.buffer.toString(), async res => {
                const client = clients.get(data.sessionId);
                file.status = res ? 'SECURED' : 'UNSECURED';
                await file.save();
                if (client) {
                    client.send(JSON.stringify({
                        event : 'FILE_ANALYZED',
                        file
                    }));
                }
            });

            await file.save();
            return file;
        }));

        if (existedSite) {
            existedSite.files = files;
            await existedSite.save();

            return { data : { site : dumpSite(existedSite)} };
        }

        const site = new Site({
            url : data.url,
            files
        });

        await site.save();

        if (!isExistedSiteInCurrentUser) {
            currentUser.sites.push(existedSite ? existedSite : site);
        }
        await currentUser.save();

        return { data : { site : dumpSite(site)} };
    }
};
