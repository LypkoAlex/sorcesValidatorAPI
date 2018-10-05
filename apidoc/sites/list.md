LIST OF SITES FOR USER
=========

Request
----
```js
GET /api/v1/users/:userId/sites
```

Response
----

```js
{
    "data": {
        "sites" : [
            {
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
            },
            ...
        ]
    },
    "status": 1
}
```