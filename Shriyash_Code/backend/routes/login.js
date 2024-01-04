const express = require('express');
const mysql = require('mysql2');
const config = require('config');
const app = express.Router();
const jwt = require('jsonwebtoken');
const key = config.get("jwtkey");
const connectionDetails = {
    host: config.get("server"),
    database: config.get("db"),
    user: config.get("user"),
    password: config.get("pwd")
}

app.post("/", (request, response) => {

    var password = request.body.password
    var email = request.body.email

    var connection = mysql.createConnection(connectionDetails);

    var statement = `select * from users where email ='${email}' and password = '${password}'`;

    console.log(statement);

    connection.query(statement, (error, result) => {
        console.log(result);

        if (error == null && result.length != 0) {
            response.setHeader("Content-Type", "application/json")

            //Create Payload to be sent inside token
            var payload = {
                "email": `${email}`,
                "password": `${password}`
            }

            //Create a token
            var token = jwt.sign(payload, key);
            // console.log(token);

            //Prepare response 
            var responseMessage = {
                loginToken: token,
                message: "success",
                credentials : result    
            }

            //send it as response
            response.write(JSON.stringify(responseMessage));
            // console.log(responseMessage);
            connection.end();
            response.end();
        }
        else {
            response.setHeader("Content-Type", "application/json")
            response.write(JSON.stringify(error));
            console.log(error);
            connection.end();
            response.end();
        }

    })



})

module.exports = app;