import React, { Component, useEffect, useState } from 'react';
import reactRouterDom from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../assets/Opulent_Hori.svg'
import person from '../assets/person.png'
import { useDispatch, useSelector } from 'react-redux';
import { credentialsActions } from '../react-redux-components/credentials-slice';
import { toast } from 'react-toastify';

import { Button, Image } from 'react-bootstrap';
import play from '../assets/portable-wifi-off.svg';
import stop from '../assets/hotspot.svg';
import { driverAvailabilityActions } from '../react-redux-components/driverAvailability-slice';
import DriverAvailabilityButton from './DriverAvailabilityButton';

function NavBar() {
    const isAvailable = useSelector((state) => state.availability.isAvailable);
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);
    const isAdmin = useSelector(state => state.credential.isAdmin)

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        history.push('/');
        window.sessionStorage.clear();
        dispatch(credentialsActions.setPassengerStatus(false));
        dispatch(credentialsActions.setDriverStatus(false));
        dispatch(credentialsActions.setAdminStatus(false));
        dispatch(credentialsActions.setCredentials({}));
        toast.success("Logged Out");
    }




    return <>
        <nav className="navbar navbar-dark navbar-expand-md bg-dark py-3">
            <div className="container">

                <Link to="/">
                    <div className="navbar-brand d-flex align-items-center" >
                        <img className='img-fluid ' src={logo} style={{ 'maxHeight': '60px', 'maxWidth': '300px' }} />
                    </div>

                </Link>

                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-5"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse" id="navcol-5">
                    <ul className="navbar-nav ms-auto">


                        <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    Home
                                </div>
                            </li>
                        </Link>


                        <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/contact">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    Contact
                                </div>

                            </li>
                        </Link>

                        <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/about">
                            <li className="nav-item">

                                <div className='nav-link'>
                                    About
                                </div>

                            </li>
                        </Link>

                        {
                            isPassenger || isDriver || isAdmin ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/complaints">
                                                <div className='nav-link'>
                                                    Complaints
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/yourrides">
                                                <div className='nav-link'>
                                                    Rides
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/account">
                                                <div className='nav-link'>
                                                    Account
                                                </div>
                                            </Link>
                                        </li>


                                    </>


                                )
                                :
                                (<li className="nav-item">
                                    <Link style={{ 'color': 'gray', 'hover': 'purple', 'text-decoration': 'none' }} to="/register">
                                        <div className='nav-link'>
                                            Sign up
                                        </div>
                                    </Link>
                                </li>)
                        }

                    </ul>

                    {
                        isPassenger || isDriver ?
                            (
                                <>
                                    {isDriver &&
                                        <>
                                            <DriverAvailabilityButton />
                                            <Button
                                                variant='light'
                                                onClick={() => { dispatch(driverAvailabilityActions.toggleAvailability()) }}
                                                className='me-2'
                                                style={{
                                                    borderRadius: '10px',
                                                    width: '45px',
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-end',

                                                }}
                                            >
                                                <Image
                                                    src={isAvailable ? stop : play}
                                                    alt="Availability"
                                                    fluid
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        width: '80%',
                                                        height: '80%',
                                                    }}
                                                />
                                                <span style={{ marginBottom: '10px', textAlign: 'center' }}>

                                                </span>
                                            </Button>
                                        </>}


                                    <button type="button" className="btn btn-secondary me-2" onClick={logout}>
                                        {/* <img src={person} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                          /> */}
                                        Logout
                                    </button>
                                </>

                            )
                            :
                            (
                                <Link to="/login">
                                    <button type="button" className="btn btn-primary btn-block me-2" >Log in</button>
                                </Link>
                            )
                    }



                </div>
            </div >
        </nav >
    </>;
}

export default NavBar;