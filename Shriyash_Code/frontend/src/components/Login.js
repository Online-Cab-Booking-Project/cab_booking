import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import profileImg from '../assets/profile.png'
import { useHistory } from 'react-router-dom';
import '../components/login.css';
import { ToastContainer, toast } from 'react-toastify';
import url from '../configs/urlConfig';
import { useDispatch, useSelector } from 'react-redux';
import { credentialsActions } from '../react-redux-components/credentials-slice';
import { Link } from 'react-router-dom/cjs/react-router-dom';


function Login() {
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const isDriver = useSelector((state) => state.credential.isDriver);
    const history = useHistory();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        'email': '',
        'password': '',
        'role': 'ROLE_PASSENGER'
    });

    const resetCredentials = () => {
        setCredentials({
            'email': '',
            'password': '',
            'role': 'ROLE_PASSENGER'
        })
    }

    const OnTextChanged = (args) => {
        var copyOfCredentials = { ...credentials };
        copyOfCredentials[args.target.name] = args.target.value;
        setCredentials(copyOfCredentials);
    }

    const validateInput = () => {

        if (credentials.email === "" || credentials.email === null) {
            toast.error("Email cannot be empty")
            return false;
        }
        if (credentials.password === "" || credentials.password === null) {
            toast.error("Password cannot be empty")
            return false;
        }

        return true;
    }

    var passengerLogin = () => {

        if (!validateInput()) return;

        // check with db email and pass 
        axios.post(url + "/login", credentials).then((response) => {
            var replyReceived = response.data;
            if (replyReceived.message === "success") {
                var tokenReceived = replyReceived.loginToken;
                window.sessionStorage.setItem("JWT_TOKEN", tokenReceived);

                if (credentials.role === 'ROLE_PASSENGER')
                    dispatch(credentialsActions.setPassengerStatus(true));
                else
                    dispatch(credentialsActions.setDriverStatus(true));

                toast.success("Login Success")
                history.push('/');
            }
        })
            .catch((error) => {
                toast.error("Internal Error Please Try Again");
                console.log(error);
                resetCredentials();
                dispatch(credentialsActions.setPassengerStatus(false));
                dispatch(credentialsActions.setDriverStatus(false));
            })

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
                                <label htmlFor="email">Email</label>
                                <input type="email" required className="form-control" name="email" id="email" placeholder="Email" value={credentials.email} onChange={OnTextChanged} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={credentials.password} onChange={OnTextChanged} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role">Role</label>
                                <select className=" form-select" name="role" value={credentials.role} onChange={OnTextChanged}>
                                    <option selected value="ROLE_PASSENGER">Passenger</option>
                                    <option value="ROLE_DRIVER">Driver</option>
                                </select>
                            </div>

                            <div className="text-center">

                                <button type="button" className="btn btn-primary btn-block mb-4 col-sm-6" onClick={passengerLogin}>Login</button>
                            </div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                                Not Registered?
                                <Link style={{ 'color': 'gray', 'hover': 'purple' }} to="/register">
                                    <a className="text-dark fw-bold"> Create an Account</a>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;