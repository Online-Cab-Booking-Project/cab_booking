import React, { Component, useState } from 'react';
import person_square from '../assets/person-square.svg'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Set default headers for all Axios requests

let accessToken = sessionStorage.getItem('loginToken');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

function Signup() {
    const history = useHistory();
    const url = "http://127.0.0.1:9999/passenger/";
    const [message, setMessage] = useState();
    const [credentials, setCredentials] = useState({
        'username': '',
        'email': '',
        'password': '',
        're_password': "",
        'mobile': '',
        'dob': '',
        'gender': '',
        'address': ''
    });

    const resetCredentials = () => {
        setCredentials({
            'username': '',
            'email': '',
            'password': '',
            're_password': "",
            'mobile': '',
            'dob': '',
            'gender': '',
            'address': ''
        })
    }

    const OnTextChanged = (args) => {
        var copyOfCredentials = { ...credentials };
        copyOfCredentials[args.target.name] = args.target.value;
        setCredentials(copyOfCredentials);
    }

    const setMsg = (msg) => {
        // setMessage(msg);
        toast.success(msg);
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }

    var validation = () => {
        return true;
    }

    var onSignUp = (args) => {
        console.log(credentials);
        // check validation
        if (validation()) {
            // post method insert axios call 
            axios.post(url, credentials)
                .then((response) => {
                    console.log(response.data);
                    // receive token as response
                    var reply = response.data;
                    if (reply.message === "success") {
                        var tokenReceived = reply.loginToken;
                        window.sessionStorage.setItem("loginToken", tokenReceived);
                        setMsg("success")
                        history.push('/');

                    }
                    else {
                        toast.error("Credentials are invalid!")
                        // setMsg("Credentials are invalid!");
                        resetCredentials();
                    }
                }
                )
                .catch((error) => {
                    toast.error('Internal server error ' + error)
                    // setMsg('Internal server error ' + error);
                }
                )
        }
        else {
            toast.warn('Please enter correct details');
            // setMsg('Please enter correct details');
            return;
        }



    }




    return (

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
                                                name="username" onChange={OnTextChanged} value={credentials.username} placeholder="username" autoFocus="" required="" /></div>
                                            <div className="mb-3"><input
                                                className="border rounded-pill form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                type="password" name="password" onChange={OnTextChanged} value={credentials.password} placeholder="Password" required="" />
                                            </div>
                                            <div className="mb-3"><input
                                                className="border rounded-pill form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                type="password" onChange={OnTextChanged} value={credentials.re_password} name="re_password" placeholder="Re-Enter Password"
                                                required="" /></div>
                                            <div className="mb-3"><input className="border rounded-pill form-control" type="email"
                                                name="email" onChange={OnTextChanged} value={credentials.email} placeholder="email" required="" /></div>
                                            <div className="mb-3"><input
                                                className="border rounded-pill form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                type="number" onChange={OnTextChanged} value={credentials.mobile} name="mobile" placeholder="Mobile No" required="" /></div>
                                            <div className="mb-3"><textarea name="address" onChange={OnTextChanged} value={credentials.address}
                                                className="border rounded form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                                placeholder="Address " autoFocus="" required=""></textarea></div>
                                            <div className="mb-3"><select className="border rounded-pill form-select" name="gender" value={credentials.gender}
                                                required="" onChange={OnTextChanged}>
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                                <option value="3">Other</option>
                                            </select></div>
                                            <div className="mb-3"><input className="border rounded-pill form-control" type="date"
                                                name="dob" onChange={OnTextChanged} value={credentials.dob} required="" /></div>
                                            <div className="mb-3"><button
                                                className="btn btn-primary d-lg-flex flex-shrink-1 justify-content-lg-center align-items-lg-center d-block w-100"
                                                type="button"
                                                onClick={onSignUp}
                                                style={{ "marginLeft": "2px", "paddingLeft": "8px", "paddingRight": "15px", "marginRight": "-1px", "marginTop": "55px" }}>Sign
                                                Up</button></div>

                                            <div className='d-flex justify-content-center ' name="errorbox" id="errorbox" >{message}<ToastContainer /></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >


    );
}

export default Signup;