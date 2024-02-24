import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { ridesActions } from '../react-redux-components/rides-slice';
import { toast } from 'react-toastify';
import axios from 'axios';
import url from '../configs/urlConfig';
import AcceptReject from './AcceptReject';


function YourRides() {
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);
    const rides = useSelector((state) => state.ride.rides);
    const onGoingRide = useSelector((state) => state.ride.onGoingRide);
    const dispatch = useDispatch();
    const history = useHistory();


    var parseStatus = (status) => {

        if (status == "D")
            return "Completed"
        else if (status == 'P')
            return "Pending"
        else if (status == 'O')
            return "Ongoing"
        else
            return "Cancelled"
    }

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
                // toast.success("Ride details fetched")
                dispatch(ridesActions.addRides(res.data));

                rides.forEach(ride => {
                    console.log(ride.status)
                    if (ride.status == 'O') {
                        dispatch(ridesActions.addOnGoingRide(ride))
                    }
                });
                // sort time wise
                // let sortedRides = [...rides];
                // sortedRides.sort((r1, r2) => {
                //     return new Date(r1.bookingTime) > new Date(r2.bookingTime);
                // });
                // dispatch(ridesActions.addRides(sortedRides));


            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch ride details")
            })
    }




    useEffect(() => {
        getRides();
    }, []);

    const Done = async (driverId, bookingId) => {
        let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
        let result = await axios.post(`${url}/passenger/bookride/updatebookingstatus`,
            {
                "bookingId": bookingId,
                "driverId": driverId,
                "status": "D"
            },
            {
                headers:
                {
                    'Authorization': "Bearer " + tokenToBeSent
                }
            })
            .then((res) => {
                console.log("changed call status driver " + driverId + " for booking id " + bookingId + " status " + "Completed");
                return true;
            })
            .catch((err) => {
                console.log("unable to change status driver " + driverId + " for booking id " + bookingId + " status " + "Completed");
                return false;
            }
            )
        dispatch(ridesActions.resetOnGoingRide());

    }


    return <section>


        <div className="container py-4 py-xl-5">
            <div style={{ 'marginTop': '10px' }}>
                <h1 >Ongoing</h1>
            </div>


            {
                onGoingRide == null || onGoingRide == undefined || onGoingRide.id == null ?

                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px' }}>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="card" style={{ '--bs-body-bg': '#fff' }}>
                                <div className="card-body p-4">
                                    <h4 className="card-title">You have no Ongoing rides</h4>
                                    <button className="btn btn-secondary" role="button"
                                        style={{ 'borderRadius': '100px', '--bs-primary': '#7d838c', '--bs-primary-rgb': '125,131,140', 'background': 'rgb(72,72,72)' }}>
                                        <span style={{ 'color': 'rgb(255, 255, 255)' }}>Schedule a Ride</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px', 'marginRight': '0px', 'background': 'rgb(255, 255, 255)' }}>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div className="card" style={{ '--bs-body-bg': '#fff' }}>
                                <div className="card-body p-4" key={onGoingRide.id}>
                                    <h4 className="card-title">{onGoingRide.bookingDate} {onGoingRide.bookingTime}&nbsp;</h4>
                                    <p className="card-text">Pickup: {onGoingRide.pickupAddress}<br />Drop-off: {onGoingRide.dropoffAddress}</p>
                                    <button className="btn  btn-success" role="button" onClick={() => { Done(onGoingRide.driver.id, onGoingRide.id) }} style={{ 'borderRadius': '100px', '--bs-primary': '#fff', '--bs-primary-rgb': '125,131,140', 'marginRight': '5px' }}>
                                        <span style={{ 'color': 'rgb(255, 255, 255)' }}>{parseStatus(onGoingRide.status)}</span></button>
                                    <a className="btn btn-info" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#fff', '--bs-primary-rgb': '125,131,140', 'marginRight': '5px' }}>
                                        <span style={{ 'color': 'rgb(0, 0, 0)' }}>{onGoingRide.fare} ₹</span></a>
                                    <a className="btn btn-warning" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#fff', '--bs-primary-rgb': '125,131,140', 'marginRight': '5px' }}>
                                        <span style={{ 'color': 'rgb(0, 0, 0)' }}>Report an Issue</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
            }


        </div>
        <div className="container">
            <hr />
        </div>
        <div className="container py-xl-2" style={{ 'paddingTop': '32px' }}>
            <div style={{ 'marginTop': '10px' }}>
                <h1>Past</h1>
            </div>

            {
                rides.map((ride) => {
                    if (ride.state == 'O')
                        return <></>

                    return (
                        <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ 'marginTop': '0px', 'marginRight': '0px', 'background': 'rgb(255, 255, 255)' }}>
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <div className="card" style={{ '--bs-body-bg': '#fff' }}>
                                    <div className="card-body p-4" key={ride.id}>
                                        <h4 className="card-title">{ride.bookingDate} {ride.bookingTime}&nbsp;</h4>
                                        <p className="card-text">Pickup: {ride.pickupAddress}<br />Drop-off: {ride.dropoffAddress}</p>
                                        <button className="btn  btn-primary" role="button" style={{ 'borderRadius': '100px', 'marginRight': '5px' }}>
                                            <span style={{ 'color': 'rgb(255, 255, 255)' }}>{parseStatus(ride.status)}</span></button>
                                        <a className="btn btn-info" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#FFF', '--bs-primary-rgb': '125,131,140', 'marginRight': '5px' }}>
                                            <span style={{ 'color': 'rgb(0, 0, 0)' }}>{ride.fare} ₹</span></a>
                                        <a className="btn btn-warning" role="button" style={{ 'borderRadius': '100px', '--bs-primary': '#FFF', '--bs-primary-rgb': '125,131,140', 'marginRight': '5px' }}>
                                            <span style={{ 'color': 'rgb(0, 0, 0)' }}>Report an Issue</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                })

            }
        </div>
    </section>;
}

export default YourRides;