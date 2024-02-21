import { createSlice } from "@reduxjs/toolkit";


const ridesSlice = createSlice({
    name: "booking",
    initialState:
    {
        rides: [],
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

        getRideById(state, action) {
            state.ride = state.rides.filter((r) => {
                return r.id === action.payload.id;
            })
        }

    }

})

export const ridesActions = ridesSlice.actions;

export default ridesSlice;