import React, { Component, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import profileImg from '../assets/profile.png'
import { useHistory } from 'react-router-dom';
import PassengerDashBoard from './PassengerDashboard';
import '../components/login.css';


function Login() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    var passengerLogin = () => {
        console.log(email + "  " + pass);
        history.push('/PassengerDashboard');
        // axios.post('/passenger/login',
        //     {
        //         'email': email,
        //         'password': pass,
        //         'accessToken': localStorage.getItem('accessToken')
        //     })
    }

    var onInputChange = (args) => {

        if (args.target.name === 'email') {
            var emailCopy = { ...email };
            emailCopy = args.target.value;
            setEmail(emailCopy);
        }
        else if (args.target.name === 'password') {
            var passCopy = { ...pass };
            passCopy = args.target.value;
            setPass(passCopy);
        }

    }

    return (
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
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={email} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={pass} onChange={onInputChange} />
                            </div>
                            <div className="text-center">

                                <button type="button" className="btn btn-primary btn-block mb-4 col-sm-6" onClick={passengerLogin}>Login</button>
                            </div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                                Registered? <a href="#" className="text-dark fw-bold"> Create an
                                    Account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;