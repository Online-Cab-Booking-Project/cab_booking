import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sourceDestActions } from '../react-redux-components/sourceDest-slice';
import { graphURL } from '../configs/urlConfig';

function PassengerHome() {

    const dispatch = useDispatch();
    const [namedNodes, setNamedNodes] = useState([]);
    const fare = useSelector(state=>state.coordinate.fare)
    const [cords, setCords] = useState({
        source: "",
        destination: ""
    });

    const coordinates = useSelector(state => state.coordinate.coordinates)

    var getNamedCoordinate = () => {

        axios.get(graphURL + "/graph/getnamednodes")
            .then((res) => {
                setNamedNodes(res.data);
            })
            .catch((err) => {
                toast.error("Unable to get Source Destinaton Coordinates")
            })
    }

    const OnTextChanged = (args) => {
        var copyOfCredentials = { ...cords };
        copyOfCredentials[args.target.name] = args.target.value;
        setCords(copyOfCredentials);
    }

    const BookRide = () => {
        let source = {};
        let dest = {};

        debugger;
        namedNodes.forEach(node => {
            if (node.id == cords.source) {
                source = {
                    X: node.xcoordinates,
                    Y: node.ycoordinates
                }
            }
            if (node.id == cords.destination) {
                dest = {
                    X: node.xcoordinates,
                    Y: node.ycoordinates
                }
            }
        })
        dispatch(sourceDestActions.addsourceDest({
            sourceX: source.X,
            sourceY: source.Y,
            destX: dest.X,
            destY: dest.Y
        }))
    }

    useEffect(() => {
        getNamedCoordinate();
    }, [fare])


    return (
        <div>
            <section class="justify-content-center py-4 py-xl-5">
                <div class="container">
                    <div class="text-center text-white bg-dark border rounded border-0 border-light d-flex flex-column flex-fill justify-content-center align-items-center flex-lg-row p-4 p-lg-5" style={{ "height": "213px" }}>

                        <div class="text-center text-lg-start py-3 py-lg-1">
                            <h2 class="fw-bold mb-2"><strong>Where are you travelling today!!</strong></h2>
                            <p class="mb-0">Now avail 20% discount on your first ride.</p>
                        </div>

                        <form class="d-flex flex-fill justify-content-start my-2">
                            <div class="my-2" style={{ "width": "415px", "height": "118px" }}>

                                <select class="border rounded-pill form-select " name='source' value={cords.source} onChange={OnTextChanged}>
                                    <optgroup label="Enter Pickup Location">

                                        {
                                            namedNodes.map((node) => {
                                                return <option value={node.id} key={node.id} >{node.name}</option>

                                            })
                                        }
                                    </optgroup>

                                </select>

                                <div style={{ "margin-top": "22px" }}></div>

                                <select class="border rounded-pill form-select" name='destination' value={cords.destination} onChange={OnTextChanged}>
                                    <optgroup label="Enter Drop Location">

                                        {
                                            namedNodes.map((node) => {
                                                return <option value={node.id} key={node.id}>{node.name}</option>

                                            })
                                        }
                                    </optgroup>
                                </select>

                                <div style={{ "margin-top": "22px" }}></div>

                                <p class="mb-0">Calculated Fare: {fare}₹</p>
                            </div>
                            <div class="justify-content-center align-items-center align-content-center align-self-center my-2">
                                <button class="btn btn-primary border rounded ms-sm-2" type="button" onClick={BookRide}
                                    style={{ "height": "38px", "width": "118.172px", "margin": "-118px", "padding": "6px 12px" }}>
                                    Confirm
                                </button>

                            </div>
                        </form>
                    </div>
                </div >
            </section >


            <CanvasComponent />



            <div style={{ "margin-top": "22px" }}></div>

        </div >
    );
}




export default PassengerHome;