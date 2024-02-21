import { createSlice } from "@reduxjs/toolkit";


const sourceDestSlice = createSlice({
    name: "sourceDest",
    initialState:
    {
        coordinates: {
            "sourceX": 170,
            "sourceY": 362,
            "destX": 170,
            "destY": 362
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