import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PassengerHome from './PassengerHome';
import DriverHome from './DriverHome';
import { credentialsActions } from '../react-redux-components/credentials-slice';
import Booking from './Booking';
import MyCarousel from './Carousel';

function Home() {

    const dispatch = useDispatch();
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);

    useEffect(() => {

    }, [])

    return (
        <>
            <Booking />

            {!isPassenger  && <MyCarousel />}
            {isPassenger && <PassengerHome />}
            {isDriver && <DriverHome />}
        </>
    );
}

export default Home;