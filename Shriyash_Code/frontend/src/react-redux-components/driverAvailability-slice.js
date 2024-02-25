import { createSlice } from "@reduxjs/toolkit";


const driverAvailibilitySlice = createSlice({
    name: "availibility",
    initialState:
    {
        isAvailable: false,
        intervalQueue: '',
        fare: ''
    },

    reducers: {
        addsourceDest(state, action) {
            state.coordinates = action.payload;
        }
        ,
        updateFare(state, action) {
            state.fare = action.payload;
        },
        updateCords(state, action) {
            state.cords = action.payload;
        }
    }

})

export const sourceDestActions = driverAvailibilitySlice.actions;

export default driverAvailibilitySlice;