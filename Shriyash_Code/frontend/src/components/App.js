import React, { Component, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Signup from './Signup';
import Main from './Main';


function App() {

    return <BrowserRouter>
        <Switch >
            <Route path='/Login' exact component={Login}/>

            <Route path='/Signup' exact component={Signup}/>

            <Route path='/' component={Main}/>
        </Switch>
    </BrowserRouter>

}

export default App;


