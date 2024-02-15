import React, { Component, useEffect } from 'react';
import reactRouterDom from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../assets/Opulent_Hori.svg'
import person from '../assets/person.png'
import axios from 'axios';
import toast from "react-toastify"

function NavBar(props) {

    const tokenURL = 'http://127.0.0.1:9999/validateToken/';

    const history = useHistory();

    var logout = () => {
        window.sessionStorage.clear();
        props.resetCredentials();
        props.setIsLogin(false);
        window.location.replace('/');
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


                        <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    Home
                                </div>
                            </li>
                        </Link>


                        <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/contact">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    Contact
                                </div>

                            </li>
                        </Link>

                        <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/about">
                            <li className="nav-item">

                                <div className='nav-link'>
                                    About
                                </div>

                            </li>
                        </Link>

                        {
                            props.isLogin ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/dashboard">
                                                <div className='nav-link'>
                                                    Dashboard
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/yourRides">
                                                <div className='nav-link'>
                                                    Your Rides
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/bookRide">
                                                <div className='nav-link'>
                                                    Book Ride
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/account">
                                                <div className='nav-link'>
                                                    Account
                                                </div>
                                            </Link>
                                        </li>


                                    </>


                                )
                                :
                                (<li className="nav-item">
                                    <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/register">
                                        <div className='nav-link'>
                                            Sign up
                                        </div>
                                    </Link>
                                </li>)
                        }

                    </ul>

                    {
                        props.isLogin ?
                            (



                                <button type="button" className="btn btn-secondary me-2" onClick={logout}>
                                    {/* <img src={person} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                          /> */}
                                    Logout
                                </button>


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