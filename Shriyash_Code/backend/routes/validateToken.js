const express = require('express');
const mysql = require('mysql2');
const config = require('config');
const app = express.Router();
const jwt = require('jsonwebtoken');
const key = config.get("jwtkey");
const axios = require("axios");
const connectionDetails = {
    host: config.get("server"),
    database: config.get("db"),
    user: config.get("user"),
    password: config.get("pwd")
}


app.get('/', (request, response) => {
    if (request.headers.authorization != undefined || request.header.authorization != null) {
        //Get the header
        // console.log("Authorization header received is " + request.headers.authorization);

        //Split the header content
        var headerContents = request.headers.authorization.split(" ")

        var tokenReceived = headerContents[1];

        //verify the token
        var payloadDecodedFromToken = jwt.verify(tokenReceived, key)


        if (payloadDecodedFromToken != null || payloadDecodedFromToken != undefined) {
            axios.post('http://127.0.0.1:9999/passenger/getCredentials', {
                'email': payloadDecodedFromToken.email,
                "password": payloadDecodedFromToken.password
            })
                .then((res) => {
                    var replyReceived = res.data;


                    if (replyReceived != null && replyReceived != undefined && replyReceived.message == "success") {

                        //Prepare response 
                        var responseMessage = {
                            loginToken: tokenReceived,
                            message: "success",
                            credentials: replyReceived.credentials
                        }

                        //send it as response
                        response.write(JSON.stringify(responseMessage));
                        response.end();


                    }
                })
                .catch((error) => {
                    console.log(error);
                    //Prepare response 
                    var responseMessage = {
                        message: "Invalid email password and token!"
                    }

                    //send it as response
                    response.write(JSON.stringify(responseMessage));
                    response.end();
                })
        }
        else {
            //Prepare response 
            var responseMessage = {
                message: "Invalid Token!"
            }

            //send it as response
            response.write(JSON.stringify(responseMessage));
            response.end();
        }
    }
    else {
        //ask user to login and get token first   

        //Prepare response 
        var responseMessage = {
            message: "Need Token!"
        }

        //send it as response
        response.write(JSON.stringify(responseMessage));
        response.end();
    }
}
)



module.exports = app;