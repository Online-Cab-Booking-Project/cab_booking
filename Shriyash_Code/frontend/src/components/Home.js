import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

function Home(props) {


    return (
        <>
            <div>
                <CanvasComponent />
                <section className="py-4 py-xl-5">
                    <div className="container"></div>
                    <section className="py-4 py-xl-5">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 col-xl-4">
                                    <div className="card mb-5">
                                        <div className="card-body d-flex flex-column align-items-center">
                                            <form className="text-center" method="post">
                                                <div className="mb-3"><select className="form-select">
                                                    <optgroup label="Select Pickup Location">
                                                        <option value="12">Katraj</option>
                                                        <option value="13">Swargate</option>
                                                        <option value="14">Karvenagar</option>
                                                    </optgroup>
                                                </select></div>
                                                <div className="mb-3"><select className="form-select">
                                                    <optgroup label="Select Drop Location">
                                                        <option value="13">Swargate</option>
                                                        <option value="12">Katraj</option>
                                                        <option value="14">Karvenagar</option>
                                                    </optgroup>
                                                </select></div>
                                                <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Book</button></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
}

export default Home;