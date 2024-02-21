// Popup.js
import React from 'react';
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
                    </div>
                </div>
            }
        </>
    );
};

export default ConfirmBookingPopup;