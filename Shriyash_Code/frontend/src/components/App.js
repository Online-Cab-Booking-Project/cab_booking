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
        <ToastContainer
            position="top-right"
            autoClose={1000}
        />
        <NavBar />

        <Switch>

            <Home path="/" exact component={Home} />

            <Route path='/login' exact component={Login} />

            <Route path='/register' exact component={Signup} />

            <Contact path='/contact' exact component={Contact} />

            <About path='/about' exact component={About} />

            <UserProtectedRoutes path="/account" exact component={Account} />

            <UserProtectedRoutes path="/yourrides" exact component={YourRides} />

            <UserProtectedRoutes path="/complaints" exact component={Complaints} />

            <UserProtectedRoutes path='/complaints/:id' exact component={Complaint} />

            <UserProtectedRoutes path='/dashboard' exact component={DashBoard} />

        </Switch>

        <Footer />
    </BrowserRouter>

}

export default App;


