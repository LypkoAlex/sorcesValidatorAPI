const { Worker } = require('worker_threads');
const path       = require('path');

module.exports = {
    startAnalyzer :  (data, cb) => {
        const worker = new Worker(path.join(__dirname, './countCharacters.js'), {
            workerData: data
        });

        worker.on('message', cb);
    }
};
