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


app.post("/getCredentials", (request, response) => {
    var email = request.body.email
    var password = request.body.password

    // search into DB.
    var connection = mysql.createConnection(connectionDetails);

    var statement = `select * from users where email = '${email}' && password ='${password}';`;

    console.log(statement);

    connection.query(statement, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json")

            //Prepare response 
            var responseMessage = {
                credentials: result[0],
                message: "success"
            }

            //send it as response
            response.write(JSON.stringify(responseMessage));
            console.log(responseMessage);
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
});


app.post("/", (request, response) => {


    var username = request.body.username
    var password = request.body.password
    var email = request.body.email
    var address = request.body.address
    var mobile = parseInt(request.body.mobile)
    var dob = request.body.dob
    var gender = request.body.gender


    // insert into DB.
    var connection =
        mysql.createConnection(connectionDetails);

    var statement = `insert into users (id,username,email,password,address,mobile,dob,gender) values(default,'${username}','${email}', '${password}','${address}', ${mobile},'${dob}','${gender}');`;

    console.log(statement);

    connection.query(statement, (error, result) => {
        if (error == null && result.affectedRows != 0) {
            response.setHeader("Content-Type", "application/json")

            //Create Payload to be sent inside token
            var payload = {
                "email": `${email}`,
                "password": `${password}`
            }

            //Create a token
            var token = jwt.sign(payload, key);
            console.log(token);

            //Prepare response 
            var responseMessage = {
                loginToken: token,
                message: "success"
            }

            //send it as response
            response.write(JSON.stringify(responseMessage));
            console.log(responseMessage);
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
});


module.exports = app;