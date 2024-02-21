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
        fare: ''
    },

    reducers: {
        addsourceDest(state, action) {
            state.coordinates = action.payload;
        }
        ,
        updateFare(state, action) {
            state.fare = action.payload;
        }
    }

})

export const sourceDestActions = sourceDestSlice.actions;

export default sourceDestSlice;