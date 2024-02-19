import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CanvasComponent from './CanvasComponent';
import { useEffect, useState, useContext } from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Carousel from './Carousel';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sourceDestActions } from '../react-redux-components/sourceDest-slice';

function Home(props) {

    const dispatch = useDispatch();
    const [namedNodes, setNamedNodes] = useState([]);
    const [cords, setCords] = useState({});
    const coordinates = useSelector(state => state.coordinate.coordinates)

    var getNamedCoordinate = () => {
        axios.get("http://192.168.1.6:7070/graph/getnamednodes")
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

        namedNodes.forEach(node => {
            if (node.id === cords.source) {
                source.X = node.sourceX;
                source.Y = node.sourceY;
            }
            if (node.id === cords.dest) {
                dest.X = node.destX;
                dest.Y = node.destY;
            }
        })
        dispatch(sourceDestActions.addsourceDest({
            sourceX: source.X,
            sourceY: source.Y,
            destX: dest.X,
            destY: dest.Y
        }))
        console.log(source);
        console.log(dest);
    }

    useEffect(() => {
        getNamedCoordinate();
    }, [])

    return (
        <>
            <div>
                {/* <Carousel/> */}
                <CanvasComponent />
                <section className="py-4 py-xl-5">
                    <div className="container"></div>
                    <section className="py-4 py-xl-5">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 col-xl-4">
                                    <div className="card mb-5">
                                        <div className="card-body d-flex flex-column align-items-center">
                                            <form className="text-center">
                                                <div className="mb-3"><select className="form-select" name='source' value={cords.source} onChange={OnTextChanged}>
                                                    <optgroup label="Select Pickup Location">
                                                        {
                                                            namedNodes.map((node) => {
                                                                return <option value={node.id} key={node.id} >{node.name}</option>

                                                            })
                                                        }
                                                    </optgroup>
                                                </select></div>
                                                <div className="mb-3"><select className="form-select" name='destination' value={cords.dest} onChange={OnTextChanged}>
                                                    <optgroup label="Select Drop Location">
                                                        {
                                                            namedNodes.map((node) => {
                                                                return <option value={node.id} key={node.id}>{node.name}</option>

                                                            })
                                                        }
                                                    </optgroup>
                                                </select></div>
                                                <div className="mb-3"><button className="btn btn-primary d-block w-100" type="button" onClick={BookRide}>Book</button></div>
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