import React, { Component, useState } from 'react';
import person_square from '../assets/person-square.svg'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import url from '../configs/urlConfig';
import { useDispatch } from 'react-redux';
import { credentialsActions } from '../react-redux-components/credentials-slice';


function Signup() {
    const history = useHistory();
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        're_password': "",
        'mobileNo': '',
        'dob': '',
        'gender': '',
        'address': ''
    });

    const resetCredentials = () => {
        setCredentials({
            'firstName': '',
            'lastName': '',
            'email': '',
            'password': '',
            're_password': "",
            'mobileNo': '',
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
        if (!validation()) return;

        // post method insert axios call 
        axios.post(url + "/passenger/register", credentials)
            .then((response) => {
                console.log(response.data);
                // receive token as response
                var reply = response.data;
                if (reply.message === "success") {
                    var tokenReceived = reply.loginToken;
                    window.sessionStorage.setItem("JWT_TOKEN", tokenReceived);
                    toast.success("Registeration Success");
                    dispatch(credentialsActions.setPassengerStatus(true));
                    history.push('/');

                }
                else {
                    toast.error("Registeration Failed")
                    resetCredentials();
                }
            }
            )
            .catch((error) => {
                toast.error('Internal server error ' + error)
            }
            )
    }




    return (

        <section>
            <div className="container" >
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card my-5" style={{ 'background': '#FAF5E6' }} >
                            <form className="card-body cardbody-color p-lg-5">
                                <div className="text-center">
                                    <img src={profileImg} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                        width="200px" alt="profile" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Username</label>

                                    <input className="border form-control" type="text"
                                        name="username" id="username" onChange={OnTextChanged} value={credentials.username} placeholder="Ex. Manish Shkla" autoFocus="" required="" />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="border  form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                        type="password" name="password" onChange={OnTextChanged} value={credentials.password} placeholder="Password" required="" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Username</label>
                                    <input
                                        className="border  form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                        type="password" onChange={OnTextChanged} value={credentials.re_password} name="re_password" placeholder="Re-Enter Password"
                                        required="" /></div>
                                <div className="mb-3">
                                    <label htmlFor="email">Username</label>
                                    <input className="border  form-control" type="email"
                                        name="email" onChange={OnTextChanged} value={credentials.email} placeholder="email" required="" /></div>
                                <div className="mb-3">
                                    <label htmlFor="email">Username</label>
                                    <input
                                        className="border  form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                        type="number" onChange={OnTextChanged} value={credentials.mobile} name="mobile" placeholder="Mobile No" required="" /></div>
                                <div className="mb-3">
                                    <label htmlFor="email">Username</label>
                                    <textarea name="address" onChange={OnTextChanged} value={credentials.address}
                                        className="border rounded form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                        placeholder="Address " autoFocus="" required=""></textarea></div>
                                <div className="mb-3">
                                    <label htmlFor="email">Username</label>
                                    <select className="border  form-select" name="gender" value={credentials.gender}
                                        required="" onChange={OnTextChanged}>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Other</option>
                                    </select></div>
                                <div className="mb-3"><input className="border  form-control" type="date"
                                    name="dob" onChange={OnTextChanged} value={credentials.dob} required="" /></div>
                                <div className="mb-3">
                                    <div className="text-center">

                                        <button type="button" className="btn btn-primary btn-block mb-4 col-sm-6" onClick={onSignUp}>Sign Up</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >


    );
}

export default Signup;