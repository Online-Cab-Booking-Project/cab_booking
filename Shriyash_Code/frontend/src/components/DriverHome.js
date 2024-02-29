import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import YourRides from './YourRides';
import AcceptReject from './AcceptReject';
import url from '../configs/urlConfig';
import axios from 'axios';
import DriverAvailabilityButton from './DriverAvailabilityButton';



function DriverHome() {
    

    return (
        <>
        <YourRides />
        </>
    );



}

export default DriverHome;