import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import profileImg from '../assets/profile.png'
import { useHistory } from 'react-router-dom';
import '../components/login.css';
import { ToastContainer, toast } from 'react-toastify';

// let accessToken = sessionStorage.getItem('loginToken');
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

function Login() {
    const url = "http://192.168.1.6:8080/passenger/login";
    const [message, setMessage] = useState();
    const [credentials, setCredentials] = useState({
        'email': '',
        'password': ''
    });

    const resetCredentials = () => {
        setCredentials({
            'email': '',
            'password': ''
        })
    }

    const history = useHistory();
    const OnTextChanged = (args) => {
        var copyOfCredentials = { ...credentials };
        copyOfCredentials[args.target.name] = args.target.value;
        setCredentials(copyOfCredentials);
    }


    var passengerLogin = () => {

        // check with db email and pass 
        axios.post(url, credentials).then((response) => {
            var replyReceived = response.data;
            if (replyReceived.mesg === "Successful Authentication!!!") {
                var tokenReceived = replyReceived.jwt;
                window.sessionStorage.setItem("loginToken", tokenReceived);
                toast.success("successfull login")
                history.push('/');
            }
        })
            .catch((error) => {
                // setMsg("Credentials are invalid!");
                toast.error("Credentials are invalid!");
                resetCredentials();
            })

    }

    const setMsg = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }

    return (
        <div className="container" >
            <ToastContainer/>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5" style={{ 'background': '#FAF5E6' }} >
                        <form className="card-body cardbody-color p-lg-5">
                            <div className="text-center">
                                <img src={profileImg} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile" />
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={credentials.email} onChange={OnTextChanged} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={credentials.password} onChange={OnTextChanged} />
                            </div>
                            <div className="text-center">

                                <button type="button" className="btn btn-primary btn-block mb-4 col-sm-6" onClick={passengerLogin}>Login</button>
                            </div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                                Registered? <a href="#" className="text-dark fw-bold"> Create an
                                    Account</a>
                            </div>
                            <div className='d-flex justify-content-center ' name="errorbox" id="errorbox" >{message}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;