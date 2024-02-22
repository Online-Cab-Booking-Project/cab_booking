import { createSlice } from "@reduxjs/toolkit";


const ridesSlice = createSlice({
    name: "ride",
    initialState:
    {
        rides: [],
        ride: {

            "id": 1,
            "driver": {},
            "passenger": '',
            "pickupAddress": "123 Main St",
            "dropoffAddress": "456 Oak St",
            "bookingTime": '',
            "bookingDate": '',
            "fare": '',
            "status": ""
        },
        onGoingRide: {}
    },

    reducers: {
        addRides(state, action) {
            state.rides = action.payload;
        },

        removeRide(state, action) {
            state.rides = state.rides.filter((r) => {
                return r.id !== action.payload.id;
            })
        },

        addOnGoingRide(state, action) {
            state.onGoingRide = action.payload;
        },

        updateOnGoingRideStatus(state, action) {
            state.onGoingRide.status = action.payload;
        },

        getRideById(state, action) {
            state.ride = state.rides.filter((r) => {
                return r.id === action.payload.id;
            })
        },
        resetRideCredentials(state, action) {
            state.ride = {};
        }
        ,
        resetOnGoingRide(state, action) {
            state.onGoingRide = {};
        }
    }

})

export const ridesActions = ridesSlice.actions;

export default ridesSlice;