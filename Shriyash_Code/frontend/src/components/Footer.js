import React, { Component } from 'react';

function Footer() {
    return (
        <>
            <footer className="text-white bg-dark">
                <div className="container py-4 py-lg-5">
                    <div className="row justify-content-center">
                        <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                            <h3 className="fs-6 text-white">Services</h3>
                            <ul className="list-unstyled">
                                <li><a className="link-light" href="#">Cab Booking</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                            <h3 className="fs-6 text-white">About</h3>
                            <ul className="list-unstyled">
                                <li><a className="link-light" href="#">Website</a></li>
                                <li><a className="link-light" href="#">Team</a></li>
                                <li></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                            <h3 className="fs-6 text-white"><strong><em>OpulentCabs</em></strong></h3>
                            <p >Phase 2 of Rajiv Gandhi Infotech Park, Hinjewadi, Pune - 411057, MH-INDIA</p>
                            <ul className="list-unstyled">
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center justify-content-md-center pt-3">
                        <p className="mb-0">Copyright © 2023 Opulent</p>
                    </div>
                </div>
            </footer>

        </>
    );

}
export default Footer;