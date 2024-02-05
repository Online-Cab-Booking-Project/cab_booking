import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import TestComponent from './TestComponent';
import Login from './PassengerLogin';
import PassengerDashBoard from './PassengerDashboard';
import PassengerSignup from './PassengerSignup';



function Home() {


    return (
        <Switch>
            <Route path='/' exact component={TestComponent} />
            <Route path='/login' exact component={Login} />
            <Route path='/passengerDashboard' exact component={PassengerDashBoard} />
            <Route path='/PassengerSignup' exact component={PassengerSignup} />
        </Switch>
    )


}

export default Home;