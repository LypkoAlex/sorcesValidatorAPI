function dumpFile(file) {
    return {
        id     : file._id,
        status : file.status,
        name   : file.name
    };
}

function dumpSite(site) {
    return {
        id     : site._id,
        url    : site.url,
        files  : site.files.map(dumpFile),
        status : getSiteStatus(site.files)
    };
}

function dumpUser(user) {
    return {
        id     : user._id,
        sites  : user.sites.map(dumpSite)
    };
}

function getSiteStatus(files) {
    let siteStatus;
    const isAnalyzed = files.find(({ status }) => {
        console.log(status)
        switch(status) {
            case 'UNSECURED': {
                siteStatus = 'UNSECURED';
                break;
            } 
            case 'ANALYZING': {
                siteStatus = 'ANALYZING';
                break;
            }
        }
        return status === 'ANALYZING';
    });

    return siteStatus;
}

module.exports = {
    dumpSite,
    dumpFile,
    dumpUser
};


