import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Popup.css';
import { driverAvailabilityActions } from '../react-redux-components/driverAvailability-slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import url from '../configs/urlConfig';

function AcceptReject({ onCall, setStatus, setPopupStatus, bookingId, driverId }) {

    const handleCallSuccess = async () => {
        setStatus(2);
        setPopupStatus(false);
        // call to update booking status
        let result = await driverAcceptRejectCall(bookingId, driverId, "A");
    }

    const handleCallFailure = async () => {
        setStatus(3);
        setPopupStatus(false);
        // call to update booking status
        let result = await driverAcceptRejectCall(bookingId, driverId, "R");
    }

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

    useEffect(() => {
    }, [])

    return (
        <>
            {
                onCall &&
                <div className="popup-container">
                    <div className="popup">
                        <h2>Incoming Call For You !!!</h2>
                        <p>Choose To Accept ?</p>
                        <button type="button" className="btn btn-primary me-2" onClick={handleCallSuccess}>Accept Call</button>
                        <button type="button" className="btn btn-danger " onClick={handleCallFailure}>Reject Call</button>
                    </div>
                </div>

            }
        </>

    );
}


export default AcceptReject;