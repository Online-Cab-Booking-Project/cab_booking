// Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {

    return (
        <div className="popup-container">
            <div className="popup">
                <h2>Oops it seems that your credentials are invalid !!!</h2>
                <p>Redirecting to login in 5 seconds</p>
            </div>
        </div>
    );
};

export default Popup;