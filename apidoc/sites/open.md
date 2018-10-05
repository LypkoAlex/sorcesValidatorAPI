SITE OPEN
=========

Request
----
```js
POST /api/v1/users/:userId/sites?url=<site-url>
```
form-data:
```js
{
    "index.js"   : <FILE>,
    "index.html" : <FILE>
}
```

Response
----

```js
{
    "data": {
        "site" : {
            "id": "5bb4a6e6e0f6152524003de9",
            "status": "ANALYZING",
            "files": [
                {
                    "id": "5bb4a6e3e0f6152524003de5",
                    "status": "UNSECURED",
                    "name": "loladsf"
                },
                {
                    "id": "5bb4a6e3e0f6152524003de6",
                    "status": "ANALYZING",
                    "name": "lol2asdas"
                },
                {
                    "id": "5bb4a6e3e0f6152524003de7",
                    "status": "ANALYZING",
                    "name": "sdf"
                },
                {
                    "id": "5bb4a6e3e0f6152524003de8",
                    "status": "ANALYZING",
                    "name": "qwerrty"
                }
            ]
        }
    },
    "status": 1
}
```