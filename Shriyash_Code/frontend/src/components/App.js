import React, { Component, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import DashBoard from './Dashboard';
import Contact from './Contact';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Account from './Account';
import YourRides from './YourRides';
import Complaint from './Complaint';
import Complaints from './Complaints';
import { useSelector } from 'react-redux';
import UserProtectedRoutes from './UserProtectedRoutes';
import Login from './Login';
import Signup from './Signup';



function App() {

    return <BrowserRouter>
        <ToastContainer />
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
    </BrowserRouter>

}

export default App;


