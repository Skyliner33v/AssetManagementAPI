//Setup required stuff
const express = require('express'); //REST API framework
const sql = require('mssql/msnodesqlv8') //For connecting to SQL Server / For using Windows Authentication (TrustedConnection)

//Make the app use Express
const app = express();

//Enable body-parser to easily access the body of requests
app.use(express.json());

//Use configuration from config.js
//Change env string to switch between 'LOCAL', 'TEST', 'PRODUCTION' configurations
var env = process.env.NODE_ENV || 'TEST';
var sqlConfig = require('./config')[env];


// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("AssetManagement API running and listening at http://localhost:%s", port)
});


//Setup up the connection pool
const pool = new sql.ConnectionPool(sqlConfig, function(err){
    if (err){
    console.log(err);
    }
}); 


// Define the root route
app.get('/', function (req, res) {
    res.json({
        "message": "Welcome to WSDOT Asset Management API."
    });
});


//Define route to the BRIDGE Table
app.get('/api/bridges', async (req, res) => {

    //Ensures that the pool has been created
    await pool;
    try {
        //Request a new connection
        let request = pool.request();

        //Submit a new request passing the following query
        let result = await request.query('SELECT * FROM [BRIDGE]');

        //Sends the response data as JSON to the user
        res.json(result.recordset);

    } catch (err) {
        res.status(500).send(err.message);
    };
});

//Define route to the STRUCTURE UNIT Table
app.get('/api/structureUnit', async (req, res) => {

    //Ensures that the pool has been created
    await pool;
    try {
        //Request a new connection
        let request = pool.request();

        //Submit a new request passing the following query
        let result = await request.query('SELECT * FROM [STRUCTURE_UNIT]');

        //Sends the response data as JSON to the user
        res.json(result.recordset);

    } catch (err) {
        res.status(500).send(err.message);
    };
});


//Define route to the ROADWAY Table
app.get('/api/roadway', async (req, res) => {

    //Ensures that the pool has been created
    await pool;
    try {
        //Request a new connection
        let request = pool.request();

        //Submit a new request passing the following query
        let result = await request.query('SELECT * FROM [ROADWAY]');

        //Sends the response data as JSON to the user
        res.json(result.recordset);

    } catch (err) {
        res.status(500).send(err.message);
    };
});


//Define route to the INSPEVNT Table
app.get('/api/inspections', async (req, res) => {

    //Ensures that the pool has been created
    await pool;
    try {
            //Request a new connection
            let request = pool.request();

        //Submit a new request passing the following query
        let result = await request.query('SELECT * FROM [INSPEVNT]');

        //Sends the response data as JSON to the user
        res.json(result.recordset);

    } catch (err) {
        res.status(500).send(err.message);
    };
});


//Define route to the PON_ELEM_INSP Table
app.get('/api/elementData', async (req, res) => {
    
    //Ensures that the pool has been created
    await pool;
    try {
        //Request a new connection
        let request = pool.request();

        //Submit a new request passing the following query
        let result = await request.query('SELECT * FROM [PON_ELEM_INSP]');

        //Sends the response data as JSON to the user
        res.json(result.recordset);

    } catch (err) {
        res.status(500).send(err.message);
    };
});

//Define route to the TRANSACTIONS Table to log POST requests
app.post('/api/transactions', async (req, res) => {

    //Ensures that the pool has been created
    await pool;
    try {
        //Request a new connection
        let request = pool.request();

        //Submit a new request passing the following query to Insert the data into the database
        //Inputs are sanitized against SQL Injection
        let result = await request
            .input('tableName', sql.NVarChar, req.body.tableName)
            .input('apiRequestType', sql.NVarChar, req.body.apiRequestType)
            .input('status', sql.NVarChar, req.body.status)
            .input('numRows', sql.Int, req.body.numRows)
            .input('datePosted', sql.DateTime, req.body.datePosted)
            .query('INSERT INTO [apiTransactions] (tableName, apiRequestType, status, numRows, datePosted) VALUES (@tableName, @apiRequestType, @status, @numRows, @datePosted)');

        //Sends the response data as JSON to the user
        res.status(200).send("POST to API Transactions Success!");

    } catch (err) {
        console.error(err.message);
    };
});