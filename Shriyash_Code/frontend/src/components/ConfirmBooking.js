import axios from "axios";
import url from "../configs/urlConfig";
import { toast } from "react-toastify";


export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const CallDriver = async (driverId, bookingId) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    let result = await axios.post(url + "/passenger/bookride/addcall",
        {
            "bookingId": bookingId,
            "driverId": driverId
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

    return result;
}

export const CheckStatusFor10sec = async (bookingId, driverId) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    let result = await axios.get(url + `/passenger/bookride/getanswer?bookingId=${bookingId}&driverId=${driverId}`,
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
        .catch((err) => {
            console.log("unable to get the status of booking call ");
            return "R";
        })

    return result;
}

export const requestToSetCallStatus = async (bookingId, driverId, driverAnswer) => {
    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    let result = await axios.post(url + "/passenger/bookride/updatecallstatus",
        {
            "bookingId": bookingId,
            "driverId": driverId,
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

    return result;

}

export const CheckStatus = async (bookingId, driverId) => {

    for (let i = 0; i < 20; i++) {

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

export const SetBookingStatusToGivenStatus = async (bookingId, driverId, status) => {

    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    let result = await axios.post(url + "/passenger/bookride/updatebookingstatus",
        {
            "bookingId": bookingId,
            "driverId": driverId,
            "status": status
        },
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then((res) => {
            console.log("changed booking status for booking id " + bookingId + " status " + status);
            return true;
        })
        .catch((err) => {
            console.log("unable to change booking status for booking id " + bookingId + " status " + status);
            return false;
        }
        )

    return result;
}

export const ConfirmBooking = async (paramsRideDetails) => {

    let tokenToBeSent = window.sessionStorage.getItem("JWT_TOKEN");
    // call to get list of driver id , distance and booking id
    let result = await axios.post(url + "/passenger/bookride/confirm",
        paramsRideDetails,
        {
            headers:
            {
                'Authorization': "Bearer " + tokenToBeSent
            }
        })
        .then(async (res) => {

            // successfull getting booking Id, driver list and distance
            // o/p is booking details
            const paramsBookingDetails = { ...res.data };
            // let bk = res.data;
            // bk.bookingId = res.data.bookingId;
            // dispatch(bookingActions.addBookingDetails(bk));
            // await sleepNow(3000);

            let driversList = paramsBookingDetails.driverList;

            //sort driver acc to the min dist.
            // driversList.sort((d1, d2) => {
            //     return d1.distance < d2.distance;
            // })

            console.log(driversList);

            // now give calls to each driver.
            for (let i = 0; i < driversList.length; i++) {

                // call to driver which is next in the list
                const driverCall = await CallDriver(driversList[i].id, paramsBookingDetails.id);

                // sleepNow(10000);
                // if driver call success
                if (driverCall) {
                    console.log("inside driver call")
                    // now after every 10 sec check for status resolve..
                    let callStatus = await CheckStatus(paramsBookingDetails.id, driversList[i].id);

                    // call accepted
                    if (callStatus == 'A') {
                        // requestToSetCallStatus(bookingDetails.id, driversList[i].id, "A");
                        console.log(driversList[i].id);
                        let bookingStatusUpdate = await SetBookingStatusToGivenStatus(paramsBookingDetails.id, driversList[i].id, "O");
                        return "done";

                    }
                    // call unanswered or rejected
                    else {
                        // call server for status set = rejected or unanswered
                        if (callStatus == 'R') {
                            // requestToSetCallStatus(bookingDetails.id, driversList[i].id, "R");
                            continue;
                        }
                        else {
                            requestToSetCallStatus(paramsBookingDetails.id, driversList[i].id, "N");
                        }
                    }
                }
                else {
                    console.log("unable to call driver");

                }

            }

            let bookingStatusUpdate = await SetBookingStatusToGivenStatus(paramsBookingDetails.id, "", "C");
            return "failed"
        })
        .catch((err) => {
            console.log(err);
            toast.error("Unable to fetch Driver List")
            return "failed"
        })


}

export default ConfirmBooking;
