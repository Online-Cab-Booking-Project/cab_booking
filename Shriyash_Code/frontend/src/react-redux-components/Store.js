import { configureStore } from "@reduxjs/toolkit";
import complaintsSlice from "./complaints-slice";
import credentialsSlice from "./credentials-slice";
import ridesSlice from "./rides-slice";
import sourceDest from "./sourceDest-slice";
import sourceDestSlice from "./sourceDest-slice";


const store = configureStore({
    reducer: {
        complaint: complaintsSlice.reducer,
        credential: credentialsSlice.reducer,
        ride: ridesSlice.reducer,
        coordinate: sourceDestSlice.reducer
    }
});

export default store;