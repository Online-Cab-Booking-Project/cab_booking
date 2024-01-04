import React, { Component, useEffect } from 'react';
import profile from '../assets/profile.png'

function Account(props) {


    return <section>
        <hr />
        <div>
            <p className="d-lg-flex justify-content-lg-center"><strong>Account Information</strong></p>
        </div>
        <hr className="d-lg-flex justify-content-lg-center" />
        <picture className="text-end d-lg-flex justify-content-lg-center"><img src={profile} className="d-lg-flex align-items-lg-center" /></picture>
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="row d-flex justify-content-lg-center">
                    <div className="col-md-6 col-xl-4 text-center d-lg-flex" style={{ 'margin': '75px', 'display': 'inline-flex', 'transform': 'scale(1.18)', 'width': '610px' }}>
                        <div className="card mb-5" style={{ 'width': '596px' }}>
                            <div className="card-body font-monospace flex-column align-items-center">
                                <form className="text-center" method="post">
                                    <div className="mb-3"><input className="form-control" type="text" name="username" value={props.credentials.username} disabled /></div>
                                    <div className="mb-3"><input className="form-control" type="email" name="email" value={props.credentials.email} disabled /></div>
                                    <div className="mb-3"><input className="form-control" type="number" name="mobile" value={props.credentials.mobile} disabled /></div>
                                    <div className="mb-3"><textarea className="form-control" name="address" value={props.credentials.address} disabled></textarea></div>
                                    <div className="mb-3"><input className="form-control" type="date" name="dob" value={props.credentials.dob} disabled /></div>
                                    <div className="mb-3"><select className="form-select" name="gender" value={props.credentials.gender} disabled>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Other</option>
                                    </select></div>
                                    <div className="mb-3"></div>
                                </form><button className="btn btn-primary" type="button">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <hr />
        <div>
            <p className="text-center"><strong>Wallet Information</strong></p>
            <picture className="text-end d-lg-flex justify-content-lg-center"><img className="d-lg-flex align-items-lg-center" /></picture>
            <div>
                <p className="d-lg-flex justify-content-lg-center">Your Balance in ₹&nbsp;</p>
            </div>
        </div>
    </section>
}

export default Account;