import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Popup.css';
import { driverAvailabilityActions } from '../react-redux-components/driverAvailability-slice';
import { useDispatch, useSelector } from 'react-redux';

function AcceptReject({ onCall, setStatus, setPopupStatus }) {
    const intervalQueue = useSelector((state) => state.availability.intervalQueue);
    const dispatch = useDispatch();

    const handleCallSuccess = () => {
        setStatus(2);
        setPopupStatus(false);
    }

    const handleCallFailure = () => {
        setStatus(3);
        setPopupStatus(false);
    }

    useEffect(() => {
        dispatch(driverAvailabilityActions.toggleAvailability());
        clearInterval(intervalQueue);
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