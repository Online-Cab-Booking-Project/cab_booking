import React, { Component, useEffect, useState } from 'react';
import profile from '../assets/profile.png'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import url from '../configs/urlConfig';
import { credentialsActions } from '../react-redux-components/credentials-slice';
import { toast } from 'react-toastify';

function Account() {
    const credentials = useSelector((state) => state.credential.credentials)
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);
    const [disableState, setDisableState] = useState(true);
    const dispatch = useDispatch();

    var getAccountDetails = (user) => {

        let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
        axios.get(url + `/${user}/account/`,
            {
                headers:
                {
                    'Authorization': "Bearer " + tokenToBeSent
                }
            })
            .then((res) => {
                dispatch(credentialsActions.setCredentials(res.data));
                toast.success("User details fetched");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to fetch user details")
            })
    }

    const OnTextChanged = (args) => {
        var copyOfCredentials = { ...credentials };
        copyOfCredentials[args.target.name] = args.target.value;
        console.log(copyOfCredentials)
        dispatch(credentialsActions.setCredentials(copyOfCredentials));
    }

    var Edit = () => {
        // toogle disable state
        setDisableState(!disableState);
    }

    var Update = () => {

        let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
        axios.put(url + "/passenger/account/update/",
            credentials,
            {
                headers:
                {
                    'Authorization': "Bearer " + tokenToBeSent
                }
            })
            .then((res) => {
                toast.success("User details updated")
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to update user details")
                getAccountDetails();
            })
            .finally(() => {
                setDisableState(true);
            })
    }


    useEffect(() => {
        debugger
        console.log(isPassenger);
        console.log(isDriver)
        isPassenger && getAccountDetails("passenger");
        isDriver && getAccountDetails("driver");
    }, [])


    return <section>
        <hr />
        <div>
            <p className="d-lg-flex justify-content-lg-center"><strong>Account Information</strong></p>
        </div>
        <hr className="d-lg-flex justify-content-lg-center" />
        <div className="text-center">
            <img src={profile} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile" />
        </div>
        <section className="py-4 py-xl-5">
            <div className="container">
                <div className="row d-flex justify-content-lg-center">
                    <div className="col-md-6 col-xl-4 text-center d-lg-flex" style={{ 'margin': '75px', 'display': 'inline-flex', 'transform': 'scale(1.18)', 'width': '610px' }}>
                        <div className="card mb-5" style={{ 'width': '596px' }}>
                            <div className="card-body font-monospace flex-column align-items-center">
                                <form className="text-center" method="post">
                                    <div className="mb-3"><input className="form-control" type="text" name="firstName" onChange={OnTextChanged} value={credentials.firstName} disabled={disableState} /></div>
                                    <div className="mb-3"><input className="form-control" type="text" name="lastName" onChange={OnTextChanged} value={credentials.lastName} disabled={disableState} /></div>
                                    <div className="mb-3"><input className="form-control" type="email" name="email" value={credentials.email} disabled /></div>
                                    <div className="mb-3"><input className="form-control" type="number" name="mobileNo" onChange={OnTextChanged} value={credentials.mobileNo} disabled={disableState} /></div>
                                    <div className="mb-3"><textarea className="form-control" name="address" onChange={OnTextChanged} value={credentials.address} disabled={disableState}></textarea></div>
                                    <div className="mb-3"><input className="form-control" type="date" name="dob" onChange={OnTextChanged} value={credentials.dob} disabled={disableState} /></div>
                                    <div className="mb-3"><select className="form-select" name="gender" onChange={OnTextChanged} value={credentials.gender} disabled={disableState}>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </select></div>
                                    <div className="mb-3"></div>

                                    {isDriver &&

                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="vehname">Vehicle Name</label>

                                                <input className="border form-control" type="text"
                                                    name="vehName" id="vehname" onChange={OnTextChanged} value={credentials.vehName} disabled={disableState} placeholder="Ex. Dzire" autoFocus="" required="" />

                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="vehColor">Vehicle Color</label>

                                                <input className="border form-control" type="text"
                                                    name="vehcolor" id="vehColor" onChange={OnTextChanged} value={credentials.vehcolor} disabled={disableState} placeholder="Ex. White" autoFocus="" required="" />

                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="vehNo">Vehicle No</label>

                                                <input className="border form-control" type="text"
                                                    name="vehno" id="vehNo" onChange={OnTextChanged} value={credentials.vehno} disabled={disableState} placeholder="Ex. MH12UC5896" autoFocus="" required="" />

                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="vehType">Vehicle Type</label>

                                                <input className="border form-control" type="text"
                                                    name="vehtype" id="vehType" onChange={OnTextChanged} value={credentials.vehtype} disabled={disableState} placeholder="Ex. Sedan" autoFocus="" required="" />

                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="ava">Availability</label>
                                                <select className=" form-select" name="availability" value={credentials.availability} disabled={disableState} onChange={OnTextChanged}>
                                                    <option value="A">Available</option>
                                                    <option value="N">Not Available</option>
                                                </select>
                                            </div>
                                        </div>
                                    }
                                </form>
                                <button className="btn btn-primary" type="button" onClick={Edit} disabled={!disableState} hidden={!disableState}>Edit</button>
                                <button className="btn btn-warning me-2" type="button" onClick={Update} disabled={disableState} hidden={disableState}>Update</button>
                                <button className="btn btn-danger" type="button" onClick={Edit} disabled={disableState} hidden={disableState}>Cancel</button>
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
                <p className="d-lg-flex justify-content-lg-center">Customer Wallet ID# {credentials.wallet && credentials.wallet["walletId"]}</p>
                <p className="d-lg-flex justify-content-lg-center">Your Balance is {credentials.wallet && credentials.wallet["balance"]}₹  &nbsp;</p>
            </div>
        </div>
    </section>
}

export default Account;