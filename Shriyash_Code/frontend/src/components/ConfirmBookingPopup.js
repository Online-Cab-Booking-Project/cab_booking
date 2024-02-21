// Popup.js
import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Popup.css';

const ConfirmBookingPopup = ({ onClose }) => {

    return (
        <>
            {
                !onClose &&
                <div className="popup-container">
                    <div className="popup">
                        <h2>Confirming Ride !!!</h2>
                        <p>Please wait till we find nearest ride for you</p>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            }
        </>
    );
};

export default ConfirmBookingPopup;