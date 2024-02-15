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


function Main() {

    const tokenURL = 'http://127.0.0.1:9999/validateToken/';
    const [isLogin, setIsLogin] = useState();
    const [credentials, setCredentials] = useState({
        'username': '',
        'email': '',
        'password': '',
        'mobile': '',
        'dob': '',
        'gender': '',
        'address': ''
    });

    const history = useHistory();

    useEffect(() => {

        var loginToken = window.sessionStorage.getItem('loginToken');

        // axios request to check token validity
        if (loginToken != null && loginToken != undefined) {


            axios.get(tokenURL,
                {
                    headers:
                    {
                        'authorization':
                            "bearer " + loginToken
                    }
                })
                .then((result) => {
                    console.log(result.data);
                    if (result.data.message == "success") {
                        setCredentials(result.data.credentials);
                        setIsLogin(true);
                    }
                    else {
                        setIsLogin(false);
                        resetCredentials();
                    }
                })
                .catch((error) => {

                    setIsLogin(true);
                    resetCredentials();
                })
        }
        else {
            setIsLogin(false);
            resetCredentials();
        }
    }, []);

    var resetCredentials = () => {
        setCredentials({
            'username': '',
            'email': '',
            'password': '',
            'mobile': '',
            'dob': '',
            'gender': '',
            'address': ''
        })
    }

    return (
        <>
            <ToastContainer />

            <NavBar
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                credentials={credentials}
                setCredentials={setCredentials}
                resetCredentials={resetCredentials}
            />



            <Switch>

                <Home path="/" exact component={Home}
                    isLogin={isLogin}
                    credentials={credentials}

                />

                <DashBoard path='/Dashboard' exact component={DashBoard}
                    isLogin={isLogin}
                    credentials={credentials}
                />

                <YourRides path='/YourRides' exact component={YourRides}

                    isLogin={isLogin}
                    credentials={credentials}
                />

                <Contact path='/Contact' exact component={Contact}

                    isLogin={isLogin}
                    credentials={credentials}
                />

                <About path='/About' exact component={About}

                    isLogin={isLogin}
                    credentials={credentials}
                />

                <Account path='/Account' exact component={Account}

                    isLogin={isLogin}
                    credentials={credentials}
                />


                <Complaints path='/Complaints' exact component={Complaints}

                />

                <Complaint path='/Complaints/:id' component={Complaint}

                />


            </Switch>

            <Footer />
        </>
    )
}

export default Main;