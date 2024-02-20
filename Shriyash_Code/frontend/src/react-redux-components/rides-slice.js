import { createSlice } from "@reduxjs/toolkit";


const ridesSlice = createSlice({
    name: "ride",
    initialState:
    {
        rides: [],
        ride: {

            "id": 1,
            "driver": '',
            "passenger": '',
            "pickupAddress": "123 Main St",
            "dropoffAddress": "456 Oak St",
            "bookingTime": '',
            "bookingDate": '',
            "fare": '',
            "status": ""
        }


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

        getRideById(state, action) {
            state.ride = state.rides.filter((r) => {
                return r.id === action.payload.id;
            })
        }

    }

})

export const ridesActions = ridesSlice.actions;

export default ridesSlice;