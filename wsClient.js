const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.on('connect', function(connection) {
    connection.on('message', function(msg) {
        console.log(msg);
    });

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Connection Closed');
    });
});

client.connect(`ws://localhost:3000/api/v1/userId`);
