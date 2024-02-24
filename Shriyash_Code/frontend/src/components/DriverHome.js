import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import YourRides from './YourRides';
import AcceptReject from './AcceptReject';
import url from '../configs/urlConfig';
import axios from 'axios';



function DriverHome() {
    const [popupStatus, setPopupStatus] = useState(false);
    const [callAcceptRejectStatus, setCallAcceptRejectStatus] = useState(1);

    const driverAcceptRejectCall = async (bookingId, driverId, stat) => {
        let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
        let result = await axios.post(`${url}/driver/bookride/updatecallstatus`,
            {
                "bookingId": bookingId,
                "driverId": driverId,
                "driverAnswer": stat
            },
            {
                headers:
                {
                    'Authorization': "Bearer " + tokenToBeSent
                }
            })
            .then((res) => {
                console.log("changed call status driver " + driverId + " for booking id " + bookingId + " status " + stat);
                return true;
            })
            .catch((err) => {
                console.log("unable to change status driver " + driverId + " for booking id " + bookingId + " status " + stat);
                return false;
            }
            )
    }

    const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    useEffect(() => {
        const intervalQueue = setInterval(() => {

            let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
            axios.get(`${url}/driver/checkforcalls`,
                {
                    headers:
                    {
                        'Authorization': "Bearer " + tokenToBeSent
                    }
                }
            )
                .then
                (async (res) => {
                    if (res.data == "No calls" && res.status == 200) {

                    }
                    //(res.data.bookingId && res.status == 200)
                    else {
                        !popupStatus && setPopupStatus(true);
                        clearInterval(intervalQueue);
                        // sleepNow(2000);

                        if (callAcceptRejectStatus == 2 || callAcceptRejectStatus == 3) {

                            console.log(callAcceptRejectStatus);
                            let stat = callAcceptRejectStatus === 2 ? "A" : "R";
                            const details = res.data;
                            console.log(details);
                            console.log(stat);


                            // debugger;
                            // call to update booking status
                            let result = await driverAcceptRejectCall(details[0].booking.id, details[0].driverId, stat);
                        }

                    }
                })
                .catch((err) => {
                    // console.log("unable to ping server " + err);
                })

        }, 2000);

        // similar to component will unmount 
        return () => { clearInterval(intervalQueue) }
    })


    return (
        <>
            <AcceptReject onCall={popupStatus} setStatus={setCallAcceptRejectStatus} setPopupStatus={setPopupStatus} />
            <YourRides />
        </>


    );



}

export default DriverHome;