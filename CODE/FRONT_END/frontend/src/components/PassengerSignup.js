import React, { Component } from 'react';
import person_square from '../assets/person-square.svg'

function PassengerSignup() {
    return (
        <body className="align-content-center align-self-center">
            <section className="py-4 py-xl-5">
                <div className="container">
                    <div className="row d-flex justify-content-center justify-content-lg-center">
                        <div className=" col-lg-7 col-xl-4 offset-lg-0">
                            <div className="card border-0  mb-5">
                                <div
                                    className="card-body border rounded shadow-sm flex-column align-items-center justify-content-lg-center align-items-lg-center">
                                    <div className="card border-0 shadow-none">
                                        <div
                                            className="card-body border-0 shadow-none d-flex d-lg-flex d-xl-flex justify-content-center justify-content-lg-center align-items-lg-center justify-content-xl-center">
                                            <div
                                                className="bs-icon-xl bs-icon-circle bs-icon-primary d-flex justify-content-lg-center align-items-lg-center bs-icon my-4">
                                                <img src={person_square}></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-0 ">
                                        <div className="card-body">
                                            <form className="text-center" method="post">
                                                <div className="mb-3"><input className="border rounded-pill form-control" type="text"
                                                    name="username" placeholder="Username" autofocus="" required="" /></div>
                                                <div className="mb-3"><input
                                                    className="border rounded-pill form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                    type="password" name="password" placeholder="Password" required="" />
                                                </div>
                                                <div className="mb-3"><input
                                                    className="border rounded-pill form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                    type="password" name="re_enter_password" placeholder="Re-Enter Password"
                                                    required="" /></div>
                                                <div className="mb-3"><input className="border rounded-pill form-control" type="email"
                                                    name="email" placeholder="Email" required="" /></div>
                                                <div className="mb-3"><input
                                                    className="border rounded-pill form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                    type="number" name="mobile" placeholder="Mobile No" required="" /></div>
                                                <div className="mb-3"><textarea
                                                    className="border rounded form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                    placeholder="Address " autofocus="" required=""></textarea></div>
                                                <div className="mb-3"><select className="border rounded-pill form-select" name="gender"
                                                    required="">
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                    <option value="3">Other</option>
                                                </select></div>
                                                <div className="mb-3"><input className="border rounded-pill form-control" type="date"
                                                    name="dob" required="" /></div>
                                                <div className="mb-3"><button
                                                    className="btn btn-primary d-lg-flex flex-shrink-1 justify-content-lg-center align-items-lg-center d-block w-100"
                                                    type="button"
                                                    style={{ "margin-left": "2px", "padding-left": "8px", "padding-right": "15px", "margin-right": "-1px", "margin-top": "55px" }}>Sign
                                                    Up</button></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </body >
    );
}

export default PassengerSignup;