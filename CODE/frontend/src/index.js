import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PassengerLogin from './components/PassengerLogin';
import TestComponent from './components/TestComponent';
import PassengerDashBoard from './components/PassengerDashboard';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>


);