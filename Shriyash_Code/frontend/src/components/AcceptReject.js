import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Popup.css';

function AcceptReject({ onCall, setStatus, setPopupStatus }) {

    const handleCallSuccess = () => {
        setStatus(2);
        setPopupStatus(false);
    }

    const handleCallFailure = () => {
        setStatus(3);
        setPopupStatus(false);
    }

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