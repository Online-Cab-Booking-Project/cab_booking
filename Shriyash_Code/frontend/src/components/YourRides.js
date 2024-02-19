import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { ridesActions } from '../react-redux-components/rides-slice';
import { toast } from 'react-toastify';
import axios from 'axios';
import url from '../configs/urlConfig';


function YourRides() {
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);
    const rides = useSelector((state) => state.ride.rides);
    const dispatch = useDispatch();
    const history = useHistory();



    var getRides = () => {
        let passengerOrDriver = isDriver ? "driver" : "passenger";
        let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
        axios.get(url + `/${passengerOrDriver}/yourRides`,
            {
                headers:
                {
                    'Authorization': "Bearer " + tokenToBeSent
                }
            })
            .then((res) => {
                toast.success("Ride details fetched")
                res.data.forEach(ride => {
                    dispatch(ridesActions.addRides(ride));
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch ride details")
            })
    }


    useEffect(() => {
        getRides();
    }, []);


    return <section>
        <div className="container py-4 py-xl-5">
            <div style={{ 'marginTop': '10px' }}>
                <h1 >Upcoming</h1>
            </div>
            <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px' }}>
                <div className="col-md-12 col-lg-12 col-xl-12">
                    <div className="card" style={{ '--bs-body-bg': '#8c8a8a' }}>
                        <div className="card-body p-4">
                            <h4 className="card-title">You have no upcoming rides</h4><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Schedule a Ride</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <hr />
        </div>
        <div className="container py-xl-2" style={{ 'paddingTop': '32px' }}>
            <div style={{ 'marginTop': '10px' }}>
                <h1>Past</h1>
            </div>

            {rides.map((ride) => {
                <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px', 'marginRight': '0px' }}>
                    <div className="col-md-12 col-lg-12 col-xl-12">
                        <div className="card" style={{ '--bs-body-bg': '#8c8a8a' }}>
                            <div className="card-body p-4" key={ride.id}>
                                <h4 className="card-title">{ride.bookingDate} {ride.bookingTime}&nbsp;</h4>
                                <p className="card-text">Pickup: {ride.pickupAddress}<br />Drop-off: {ride.dropoffAddress}</p>
                                <a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}>
                                    <span style={{ 'color': 'rgb(255, 255, 255)' }}>Rebook</span></a>
                                <a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}>
                                    <span style={{ 'color': 'rgb(255, 255, 255)' }}>Details Fare: {ride.fare} Status : {ride.status} </span></a>
                                <a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}>
                                    <span style={{ 'color': 'rgb(255, 255, 255)' }}>Report an Issue</span></a>
                            </div>
                        </div>
                    </div>
                </div>

            })


            }

            <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px', 'marginRight': '0px' }}>
                <div className="col-md-12 col-lg-12 col-xl-12">
                    <div className="card" style={{ '--bs-body-bg': '#8c8a8a' }}>
                        <div className="card-body p-4">
                            <h4 className="card-title">Monday, 24th December 2023&nbsp;</h4>
                            <p className="card-text">Pickup: HOME<br />Drop-off: PG</p><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Rebook</span></a><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Details</span></a><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Report an Issue</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px', 'marginRight': '0px' }}>
                <div className="col-md-12 col-lg-12 col-xl-12">
                    <div className="card" style={{ '--bs-body-bg': '#8c8a8a' }}>
                        <div className="card-body p-4">
                            <h4 className="card-title">Friday, 31st December 2023&nbsp;</h4>
                            <p className="card-text">Pickup: PG<br />Drop-off: Hotel Party-Inn</p><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Rebook</span></a><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Details</span></a><a className="btn btn-light" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)', 'marginRight': '5px' }}><span style={{ 'color': 'rgb(255, 255, 255)' }}>Report an Issue</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}

export default YourRides;