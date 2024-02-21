import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PassengerHome from './PassengerHome';
import DriverHome from './DriverHome';
import { credentialsActions } from '../react-redux-components/credentials-slice';
import Booking from './Booking';
import Car from './Carousel';

function Home() {

    const dispatch = useDispatch();
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);

    useEffect(() => {

        // dispatch(credentialsActions.setPassengerStatus(true));
    }, [isPassenger, isDriver])

    return (
        <>
            <Booking />
            <Car />
            {isPassenger && <PassengerHome />}
            {isDriver && <DriverHome />}
        </>
    );
}

export default Home;