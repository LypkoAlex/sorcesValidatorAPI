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
        status : site.status,
        files  : site.files.map(dumpFile)
    };
}

function dumpUser(user) {
    return {
        id     : user._id,
        sites  : user.sites.map(dumpSite)
    };
}

module.exports = {
    dumpSite,
    dumpFile,
    dumpUser
};


