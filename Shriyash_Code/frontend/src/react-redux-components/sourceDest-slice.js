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
        }
    },

    reducers: {
        addsourceDest(state, action) {
            state.coordinates = action.payload;
        }
    }

})

export const sourceDestActions = sourceDestSlice.actions;

export default sourceDestSlice;