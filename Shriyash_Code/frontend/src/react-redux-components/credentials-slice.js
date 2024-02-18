import { createSlice } from "@reduxjs/toolkit";

const credentialsSlice = createSlice({
    name: "credential",
    initialState:
    {
        credentials: {},
        isPassenger: false,
        isDriver: false
    },

    reducers: {
        setCredentials(state, action) {
            state.credentials = action.payload;
        },

        setPassengerStatus(state, action) {
            state.isPassenger = action.payload;
        },

        setDriverStatus(state, action) {
            state.isDriver = action.payload;
        }
    }
})

export const credentialsActions = credentialsSlice.actions;

export default credentialsSlice;