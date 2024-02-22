import { createSlice } from "@reduxjs/toolkit";

const credentialsSlice = createSlice({
    name: "credential",
    initialState:
    {
        credentials: {
            'firstName': '',
            'lastName': '',
            'email': '',
            'mobileNo': '',
            'dob': '',
            'gender': '',
            'address': '',
            'wallet': {
                'walletId': '',
                "balance": ''
            }
        },
        isPassenger: false,
        isDriver: false,
        isAdmin: false
    },

    reducers: {
        setCredentials(state, action) {
            state.credentials = { ...action.payload };
        },

        setPassengerStatus(state, action) {
            state.isPassenger = action.payload;
        },

        setDriverStatus(state, action) {
            state.isDriver = action.payload;
        },
        setAdminStatus(state, action) {
            state.isAdmin = action.payload;
        }
    }
})

export const credentialsActions = credentialsSlice.actions;

export default credentialsSlice;