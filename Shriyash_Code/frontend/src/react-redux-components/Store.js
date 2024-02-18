import { configureStore } from "@reduxjs/toolkit";
import complaintsSlice from "./complaints-slice";
import credentialsSlice from "./credentials-slice";


const store = configureStore({
    reducer: {
        complaint: complaintsSlice.reducer,
        credential: credentialsSlice.reducer
    }
});

export default store;