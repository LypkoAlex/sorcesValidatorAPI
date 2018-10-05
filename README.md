
SITE ANALYZER
------------------------------------------------------
### DESCRIPTION
look to apidoc for get information about requests.
### Important
(this app use the native worker, please use nodeV10)
### START
add app credentials to /etc/config.json
### Installation AND Run
```sh
$ npm install
$ npm start
```
### SOCKET WATCHER
edit path in wsClient.js if you need it and run the script
```sh
$ node wsClient.js 
```

### Application structure
```
server.js
wsClient.js
 /etc
 /tests
 /lib
    /routes
    /services
```

**/etc** - config files.

**/server.js** - main file with http server.

**/client.js** - script that uploading file to the server.

**/lib** - contains application source code.

**/lib/routes** - routes.

**/lib/services** - business logic of application.
