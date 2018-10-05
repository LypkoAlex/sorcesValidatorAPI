REAL TIME MSG 
=========
ou can subscribe to TCP socket <path>:<port>/api/v1/:user Id and get info about files analyzing at real time.

Response
----

```js
{
    "event" : "FILE_ANALYZED",
    "file"  : {
        "name" : "name",
        "hash" : "hash",
        ....
    }
}
```