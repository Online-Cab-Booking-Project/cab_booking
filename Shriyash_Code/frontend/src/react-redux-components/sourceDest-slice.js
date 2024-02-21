import { createSlice } from "@reduxjs/toolkit";


const sourceDestSlice = createSlice({
    name: "sourceDest",
    initialState:
    {
        coordinates: {
            "sourceX": "",
            "sourceY": "",
            "destX": "",
            "destY": ""
        },
        cords: {
            "source": '',
            "destination": ''
        },
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

export const sourceDestActions = sourceDestSlice.actions;

export default sourceDestSlice;