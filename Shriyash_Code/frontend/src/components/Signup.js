import React, { Component, useState } from 'react';
import person_square from '../assets/person-square.svg'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import url from '../configs/urlConfig';
import { useDispatch, useSelector } from 'react-redux';
import { credentialsActions } from '../react-redux-components/credentials-slice';


function Signup() {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        're_password': "",
        'mobileNo': '',
        'dob': '',
        'gender': 'M',
        'address': '',
        'role': 'ROLE_PASSENGER',
        "vehcolor": "",
        "vehname": "",
        "vehno": "",
        "vehtype": "",
        "availability": 'A',
        "x_coordinates": '',
        "y_coordinates": ''
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
            'gender': 'M',
            'address': '',
            'role': 'ROLE_PASSENGER',
            "vehcolor": "",
            "vehname": "",
            "vehno": "",
            "vehtype": "",
            "availability": 'A',
            "x_coordinates": '',
            "y_coordinates": ''
        })
    }

    const OnTextChanged = (args) => {
        var copyOfCredentials = { ...credentials };
        copyOfCredentials[args.target.name] = args.target.value;
        setCredentials(copyOfCredentials);
    }

    var validation = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(credentials.password)) {
            toast.password ('Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.');
            return false;
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(credentials.mobileNo)) {
            toast.error('Please enter a valid 10-digit mobile number.');
            return false;
        }

        // const currentDate = new Date();
        // const year = currentDate.getFullYear();
        // let month = currentDate.getMonth() + 1;
        // let day = currentDate.getDate();
        // var dob = year + month + day;
        // let parseddob=dob.split('-');
        // console.log(parseddob);
        // if (dob <= currentDate) {
        //     toast.error('Please enter a valid date of birth.');
        //     return false;
        // }

        return true;
    }

    var driverValidation = () => {

        return true;
    }

    var register = (user) => {
        // post method insert axios call 
        axios.post(url + `/${user}/register`, credentials)
            .then((response) => {
                console.log(response.data);
                // receive token as response
                var reply = response.data;
                if (reply.message === "success") {
                    toast.success("Registeration Success");
                    toast.success("Please Login");
                    history.push('/login');

                }
                else {
                    toast.error("Registeration Failed")
                    resetCredentials();
                }
            }
            )
            .catch((error) => {
                toast.error('Internal server error')
                console.log(error);
            }
            )
    }

    var onSignUp = (args) => {
        console.log(credentials);
        // check validation
        if (!validation()) return;

        if (credentials.role.match("ROLE_PASSENGER")) {
            // passenger regiter call
            register("passenger");
        }
        else {
            if (!driverValidation()) return;
            // register driver 
            register("driver");

        }
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
                                    <label htmlFor="firstName">First Name</label>

                                    <input className="border form-control" type="text"
                                        name="firstName" id="firstName" onChange={OnTextChanged} value={credentials.firstName} placeholder="Eg. Manish Shkla" autoFocus="" required="" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName">Last Name</label>

                                    <input className="border form-control" type="text"
                                        name="lastName" id="lastName" onChange={OnTextChanged} value={credentials.lastName} placeholder="Ex. Manish Shkla" autoFocus="" required="" />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input className="border  form-control" type="email" id="email"
                                        name="email" onChange={OnTextChanged} value={credentials.email} placeholder="email" required="" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="border  form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                        type="password" name="password" onChange={OnTextChanged} value={credentials.password} placeholder="Password" required="" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="re_password">Re-Enter Password</label>
                                    <input
                                        className="border  form-control d-lg-flex justify-content-lg-center align-items-lg-center" id="re_password"
                                        type="password" onChange={OnTextChanged} value={credentials.re_password} name="re_password" placeholder="Re-Enter Password"
                                        required="" />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="mb">Mobile No</label>
                                    <input
                                        className="border  form-control d-lg-flex justify-content-lg-center align-items-lg-center" id="mb"
                                        type="number" onChange={OnTextChanged} value={credentials.mobileNo} name="mobileNo" placeholder="Mobile No" required="" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <textarea name="address" onChange={OnTextChanged} value={credentials.address} id="address"
                                        className="border rounded form-control d-lg-flex justify-content-lg-center align-items-lg-center"
                                        placeholder="Address " autoFocus="" required="">
                                    </textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="gender">Gender</label>
                                    <select className="border  form-select" name="gender" value={credentials.gender} id="gender"
                                        required="" onChange={OnTextChanged}>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="date">Date Of Birth</label>
                                    <input className="border  form-control" type="date" id="date"
                                        name="dob" onChange={OnTextChanged} value={credentials.dob} required="" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role">Role</label>
                                    <select className=" form-select" name="role" value={credentials.role} onChange={OnTextChanged}>
                                        <option value="ROLE_PASSENGER">Passenger</option>
                                        <option value="ROLE_DRIVER">Driver</option>
                                    </select>
                                </div>

                                {credentials.role && credentials.role !== undefined && credentials.role === "ROLE_DRIVER" &&

                                    <div>
                                        <div className="mb-3">
                                            <label htmlFor="vehname">Vehicle Name</label>

                                            <input className="border form-control" type="text"
                                                name="vehname" id="vehname" onChange={OnTextChanged} value={credentials.vehname} placeholder="Ex. Dzire" autoFocus="" required="" />

                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="vehColor">Vehicle Color</label>

                                            <input className="border form-control" type="text"
                                                name="vehcolor" id="vehColor" onChange={OnTextChanged} value={credentials.vehcolor} placeholder="Ex. White" autoFocus="" required="" />

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="vehNo">Vehicle No</label>

                                            <input className="border form-control" type="text"
                                                name="vehno" id="vehNo" onChange={OnTextChanged} value={credentials.vehno} placeholder="Ex. MH12UC5896" autoFocus="" required="" />

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="vehType">Vehicle Type</label>

                                            <input className="border form-control" type="text"
                                                name="vehtype" id="vehType" onChange={OnTextChanged} value={credentials.vehtype} placeholder="Ex. Sedan" autoFocus="" required="" />

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="ava">Availability</label>
                                            <select className=" form-select" name="availability" value={credentials.availability} onChange={OnTextChanged}>
                                                <option value="A">Available</option>
                                                <option value="N">Not Available</option>
                                            </select>
                                        </div>

                                    </div>
                                }


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