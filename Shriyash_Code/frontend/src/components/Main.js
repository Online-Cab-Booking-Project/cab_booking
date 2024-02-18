import React, { Component, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import DashBoard from './Dashboard';
import PassengerSignup from './Signup';
import Contact from './Contact';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Account from './Account';
import YourRides from './YourRides';
import axios from 'axios';
import Complaint from './Complaint';
import { ToastContainer } from 'react-toastify';
import Complaints from './Complaints';
import { useSelector } from 'react-redux';
import UserProtectedRoutes from './UserProtectedRoutes';
import Login from './Login';
import Signup from './Signup';


function Main() {
    // const tokenURL = 'http://127.0.0.1:9999/validateToken/';



    // const [credentials, setCredentials] = useState({
    //     'username': '',
    //     'email': '',
    //     'password': '',
    //     'mobile': '',
    //     'dob': '',
    //     'gender': '',
    //     'address': ''
    // });

    // const history = useHistory();

    // useEffect(() => {

    //     var loginToken = window.sessionStorage.getItem('loginToken');

    //     // axios request to check token validity
    //     if (loginToken != null && loginToken != undefined) {


    //         axios.get(tokenURL,
    //             {
    //                 headers:
    //                 {
    //                     'authorization':
    //                         "bearer " + loginToken
    //                 }
    //             })
    //             .then((result) => {
    //                 console.log(result.data);
    //                 if (result.data.message == "success") {
    //                     setCredentials(result.data.credentials);
    //                     setIsLogin(true);
    //                 }
    //                 else {
    //                     setIsLogin(false);
    //                     resetCredentials();
    //                 }
    //             })
    //             .catch((error) => {

    //                 setIsLogin(false);
    //                 resetCredentials();
    //             })
    //     }
    //     else {
    //         setIsLogin(false);
    //         resetCredentials();
    //     }
    // }, []);

    // var resetCredentials = () => {
    //     setCredentials({
    //         'username': '',
    //         'email': '',
    //         'password': '',
    //         'mobile': '',
    //         'dob': '',
    //         'gender': '',
    //         'address': ''
    //     })
    // }

    // useEffect(() => {

    // }, isPassenger)

    return (
        <>
            <NavBar />

            <Switch>

                <Home path="/" exact component={Home} />

                <Route path='/login' exact component={Login} />

                <Route path='/register' exact component={Signup} />

                <Contact path='/Contact' exact component={Contact} />

                <About path='/About' exact component={About} />

                <UserProtectedRoutes path="/Account" exact component={Account} />

                <UserProtectedRoutes path="/YourRides" exact component={YourRides} />

                <UserProtectedRoutes path="/Complaints" exact component={Complaints} />

                <UserProtectedRoutes path='/Complaints/:id' exact component={Complaint} />

                <UserProtectedRoutes path='/Dashboard' exact component={DashBoard} />

            </Switch>

            <Footer />
        </>
    )
}

export default Main;