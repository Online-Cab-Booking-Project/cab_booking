import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { complaintsActions } from '../react-redux-components/complaints-slice';

function Complaint() {

    const complaint = useSelector((state) => state.complaint.complaint);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);

    var getComplaint = () => { dispatch(complaintsActions.getComplaintById(2)) }

    useEffect(() => {
        getComplaint();
    }, []);


    return (

        <section>
            <div className="card-group">
                <div className="card"><img className="card-img-top w-100 d-block" />
                    <div className="card-header">
                        <h5 className="mb-0">Complaint ID#{complaint.complaint_id} </h5>
                        <h5 className="mb-0">Status: {complaint.status}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{complaint.description}</p>
                    </div>
                </div>
            </div>
        </section>


    );


}

export default Complaint;