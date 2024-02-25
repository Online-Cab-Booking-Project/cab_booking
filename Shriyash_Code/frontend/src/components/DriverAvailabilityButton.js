import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Image } from 'react-bootstrap';
import play from '../assets/portable-wifi-off.svg';
import stop from '../assets/hotspot.svg';
import axios from 'axios';
import url from '../configs/urlConfig';
import AcceptReject from './AcceptReject';

const DriverAvailabilityButton = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const [callAcceptRejectStatus, setCallAcceptRejectStatus] = useState(1);
  const [intervalQueue, setIntervalQueue] = useState(1);

  const toggleAvailability = () => {
    if (isAvailable) {
      TurnOffAvailbility();
    } else {
      TurnOnAvailbility();
    }
    setIsAvailable((prevState) => !prevState);
  };


  const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
            !popupStatus && setPopupStatus(true);

            // for a single success req pause the timer. and interval
            popupStatus && toggleAvailability();
            // sleepNow(2000);

            if (callAcceptRejectStatus == 2 || callAcceptRejectStatus == 3) {

              console.log(callAcceptRejectStatus);
              let stat = callAcceptRejectStatus === 2 ? "A" : "R";
              const details = res.data;
              console.log(details);
              console.log(stat);


              // debugger;
              // call to update booking status
              let result = await driverAcceptRejectCall(details[0].booking.id, details[0].driverId, stat);
            }

          }
        })
        .catch((err) => {
          // console.log("unable to ping server " + err);
        })

    }, 2000)


    setIntervalQueue(intervalNo);
  }


  const driverAcceptRejectCall = async (bookingId, driverId, stat) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    let result = await axios.post(`${url}/driver/bookride/updatecallstatus`,
      {
        "bookingId": bookingId,
        "driverId": driverId,
        "driverAnswer": stat
      },
      {
        headers:
        {
          'Authorization': "Bearer " + tokenToBeSent
        }
      })
      .then((res) => {
        console.log("changed call status driver " + driverId + " for booking id " + bookingId + " status " + stat);
        return true;
      })
      .catch((err) => {
        console.log("unable to change status driver " + driverId + " for booking id " + bookingId + " status " + stat);
        return false;
      }
      )
  }

  return (
    <div>
      <AcceptReject onCall={popupStatus} setStatus={setCallAcceptRejectStatus} setPopupStatus={setPopupStatus} />

      <div style={{ marginTop: '22px' }}></div>

      <Button
        variant='light'
        onClick={toggleAvailability}
        style={{
          borderRadius: '10px',
          width: '120px',
          height: '70px',
          fontSize: '14px',
          fontWeight: 'bold',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          marginLeft: '20px', // Add margin to the left
        }}
      >
        <Image
          src={isAvailable ? stop : play}
          alt="Availability"
          fluid
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',
          }}
        />
        <span style={{ marginBottom: '10px', textAlign: 'center' }}>
          {/* {isAvailable ? 'Not Available' : 'Available'} */}
        </span>
      </Button>

      <div style={{ marginTop: '22px' }}></div>
    </div>
  );
};

export default DriverAvailabilityButton;
