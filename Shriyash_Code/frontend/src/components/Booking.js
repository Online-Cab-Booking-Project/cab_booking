import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sourceDestActions } from '../react-redux-components/sourceDest-slice';
import { graphURL } from '../configs/urlConfig';
import { credentialsActions } from '../react-redux-components/credentials-slice';
import { ridesActions } from '../react-redux-components/rides-slice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import url from '../configs/urlConfig';
import { bookingActions } from '../react-redux-components/booking-slice';
import { ConfirmBooking, getCurrentTime } from './ConfirmBooking';
import ConfirmBookingPopup from './ConfirmBookingPopup';


function Booking() {

    const [namedNodes, setNamedNodes] = useState([]);
    const fare = useSelector(state => state.coordinate.fare)
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const [hiddenState, setHiddenState] = useState(true);
    const history = useHistory();
    const cords = useSelector(state => state.coordinate.cords);
    const [onClose, setOnClose] = useState(true);
    const rideDetails = useSelector(state => state.booking.rideDetails);
    const bookingDetails = useSelector(state => state.booking.bookingDetails);

    const [pickupAddress, setPickupAddress] = useState();
    const [dropoffAddress, setDropoffAddress] = useState();
    const dispatch = useDispatch();

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
        setHiddenState(true);
        dispatch(sourceDestActions.updateFare(0));

        var copyOfCredentials = { ...cords };
        copyOfCredentials[args.target.name] = args.target.value;
        dispatch(sourceDestActions.updateCords(copyOfCredentials));
    }

    const BookRide = () => {

        hidden();

        let source = {};
        let dest = {};


        namedNodes.forEach(node => {
            if (node.id == cords.source) {
                setPickupAddress(node.name);
                source = {
                    X: node.xcoordinates,
                    Y: node.ycoordinates
                }
            }
            if (node.id == cords.destination) {
                setDropoffAddress(node.name);
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
        console.log(coordinates);

        // if user is not logged in passenger then prompt him to login
        if (!isPassenger) {
            toast.success("Please Login to Book Ride")
            history.push('/login');
            return;
        }
    }

    const CurrentDateFormat = () => {
        // Get the current date
        const currentDate = new Date();

        // Extract year, month, and day
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Format the date in YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }
    var ConfirmRide = async () => {
        //set ride details for getting booking details and driver list

        const paramsRideDetails = {
            "inputDetails": {
                "bookingDate": CurrentDateFormat(),
                "bookingTime": getCurrentTime(),
                "pickupAddress": pickupAddress,
                "dropoffAddress": dropoffAddress,
                "fare": fare,
            },
            "source": {
                "sourceX": coordinates.sourceX,
                "sourceY": coordinates.sourceY
            }
        }
        setOnClose(false);
        await ConfirmBooking({ ...paramsRideDetails });
        setOnClose(true);
        dispatch(ridesActions.resetRideCredentials());
        hidden();
    }

    var hidden = () => {
        // toogle hidden state
        setHiddenState(!hiddenState);
        dispatch(sourceDestActions.updateFare(0));
    }

    useEffect(() => {

        getNamedCoordinate();
    }, [])


    return (
        <div>
            <ConfirmBookingPopup onClose={onClose} />;
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
                            <div class="justify-content-center align-items-center justify-content-start my-2 flex-lg-column  align-content-center align-self-center my-2">

                                <div class="mb-4">
                                    <button class="btn btn-primary border rounded ms-sm-2" type="button" onClick={BookRide} hidden={!hiddenState}
                                        style={{ "height": "38px", "width": "90px", "margin": "-118px", "padding": "6px 12px" }}>
                                        Book
                                    </button>
                                </div>
                                <div class="mb-4">
                                    <button class="btn btn-primary border rounded ms-sm-2" type="button" onClick={ConfirmRide} hidden={hiddenState}
                                        style={{ "height": "38px", "width": "90px", "margin": "-118px", "padding": "6px 12px" }}>
                                        Confirm
                                    </button>
                                </div>

                                <div class="mb-1">
                                    <button class="btn btn-danger border rounded ms-sm-2" type="button" onClick={hidden} hidden={hiddenState}
                                        style={{ "height": "38px", "width": "90px", "margin": "-118px", "padding": "6px 12px" }}>
                                        Cancel
                                    </button>
                                </div>


                            </div>
                        </form>
                    </div>
                </div >
            </section >

            <div style={{ "margin-top": "22px" }}></div>

        </div >
    );
}




export default Booking;