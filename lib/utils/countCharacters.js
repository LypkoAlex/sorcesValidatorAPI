const { workerData, parentPort } = require('worker_threads');

const waitTill = new Date(new Date().getTime() + 3  * 1000);
while (waitTill > new Date());

parentPort.postMessage(workerData.length % 2 === 0);
