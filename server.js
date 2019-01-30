const express = require('express'); // minimalist web framework for Node.js
const app = express();
const sql = require('mssql/msnodesqlv8') //mssql with MS driver for SQL Server
// added windows authentication

var env = process.env.NODE_ENV || 'development';
var sqlConfig = require('./config')[env];

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

const connection = new sql.ConnectionPool(sqlConfig, function (err) {
    if (err) {
        console.log(err);
    }
})

