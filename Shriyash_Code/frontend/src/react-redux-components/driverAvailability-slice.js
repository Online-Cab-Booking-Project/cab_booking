import { createSlice } from "@reduxjs/toolkit";


const driverAvailabilitySlice = createSlice({
    name: "availability",
    initialState:
    {
        isAvailable: false,
        intervalQueue: ''
    },

    reducers: {

        toggleAvailability(state, action) {
            state.isAvailable = !state.isAvailable;
        },

        setIntervalQueue(state, action) {
            state.intervalQueue = action.payload;
        }
    }

})

export const driverAvailabilityActions = driverAvailabilitySlice.actions;

export default driverAvailabilitySlice;