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
// import ConfirmBooking from './ConfirmBooking';
import ConfirmBookingPopup from './ConfirmBookingPopup';










const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const CallDriver = async (driverId, bookingId) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    axios.post(url + "/passenger/bookride/addcall",
        {
            "bookingId": driverId,
            "driverId": bookingId
        },
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            console.log("response sent to driver " + driverId + " for booking id " + bookingId);
            return true;
        })
        .catch((err) => {
            console.log("Unable to call the driver with id " + driverId + " for booking id " + bookingId);
            return false;
        }
        )

    return false;
}


const CheckStatusFor10sec = async (bookingId, driverId) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    axios.get(url + `/passenger/bookride/getanswer/${bookingId}/${driverId}`,
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            let driverAnswer = res.data.driverAnswer;

            return driverAnswer;
        })
        .then((err) => {
            console.log("unable to get the status of booking call ");
            return "R";
        })
}

const requestToSetCallStatus = (bookingId, driverId, driverAnswer) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    axios.post(url + "/passenger/bookride/updatecallstatus",
        {
            "bookingId": driverId,
            "driverId": bookingId,
            "driverAnswer": driverAnswer
        },
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            console.log("changed call status driver " + driverId + " for booking id " + bookingId + " status " + driverAnswer);
            return true;
        })
        .catch((err) => {
            console.log("unable to change status driver " + driverId + " for booking id " + bookingId + " status " + driverAnswer);
            return false;
        }
        )

}

const CheckStatus = async (bookingId, driverId) => {


    for (let i = 0; i < 10; i++) {
        let statusAnswer = await CheckStatusFor10sec(bookingId, driverId);

        if (statusAnswer == 'R') {
            return 'R';
        }
        else if (statusAnswer == 'A') {
            return 'A';
        }

        await sleepNow(1000);
    }

    return 'N'
}


function ConfirmBooking() {

   


    // //set ride details for getting booking details and driver list
    // setRideDetils({
    //     "inputDetails": {
    //         "bookingDate": (new Date()).getDate(),
    //         "bookingTime": {
    //             "hour": (new Date).getHours(),
    //             "minute": (new Date).getMinutes(),
    //             "second": (new Date).getMinutes(),
    //             "nano": (new Date).getMilliseconds()
    //         },
    //         "pickupAddress": "123 Main St",
    //         "dropoffAddress": "456 Oak St",
    //         "fare": 0,
    //     },
    //     "source": {
    //         "sourceX": 0,
    //         "sourceY": 0
    //     }
    // })

    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    // call to get list of driver id , distance and booking id
    axios.post(url + "/passenger/bookride/confirm",

        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then(async (res) => {

            const [rideDetails, setRideDetils] = useState({
                "inputDetails": {
                    "bookingDate": '',
                    "bookingTime": {
                        "hour": 0,
                        "minute": 0,
                        "second": 0,
                        "nano": 0
                    },
                    "pickupAddress": "123 Main St",
                    "dropoffAddress": "456 Oak St",
                    "fare": 0,
                },
                "source": {
                    "sourceX": 0,
                    "sourceY": 0
                }
            })
        
            const [bookingDetails, setBookingDetails] = useState({
                "inputDetails": {
                    "bookingDate": (new Date()).getDate(),
                    "bookingTime": {
                        "hour": (new Date).getHours(),
                        "minute": (new Date).getMinutes(),
                        "second": (new Date).getMinutes(),
                        "nano": (new Date).getMilliseconds()
                    },
                    "pickupAddress": "123 Main St",
                    "dropoffAddress": "456 Oak St",
                    "fare": 0,
                },
                "source": {
                    "sourceX": 0,
                    "sourceY": 0
                }
            });

            // successfull getting booking Id, driver list and distance
            // o/p is booking details
            debugger;
            setBookingDetails(res.data);

            let driversList = bookingDetails.driverList;

            //sort driver acc to the min dist.
            driversList.sort((d1, d2) => {
                return d1.distance < d2.distance;
            })

            // now give calls to each driver.
            for (let i = 0; i < driversList.length; i++) {

                // call to driver which is next in the list
                let driverCall = await CallDriver(driversList[i].id, bookingDetails.id);

                // if driver call success
                if (driverCall) {
                    // now after every 10 sec check for status resolve..
                    let bookingStatus = await CheckStatus(bookingDetails.id, driversList[i].id);

                    // call accepted
                    if (bookingStatus == 'A') {
                        requestToSetCallStatus(bookingDetails.id, driversList[i].id, "A");
                    }
                    // call unanswered or rejected
                    else {
                        // call server for status set = rejected or unanswered
                        if (bookingStatus == 'R') {
                            requestToSetCallStatus(bookingDetails.id, driversList[i].id, "R");
                        }
                        else {
                            requestToSetCallStatus(bookingDetails.id, driversList[i].id, "N");
                        }
                    }
                }
                else {
                    console.log("unable to call driver");
                }

            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Unable to fetch Driver List")
        })


}










function Booking() {

    const dispatch = useDispatch();
    const [namedNodes, setNamedNodes] = useState([]);
    const fare = useSelector(state => state.coordinate.fare)
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const [hiddenState, setHiddenState] = useState(true);
    const history = useHistory();
    const cords = useSelector(state => state.coordinate.cords);
    const [onClose, setOnClose] = useState(true);

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

        // if user is not logged in passenger then prompt him to login
        if (!isPassenger) {
            toast.success("Please Login to Book Ride")
            history.push('/login');
            return;
        }
    }

    var ConfirmRide = () => {
        // setOnClose(false);
        ConfirmBooking();
    }

    var hidden = () => {
        // toogle hidden state
        setHiddenState(!hiddenState);
        dispatch(sourceDestActions.updateFare(0));
    }

    useEffect(() => {
        getNamedCoordinate();
    }, [fare, hiddenState])


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