import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Image } from 'react-bootstrap';
import play from '../assets/portable-wifi-off.svg';
import stop from '../assets/hotspot.svg';
import axios from 'axios';
import url from '../configs/urlConfig';
import AcceptReject from './AcceptReject';
import { useDispatch, useSelector } from 'react-redux';
import { driverAvailabilityActions } from '../react-redux-components/driverAvailability-slice';

const DriverAvailabilityButton = () => {
  const isAvailable = useSelector((state) => state.availability.isAvailable);
  const [popupStatus, setPopupStatus] = useState(false);
  const [callAcceptRejectStatus, setCallAcceptRejectStatus] = useState(1);
  const [bookingId, setBookingId] = useState();
  const [driverId, setDriverId] = useState();
  const intervalQueue = useSelector((state) => state.availability.intervalQueue);
  const dispatch = useDispatch();

  useEffect(() => {

    if (isAvailable)
      TurnOnAvailbility();
    else
      TurnOffAvailbility();

  }, [isAvailable])

  const TurnOffAvailbility = () => {
    clearInterval(intervalQueue)
  }

  const TurnOnAvailbility = () => {

    const intervalNo = setInterval(() => {

      let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
      axios.get(`${url}/driver/checkforcalls`,
        {
          headers:
          {
            'Authorization': "Bearer " + tokenToBeSent
          }
        }
      )
        .then
        (async (res) => {
          if (res.data == "No calls" && res.status == 200) {

          }
          //(res.data.bookingId && res.status == 200)
          else {
            setBookingId(res.data[0].booking.id);
            setDriverId(res.data[0].driverId);

            !popupStatus && setPopupStatus(true);

            // call to update booking status
          }
        })
        .catch((err) => {
          console.log("unable to ping server " + err);
        })

    }, 2000)

    dispatch(driverAvailabilityActions.setIntervalQueue(intervalNo));
  }




  return (
    <div>
      <AcceptReject onCall={popupStatus} bookingId={bookingId} driverId={driverId} setStatus={setCallAcceptRejectStatus} setPopupStatus={setPopupStatus} />
    </div>
  );
};

export default DriverAvailabilityButton;
