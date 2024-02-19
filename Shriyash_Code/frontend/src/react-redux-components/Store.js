import { configureStore } from "@reduxjs/toolkit";
import complaintsSlice from "./complaints-slice";
import credentialsSlice from "./credentials-slice";
import ridesSlice from "./rides-slice";


const store = configureStore({
    reducer: {
        complaint: complaintsSlice.reducer,
        credential: credentialsSlice.reducer,
        ride : ridesSlice.reducer
    }
});

export default store;