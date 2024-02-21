import { createSlice } from "@reduxjs/toolkit";


const BookingSlice = createSlice({
    name: "booking",
    initialState:
    {
        rideDetails: {
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
        },
        bookingDetails: {
            "id": "",
            "bookingDate": '',
            "bookingTime": '',
            "pickupAddress": "123 Main St",
            "dropoffAddress": "456 Oak St",
            "status": "",
            "fare": '',
            "driverList": [{
                "id": "",
                "distance": ""
            }]
        }
    },

    reducers: {
        addRideDetails(state, action) {
            state.rideDetails = action.payload;
        },

        addBookingDetails(state, action) {
            state.bookingDetails = action.payload;
        }
    }

})

export const bookingActions = BookingSlice.actions;

export default BookingSlice;