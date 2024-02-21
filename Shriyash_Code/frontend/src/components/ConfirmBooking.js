import axios from "axios";
import React, { Component } from 'react';
import url from "../configs/urlConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../react-redux-components/booking-slice";


export const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const CallDriver = async (driverId, bookingId) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    axios.post(url + "/passenger/bookride/addcall",
        {
            "bookingId": driverId,
            "driverId": bookingId
        },
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            console.log("response sent to driver " + driverId + " for booking id " + bookingId);
            return true;
        })
        .catch((err) => {
            console.log("Unable to call the driver with id " + driverId + " for booking id " + bookingId);
            return false;
        }
        )

    return false;
}


export const CheckStatusFor10sec = async (bookingId, driverId) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    axios.get(url + `/passenger/bookride/getanswer/${bookingId}/${driverId}`,
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            let driverAnswer = res.data.driverAnswer;

            return driverAnswer;
        })
        .then((err) => {
            console.log("unable to get the status of booking call ");
            return "R";
        })
}

export const requestToSetCallStatus = (bookingId, driverId, driverAnswer) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    axios.post(url + "/passenger/bookride/updatecallstatus",
        {
            "bookingId": driverId,
            "driverId": bookingId,
            "driverAnswer": driverAnswer
        },
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            console.log("changed call status driver " + driverId + " for booking id " + bookingId + " status " + driverAnswer);
            return true;
        })
        .catch((err) => {
            console.log("unable to change status driver " + driverId + " for booking id " + bookingId + " status " + driverAnswer);
            return false;
        }
        )

}

export const CheckStatus = async (bookingId, driverId) => {


    for (let i = 0; i < 10; i++) {
        let statusAnswer = await CheckStatusFor10sec(bookingId, driverId);

        if (statusAnswer == 'R') {
            return 'R';
        }
        else if (statusAnswer == 'A') {
            return 'A';
        }

        await sleepNow(10000);
    }

    return 'N'
}

async function ConfirmBooking() {

    const rideDetails = useSelector(state => state.booking.rideDetails);
    const bookingDetails = useSelector(state => state.booking.bookingDetails);
    const dispatch = useDispatch();

    //set ride details for getting booking details and driver list
    dispatch(bookingActions.addRideDetails({
        "inputDetails": {
            "bookingDate": (new Date()).getDate(),
            "bookingTime": {
                "hour": (new Date).getHours(),
                "minute": (new Date).getMinutes(),
                "second": (new Date).getMinutes(),
                "nano": (new Date).getMilliseconds()
            },
            "pickupAddress": "123 Main St",
            "dropoffAddress": "456 Oak St",
            "fare": 0,
        },
        "source": {
            "sourceX": 0,
            "sourceY": 0
        }
    }));

    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    // call to get list of driver id , distance and booking id
    axios.post(url + "/passenger/bookride/confirm",
        rideDetails,
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then(async (res) => {

            // successfull getting booking Id, driver list and distance
            // o/p is booking details
            // setBookingDetails(res.data);
            dispatch(bookingActions.addBookingDetails(res.data));

            let driversList = bookingDetails.driverList;

            //sort driver acc to the min dist.
            driversList.sort((d1, d2) => {
                return d1.distance < d2.distance;
            })

            // now give calls to each driver.
            for (let i = 0; i < driversList.length; i++) {

                // call to driver which is next in the list
                let driverCall = await CallDriver(driversList[i].id, bookingDetails.id);

                // if driver call success
                if (driverCall) {
                    // now after every 10 sec check for status resolve..
                    let bookingStatus = await CheckStatus(bookingDetails.id, driversList[i].id);

                    // call accepted
                    if (bookingStatus == 'A') {
                        requestToSetCallStatus(bookingDetails.id, driversList[i].id, "A");
                    }
                    // call unanswered or rejected
                    else {
                        // call server for status set = rejected or unanswered
                        if (bookingStatus == 'R') {
                            requestToSetCallStatus(bookingDetails.id, driversList[i].id, "R");
                        }
                        else {
                            requestToSetCallStatus(bookingDetails.id, driversList[i].id, "N");
                        }
                    }
                }
                else {
                    console.log("unable to call driver");
                }

            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Unable to fetch Driver List")
        })


        return <>
        
        <h1>Hello</h1>
        </>


}

export default ConfirmBooking;