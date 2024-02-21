import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PassengerHome from './PassengerHome';
import DriverHome from './DriverHome';
import MyCarousel from './Carousel';

function Home() {

    const dispatch = useDispatch();
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);

    useEffect(() => {

    }, [isPassenger, isDriver])

    return (
        <>
            {isPassenger && <PassengerHome />}
            {isDriver && <DriverHome />}
            <MyCarousel/>
        </>
    );
}

export default Home;