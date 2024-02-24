import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { complaintsActions } from '../react-redux-components/complaints-slice';
import url from '../configs/urlConfig';

function Complaints() {
    const complaints = useSelector((state) => state.complaint.complaints);

    const dispatch = useDispatch();

    const tempComplaints = [{
        "complaint_id": 1,
        "description": "this is complaint",
        "status": "A",
    },
    {
        "complaint_id": 2,
        "description": "this is complaint",
        "status": "R",
    },
    {
        "complaint_id": 3,
        "description": "this is complaint",
        "status": "R",
    }];




    var getComplaints = () => {

        // get complaints
        axios.get(url + "/").then((response) => {
            let replyReceived = response.data;

            for (let index = 0; index < replyReceived.length; index++) {
                dispatch(complaintsActions.addComplaints(replyReceived[index]));
            }
        })
            .catch((error) => {
                // temporary soln
                let replyReceived = tempComplaints;
                for (let index = 0; index < replyReceived.length; index++) {
                    dispatch(complaintsActions.addComplaints(replyReceived[index]));
                }
                dispatch(complaintsActions.removeComplaint({
                    "complaint_id": 2,
                    "description": "this is complaint",
                    "status": "R",
                }))
                dispatch(complaintsActions.getComplaintById({ "complaint_id": 1 }));

                // toast.error("Unable to Fetch complaints" + error);
            })

    }

    useEffect(() => {
        getComplaints();
    }, []);


    const status = (stat) => {
        if (stat === "A")
            return "Active"
        else if (stat === "R")
            return "Resolved"
        else
            return "Pending"

    }


    return (

        <section>
            <ToastContainer />
            {
                complaints.map(
                    (c) => {

                        return (
                            <>
                                <Link to={`/Complaints/${c.complaint_id}`}>
                                    <section className="py-4 py-xl-5" key={c.complaint_id} >

                                        <div className="card">
                                            <div className="card-header">
                                                <h5 className="mb-0">Complaint ID#{c.complaint_id} </h5>
                                                <h5 className="mb-0">Status: {status(c.status)}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{c.description}</p>
                                            </div>
                                        </div>
                                    </section>
                                </Link>
                            </>
                        );
                    }
                )
            }
        </section>


    );


}

export default Complaints;