
SITE ANALYZER
------------------------------------------------------
### DESCRIPTION
look to apidoc for get information about requests.

### RUN
(this app use the native worker, please use nodeV10)
### Installation
```sh
$ npm install
$ npm start
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
