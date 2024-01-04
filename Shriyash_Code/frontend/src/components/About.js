import React, { Component, useEffect } from 'react';
import team from '../assets/Team.jpg'


function About(props) {

    return <>
        <section>
            <div>
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Know us</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">We the students of Sunbeam Institute as a project activity have selected cab booking system as a topic and are willing to provide a portal for cab booking efficiently.</p>
                        <div className="container py-4 py-xl-5">
                            <div className="row row-cols-1 row-cols-md-2">
                                <div className="col">
                                    <img className="rounded w-100 h-100 fit-cover" style={{ 'minHeight': '300px' }} src={team} /></div>
                                <div className="col d-flex flex-column justify-content-center p-4">
                                    <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-5">
                                        <div>
                                            <h4>Kshitij Vanarse</h4>
                                            <p>Hello myself kshitij vanarse, with my unmatched talent and coding efficiency I have reached upto the position of becoming a team lead for the opulent services</p>
                                        </div>
                                    </div>
                                    <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-5">
                                        <div>
                                            <h4>Shriyash Band</h4>
                                            <p>I contribute towards the UI/UX generative part and contribute my work in simplifying the user experience.</p>
                                        </div>
                                    </div>
                                    <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start">
                                        <div>
                                            <h4>Niraj Zambre</h4>
                                            <p>I as a database engineer and project marketer looks forward to see opulent cabs as india's top used cab services.&nbsp;</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>;
}

export default About;