import React, { Component, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Signup from './Signup';
import Main from './Main';
import Complaint from './Complaint';
import { ToastContainer } from 'react-toastify';


function App() {

    return <BrowserRouter>
        <ToastContainer />
        <Switch >
            {/* <Route path='/login' exact component={Login} /> */}

            {/* <Route path='/register' exact component={Signup} /> */}

            <Route path='/' component={Main} />
        </Switch>
    </BrowserRouter>

}

export default App;


