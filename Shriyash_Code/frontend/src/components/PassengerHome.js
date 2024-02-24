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
import Booking from './Booking';

function PassengerHome() {

    const dispatch = useDispatch();
    const [namedNodes, setNamedNodes] = useState([]);
    const fare = useSelector(state => state.coordinate.fare)
    const isPassenger = useSelector((state) => state.credential.isPassenger);
    const [hiddenState, setHiddenState] = useState(true);
    const history = useHistory();
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
        setHiddenState(true);
        dispatch(sourceDestActions.updateFare(0));

        var copyOfCredentials = { ...cords };
        copyOfCredentials[args.target.name] = args.target.value;
        setCords(copyOfCredentials);
    }

    const BookRide = () => {

        // if user is not logged in passenger then prompt him to login
        if (!isPassenger) {
            toast.success("Please Login to Book Ride")
            history.push('/login');
            return;
        }

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
    }

    var ConfirmRide = () => {

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
            <Booking />

            <CanvasComponent />

            <div style={{ "margin-top": "22px" }}></div>

        </div >
    );
}




export default PassengerHome;