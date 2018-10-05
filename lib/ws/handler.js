
const clients = require('../wsClients.js');

module.exports = function(ws, { params }) {
    clients.set(params.userId, ws);
    ws.on('close', () => {
        clients.delete(params.userId);
    });
};
