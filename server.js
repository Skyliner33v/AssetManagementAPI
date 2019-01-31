const express = require('express'); // minimalist web framework for Node.js
const app = express();
const sql = require('mssql/msnodesqlv8') //mssql with MS driver for SQL Server
// added windows authentication

var env = process.env.NODE_ENV || 'prod02pBridgeData';
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

// Define a simple route
app.get('/', function (req, res) {
    res.json({
        "message": "Welcome to WSDOT AssetManagement Sample App."
    });
});

// Define a route to the Bridge Table
app.get('/api/bridge', function (req, res) {
    connection.connect().then(pool => { //Using a single connection pool is recommended
        var conn = pool.request()
        var string = 'SELECT * FROM Bridge'
        return conn.query(string)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        connection.close();
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err
        })
        connection.close();
    });
});

// Define a route to the Element Definitions Table
app.get('/api/elementDefinitions', function (req, res) {
    connection.connect().then(pool => { //Using a single connection pool is recommended
        var conn = pool.request()
        var string = 'SELECT * FROM PON_ELEM_DEFS'
        return conn.query(string)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        connection.close();
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err
        })
        connection.close();
    });
});

// Define a route to the Element Definitions Table
app.get('/api/inspections', function (req, res) {
    connection.connect().then(pool => { //Using a single connection pool is recommended
        var conn = pool.request()
        var string = 'SELECT TOP 100 * FROM INSPEVNT'
        return conn.query(string)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        connection.close();
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err
        })
        connection.close();
    });
});

// Define a route to the BridgeData/tblMaster Table
app.get('/api/tblMaster', function (req, res) {
    connection.connect().then(pool => { //Using a single connection pool is recommended
        var conn = pool.request()
        var string = 'SELECT TOP 100 * FROM tblMaster'
        return conn.query(string)
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        connection.close();
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err
        })
        connection.close();
    });
});