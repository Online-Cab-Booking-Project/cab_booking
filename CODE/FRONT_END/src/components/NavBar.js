import React, { Component } from 'react';
import reactRouterDom from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Opulent_Hori from '../assets/Opulent_Horizontal.svg';

function NavBar() {

    return <>
        <nav class="navbar navbar-dark navbar-expand-md bg-dark py-3">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    {/* <span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"></span>
                    <span><strong><em>OpulentCabs</em></strong></span> */}
                    <img src={Opulent_Hori}></img>
                </a>
            
        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-5"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navcol-5">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                        <li class="nav-item"><a class="nav-link" href="About.html">About</a></li>
                        <li class="nav-item"><a class="nav-link me-2" href="">
                            <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/PassengerSignup">
                                Sign Up
                            </Link> </a>
                        </li>

                    </ul>
                    <Link to="/login">
                        <button type="button" className="btn btn-primary btn-block me-2" >Log in</button> </Link>

                </div>
            </div>
        </nav>
    </>;
}

export default NavBar;